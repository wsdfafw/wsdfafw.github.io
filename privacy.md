---
title: 隐私策略
permalink: /privacy/
google_auto_ads: false
---
{% include title.html l1 = page.title l2 = page.description %}

<div class="padding20 no-padding-left no-padding-right bg-grayLighter">
	<div class="container">
		<h2><abbr title="Too long; Didn't read. (basically a short summary of this page)">TL;DR:</abbr></h2>
		<h3 class="text-normal">我不做的事:</h3>
		<ul>
      <li><p>收集您的《我的世界》用户名和/或密码</p></li>
      <li><p>用香肠分发恶意软件(或“潜在有害程序”)</p></li>
      <li><p>出售您的数据</p></li>
		</ul>
		<h3 class="text-normal">我做什么:</h3>
		<ul>
      <li><p>使用谷歌分析来看看有多少人在使用香肠</p></li>
      <li><p>在此网站上销售广告</p></li>
		</ul>
	</div>
</div>

<div class="padding20 no-padding-left no-padding-right">
  <div class="container">
		<h2 class="text-normal">谷歌分析</h2>
    <p>I use Google Analytics to see how many people are using Wurst and which versions are the most popular. I use this data to decide when to stop supporting old Minecraft versions. <b>There is no Google Analytics on this website, it's only in the Wurst Client itself.</b></p>
    <p>When you launch Wurst, it only sends a single message to the Google Analytics server saying which Wurst version and Minecraft version was just launched. It doesn't track what you do with Wurst or how long you use it for.</p>
    <p>Google Analytics uses a random ID to tell the difference between one computer launching Wurst twice and two computers each launching Wurst once. Wurst generates this ID on its own and changes it every 3 days. This ensures that Google can't do anything sneaky and try use this data for ads.</p>
    <p>Unfortunately I can't seem to get the "anonymizeIp" option working with this highly customized Google Analytics setup, so Google does still store your IP address. You are welcome to have a look at the <a href="https://github.com/Wurst-Imperium/Wurst7/tree/master/src/main/java/net/wurstclient/analytics">source code</a> to see if you can figure this out. (Of course I am also considering to ditch Google Analytics altogether, but setting up my own analytics server is no small feat.)</p>
    <p>You can turn off Google Analytics by going to "Wurst Options" > "Count Users" and setting it to "OFF".</p>
    <p>You can view Google's privacy policy here: <a href="https://policies.google.com/privacy" target="_blank">https://policies.google.com/privacy</a></p>
	</div>
</div>

<div class="padding20 no-padding-left no-padding-right bg-grayLighter">
  <div class="container">
		<h2 class="text-normal">可信的分析</h2>
    <p>我目前正在尝试使用 <a href="https://plausible.io/" target="_blank">似是而非</a> 作为谷歌分析的一个更加隐私友好的替代方案。似是而非只是在这个网站上，而不是在香肠客户端本身。</p>
	</div>
</div>

<div class="padding20 no-padding-left no-padding-right">
  <div class="container">
		<h2 class="text-normal">Google AdSense</h2>
    <p>I use Google AdSense to sell ads on this website. <strong>I don't sell data and <a href="https://safety.google/privacy/ads-and-data/" target="_blank">neither does Google</a>!</strong></p>
    <p>Google has their own privacy policy which you can view here: <a href="https://policies.google.com/technologies/ads" target="_blank">https://policies.google.com/technologies/ads</a></p>
    <p>I have configured Google AdSense so that it won't show any personalized ads to visitors in the EU or California. However, I am still required by Google to show a consent popup that allows users to make their own choice about personalized ads.</p>
    <p>I am not sure what happens if you use the consent popup to try and enable personalized ads. I have done everything I can on my end to disable them.</p>
    <p>I have also <b>disabled</b> the following Google AdSense options worldwide:</p>
    <ul>
      <li>"User-based ads" (personalization based on Google Account information)</li>
      <li>"Additional ad technology vendors" (personalization based on third party ad technology)</li>
      <li>"First-party cookies" (bypasses privacy tools that block third-party cookies)</li>
    </ul>
    <p>Google AdSense uses <a href="https://support.google.com/adsense/answer/7549925?hl=en" target="_blank">third-party cookies</a> to keep track of things like how often each ad is seen and how often each ad is clicked on. I have turned off Google's personalization and first-party cookies, as stated above.</p>
	</div>
</div>

<div class="padding20 no-padding-left no-padding-right bg-grayLighter">
  <div class="container">
		<h2 class="text-normal">AdMaven</h2>
    <p>I also partner with AdMaven to sell ads on the files.wurstimperium.net website. They have their own privacy policy which you can view here: <a href="https://ad-maven.com/privacy-policy/" target="_blank" rel="nofollow">https://ad-maven.com/privacy-policy/</a></p>
    <p>I know these ads can be annoying so I've made them completely optional. Every download link that shows AdMaven ads also has a "direct link" option next to it that doesn't show these ads.</p>
    <p>I hope that this provides an acceptable compromise but I am <a href="/contact/">open to feedback</a> about it. I am aware that going too far with ads would only hurt Wurst in the long run, so if it turns out that this solution is not acceptable then I will remove these ads again.</p>
	</div>
</div>

<div class="padding20 no-padding-left no-padding-right">
  <div class="container">
		<h2 class="text-normal">其他东西</h2>
    <p>Since I don't have your email address, I can't send you one of those annoying "we have updated our privacy policy" e-mails. Instead, I have a GitHub repository where you can see how this page has changed over time: <a href="https://github.com/Wurst-Imperium/WurstClient.net/commits/gh-pages/privacy.md" target="_blank">https://github.com/Wurst-Imperium/WurstClient.net/commits/gh-pages/privacy.md</a></p>
	</div>
</div>
