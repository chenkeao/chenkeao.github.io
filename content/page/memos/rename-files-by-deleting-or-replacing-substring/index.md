---
title: "Rename Files by Deleting or Replacing Substring"
date: 2025-06-13T12:38:57+08:00
draft: false
comments: true
math: true
toc: false
readingTime: true
tags: [Bash]
---
```bash
for f in `ls *.mp3`; do
mv "$f" `echo "$f" | sed 's/生活大爆炸/TBBT/g'`
done
```
