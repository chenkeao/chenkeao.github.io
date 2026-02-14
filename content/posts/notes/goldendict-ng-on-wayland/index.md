---
title: "Goldendict Ng on Wayland"
slug: "goldendict-ng-on-wayland"
date: 2025-09-16T19:09:25+10:00
draft: false
toc: true
categories: [tips]
tags: []
---

The shortcut Ctrl+C+C is used to look up the selected word in Goldendict and Goldendict-NG. However, this shortcut does not work properly on Wayland, because Wayland does not support the underlying function it relies on, as explained in the [official documentation](https://xiaoyifang.github.io/goldendict-ng/topic_wayland/).

Fortunately, there is a simple workaround that is even more convenient than the original method: use `wl-paste` together with global shortcuts provided by desktop environments (such as KDE, GNOME, etc.).

Create a new shortcut in the system settings and set the shortcut to run the following command:

```bash
bash -c 'goldendict "$(wl-paste -n -p)"'
```
