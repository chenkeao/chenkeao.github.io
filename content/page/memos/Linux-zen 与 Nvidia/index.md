---
title: Linux Zen 与 Nvidia
description: 
date: 2024-01-01T20:17:04+08:00
image: 
math: 
license: 
hidden: false
comments: false
draft: false
---
`prime-run steam`命令报错`X Error of failed request:  BadValue (integer parameter out of range for operation)`，原因是内核与 nvidia 驱动不匹配。按照 archwiki 的说明，安装`linux-zen-headers`和`nvidia-dkms`并添加内核参数`CONFIG_DRM_SIMPLEDRM=y`后解决。
