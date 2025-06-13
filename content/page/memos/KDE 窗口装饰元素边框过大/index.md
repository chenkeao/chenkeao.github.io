---
title: KDE 窗口装饰元素
description: 
date: 2024-02-08T15:23:00+08:00
image: 
math: 
license: 
hidden: false
comments: false
draft: false
---
在KDE上使用 aurorae 主题(除 Breeze 外的所有主题)时，如果字体 DPI 大于96，应用程序的边框会变得巨大无比，十分丑陋。偏偏在高分屏幕上增加字体 DPI 是放大界面而不损失清晰度的唯一方法，这一问题几乎动摇了我使用 KDE 的决心转而尝试了几天Gnome (颜值即生产力)。虽然最后还是回到了 KDE，但是这个问题还是亟待解决的。一开始使用的方法是，修改主题时不修改窗口装饰元素，还是用 Breeze 的窗口装饰元素，但是这样导致风格很割裂，不统一。网络上也没有什么好的解决方案，在 github 上看到主题 sweet 的作者声称解决了这个问题，但是当有人询问解决方案时他又不再回答。而另一款主题 materia 的作者提出可以修改主题的 css 文件，虽然这个方法还是不太优雅，但好歹是奏效了。  
具体为修改 `/usr/share/aurorae/themes/Materia/Materiarc`文件中的`PaddingTop`，`PaddingRight`，`PaddingBottom`，`PaddingLeft`参数，在DPI为120时，分别为`8`，`24`，`48`，`24`。
