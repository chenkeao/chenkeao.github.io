---
title: Flatpak 与 KDE Global Menu 的兼容性问题
description: 
date: 2024-01-04T17:42:11+08:00
image: 
math: "false"
license: 
hidden: false
comments: false
draft: false
---
从 Flatpak 安装的 Obsidian 不显示全局菜单。执行下列命令后解决：

```bash
sudo flatpak override --talk-name=com.canonical.AppMenu.Regist  
rar md.obsidian.Obsidian
```