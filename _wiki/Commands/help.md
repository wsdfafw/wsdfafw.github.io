---
title: .help
category: Command
labels:
  - stub
---
## Overview
`.help` is a command that shows the command list or the help for a command.

## Tips
- If you're lost, type `.help help`.


## .help

<WRAP 516px>
^  .help  ^^
|{{ help.webp?500 |The output of typing .help in Wurst 7.20.}}||
^Type|[[:Command]]|
^Category|[[:No Category|none]]|
^In-game description|"Shows help for a command or a list of commands.\\ \\ 
Syntax: .help <command>\\ List commands: .help [<page>]"|
^[[:keybinds#default_keybinds|Default keybind]]|none|
^Source code|[[w7src>net/wurstclient/commands/HelpCmd.java]]|
</WRAP>

.help is a [[:command|chat command]] that can either show a list of all available commands or show the help text and syntax for a specific command.

## Syntax

Main article: [[Command Syntax]]

  * '.help \\<command>\' shows help text and syntax for a given command.
  * ''List commands: .help [<page>]'' lists all available commands, split into pages with 8 commands each. 

Examples:
  * '.help' shows the first page of the command list.
  * '.help 2' shows the second page of the command list.
  * '.help taco' shows the syntax of [[.taco]]. 
  * '.help .taco' also shows the syntax of [[.taco]].

## Tips
  * If you ever forget the syntax for '.help', just type '.help help'.

## 变化

^Version^Changes^
|[[update:Wurst 1.3 Beta]]|Added chat commands: "[[.help]]", "[[.nuker]]", "[[.rv]]", "[[.say]]" and "[[.t]]".|

{{tag>client-side}}
