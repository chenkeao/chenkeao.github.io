---
title: Anki 与 Wayland 的兼容性问题
date: 2023-12-31
slug: anki-compatibility-with-wayland
draft: false
comments: false
math: true
toc: false
readingTime: true
tags:
  - Bash
---
为了使用 waydroid 不得已换 X11 为 Wayland，随之问题就来了。基于 Qt6 的 Anki 似乎与 Wayland 兼容的不太好，无法在 KDE 中使用全局菜单，并且 Goldendict 的`Ctrl+c+c`粘贴板查词功能在 Anki 里也无法使用了。
Google上搜索了一番后发现可以用`WAYLAND_DISPLAY=""`环境变量强制 Anki 使用 X11 解决。使用后果然没有上述问题了，但是出现了新的问题： fcitx 无法在 Anki 里使用了。略微思考后，我想起来我遵从 Wayland 的建议删掉了在`/etc/environment`全局设置的`QT_IM_MODULE=fcitx`。这个问题官方的建议也提及了，可以单独为 Anki 设置环境变量，设置后问题果然解决。启动命令：
```shell
WAYLAND_DISPLAY= QT_IM_MODULE=fcitx Anki
```
实际上还有另一种方式，可以为某些 Qt 应用设置 `QT_QPA_PLATFORM=xcb`环境变量以解决其在 Wayland 中表现不正常的问题。