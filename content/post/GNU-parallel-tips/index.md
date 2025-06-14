---
title: GNU Parallel 的妙用
date: 2023-06-08
tags:
  - Bash
slug: GNU-parallel-tips
---
Android QQ 的图片文件是以下面这种结构保存的，以`Cache_`开头的文件就是图片。这种结构在浏览时要分别点进每个文件夹才能看到图片，很不方便。

```bash
├── 0a0
│   ├── Cache_2783644ca99260a0
│   └── Cache_-4dfb57e9a7cec0a0
├── 0a6
│   ├── Cache_373e35b7b8a290a6
│   ├── Cache_-489f6e9c62ea10a6
│   └── Cache_57776dc1e17110a6
└── 0a7
    └── Cache_25d732f84bd7d0a7
```

使用 GNU Parallel 配合`mv`可以快速的 “解散” 每个二级文件夹，变成以下这种结构。

```bash
.
├── Cache_25d732f84bd7d0a7
├── Cache_2783644ca99260a0
├── Cache_373e35b7b8a290a6
├── Cache_-489f6e9c62ea10a6
├── Cache_-4dfb57e9a7cec0a0
└── Cache_57776dc1e17110a6
```

命令如下:

```bash
find . -name "*" -type f -print | parallel mv {} ./{/}
```

> 参考: [https://www.myfreax.com/gnu-parallel/](https://www.myfreax.com/gnu-parallel/)
