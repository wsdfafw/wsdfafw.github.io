import argparse
import datetime
import os
import requests
from io import StringIO
from ruamel.yaml import YAML

yaml = YAML()
yaml.preserve_quotes = True


def read_front_matter(path):
    """从 Jekyll/Hugo 帖子中读取 YAML 前置内容。"""
    with open(path, "r", encoding="utf-8") as file:
        content = file.read()

    # 在第一个两个 "---" 标记处分割
    parts = content.split("---", 2)
    if len(parts) < 3:
        raise ValueError(f"Invalid front matter format in {path}")

    # 解析标记之间的 YAML
    return yaml.load(parts[1])


def write_front_matter(path, front_matter):
    """将 YAML 前置内容写入 Jekyll/Hugo 帖子，同时保留内容。"""
    with open(path, "r", encoding="utf-8") as file:
        content = file.read()

    # 分割原始内容
    parts = content.split("---", 2)
    if len(parts) < 3:
        raise ValueError(f"Invalid front matter format in {path}")

    # 创建带有更新前置内容的新内容
    output = StringIO()
    yaml.dump(front_matter, output)
    new_content = f"---\n{output.getvalue()}---{parts[2]}"

    # 写入更新后的内容
    with open(path, "w", encoding="utf-8") as file:
        file.write(new_content)


def get_version_info():
    """从 Mojang API 获取 Minecraft 版本信息。"""
    manifest_url = "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json"
    manifest = requests.get(manifest_url).json()
    return {
        version["id"]: {"type": version["type"], "releaseTime": version["releaseTime"]}
        for version in manifest["versions"]
    }


def find_wurst_update_post(version):
    """查找特定版本的 Wurst 更新帖子。"""
    for root, _, files in os.walk("_updates"):
        for file in files:
            if version not in file:
                continue

            post_path = os.path.join(root, file)
            front_matter = read_front_matter(post_path)
            if front_matter["wurst-version"] == version:
                return front_matter, post_path

    raise ValueError(f"Could not find post for Wurst version {version}")


def update_wurst_post(wurst_version, mc_version, fapi_version):
    """更新 WurstClient.net 帖子的版本信息。"""
    version_info = get_version_info()
    mc_version_type = version_info[mc_version]["type"]
    front_matter, post_path = find_wurst_update_post(wurst_version)

    # 更新最后修改日期
    front_matter["modified_date"] = datetime.date.today().strftime("%Y-%m-%d")

    # 更新 Minecraft 版本
    if mc_version_type == "snapshot":
        if "snapshots" not in front_matter:
            front_matter["snapshots"] = []
        if mc_version not in front_matter["snapshots"]:
            front_matter["snapshots"].append(mc_version)
            front_matter["snapshots"].sort(
                key=lambda v: version_info[v]["releaseTime"],
                reverse=True,
            )
    else:
        if mc_version not in front_matter["minecraft-versions"]:
            front_matter["minecraft-versions"].append(mc_version)
            front_matter["minecraft-versions"].sort(
                key=lambda v: version_info[v]["releaseTime"],
                reverse=True,
            )

    # 更新 Fabric API 版本
    if mc_version not in front_matter["fabric-api"]:
        front_matter["fabric-api"][mc_version] = fapi_version
        front_matter["fabric-api"] = dict(
            sorted(
                front_matter["fabric-api"].items(),
                key=lambda item: (
                    version_info[item[0]]["type"] == "release",
                    version_info[item[0]]["releaseTime"],
                ),
                reverse=True,
            )
        )

    write_front_matter(post_path, front_matter)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Adds the necessary Jekyll metadata when an existing Wurst Client update is ported to a new Minecraft version"
    )
    parser.add_argument("wurst_version", help="Wurst version")
    parser.add_argument("mc_version", help="Minecraft version")
    parser.add_argument("fapi_version", help="Fabric API version")

    args = parser.parse_args()
    update_wurst_post(args.wurst_version, args.mc_version, args.fapi_version)

