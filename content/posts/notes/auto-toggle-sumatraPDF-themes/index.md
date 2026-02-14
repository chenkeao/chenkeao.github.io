---
title: "自动切换 SumatraPDF 主题"
slug: "auto-toggle-sumatraPDF-themes"
date: 2025-07-15T17:01:11+08:00
draft: false
toc: false
categories: [tips]
tags: [python, programming]
---

SumatraPDF 小巧，快速，对于浏览 PDF 来说再合适不过。唯一的缺点就是功能有些许缺失，例如：虽然有更换主题功能，但是不能跟随 Windows 主题一起变化，并且界面颜色改变时，文档的颜色不改变。于是乎每当在夜晚打开一份 PDF 都仿佛打开了太阳......

微软的应用商店 Microsoft Store 中有一款软件 Auto Dark Mode 可以自动切换 Windows 的暗色模式，并且支持在切换时运行脚本。正巧 SumatraPDF 可以通过配置文件配置，实际上对于一些高级设置（例如字体颜色和背景颜色）只支持使用配置文件设置。因此一个简单的方案就是：编写一个脚本根据参数不同自动修改 SumatraPDF 的配置文件，并且设置 Auto Dark Mode 使其在切换 Windows 主题时自动运行此脚本。

Auto Dark Mode 配置：

```
Enabled: true
Component:
  Scripts:
    - Name: SumatraPDF
      Command: python
      WorkingDirectory: C:\Users\kyle\AppData\Local\SumatraPDF
      ArgsLight: [toggle_theme.py, light]
      ArgsDark: [toggle_theme.py, dark]
      AllowedSources: [Any]

```

Python 脚本：

```python
import sys
import os
import re

if len(sys.argv) != 2 or sys.argv[1] not in ['light', 'dark']:
    print("Usage: python toggle_sumatra_theme.py [light|dark]")
    sys.exit(1)

mode = sys.argv[1]

config_path = os.path.join(os.getcwd(), "SumatraPDF-settings.txt")

if not os.path.isfile(config_path):
    print(f"Error: Config file not found: {config_path}")
    sys.exit(1)

if mode == 'light':
    theme_val = 'Light'
    text_color = '#262626'
    background_color = '#f8f3e9'
else:
    theme_val = 'Darker'
    text_color = '#bbbbbb'
    background_color = '#17191a'

with open(config_path, 'r', encoding='utf-8') as f:
    config = f.read()

config = re.sub(r'Theme\s*=\s*\w+', f'Theme = {theme_val}', config)
config = re.sub(r'TextColor\s*=\s*#[0-9a-fA-F]+', f'TextColor = {text_color}', config)
config = re.sub(r'BackgroundColor\s*=\s*#[0-9a-fA-F]+', f'BackgroundColor = {background_color}', config)

with open(config_path, 'w', encoding='utf-8') as f:
    f.write(config)
```
