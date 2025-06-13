---
title: Gnome 中 .desktop 文件的奇怪问题
date: 2024-02-18
---
众所周知，gnome 目前默认使用 wayland，但某些程序在 wayland 下表现不佳。例如 telegram 有时边框外会显示奇怪的阴影，解决方法是开启选项：使用系统边框。然而在 wayland 下没有此选项，取而代之的是：使用 qt 边框，但 qt 边框与 gtk 应用的风格很不统一，导致看起来很丑。解决方法是在其 .desktop 文件中添加环境变量使 telegram 强制使用 x11，事实上，我已经使用`QT_QPA_PLATFORM=xcb`这个环境变量为另一个程序 anki 解决了这个问题。

然而，同样的方法对 telegram 却失效了。经过一番摸索我发现，直接运行 .desktop 文件，在命令行运行指令或使用`dex`命令运行都生效，可一旦从 gnome 的应用抽屉里启动或使用`gtk-launch`命令运行启动就不生效。这说明文件本身并没有问题，问题出在 gtk 和 gnome 上。问题到这里就陷入了僵局，但是我灵光一现，想到问题或许是 telegram 的 .desktop 文件奇怪的名字导致的：由于 telegram 的全名为 telegram-desktop，因此其 .desktop 文件名为 org.telegram.desktop.desktop。我怀疑是这两个重复的 .desktop 后缀在作祟， 于是我将其改名为 telegram.desktop，随后`update-desktop-datebase ~/.local/share/applications/`，问题果然解决。