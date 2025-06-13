---
title: "Convert All Mp4 to Mp3 in One Command"
date: 2025-06-13T12:37:35+08:00
draft: false
comments: false
math: true
toc: false
readingTime: true
tags:
  - Bash
---
I get a directory like following: 

```
  .
  ├── S01
  │   ├── TBBTS01E01.mp4
  │   ├── TBBTS01E01.mp4
  │   ├── TBBTS01E01.mp4
  │   ...
  ├── S02
  │   ├── TBBTS02E01.mp4
  │   ├── TBBTS02E02.mp4
  │   ├── TBBTS02E03.mp4
  │   ...
  ├── S03
  │   ├── TBBTS03E01.mp4
  │   ├── TBBTS03E02.mp4
  │   ├── TBBTS03E03.mp4
  │   ...
  ├── S04
  │   ├── TBBTS04E01.mp4
  │   ├── TBBTS04E02.mp4
  │   ├── TBBTS04E03.mp4
  │   ...
  ├── S05
  │   ├── TBBTS05E01.mp4
  │   ├── TBBTS05E02.mp4
  │   ├── TBBTS05E03.mp4
  │   ├── TBBTS05E04.mp4
  │   ...
  └── S06
	  ├── TBBTS06E01.mp4
	  ├── TBBTS06E02.mp4
	  ├── TBBTS06E03.mp4
	  ...
```
I want to transform all mp4 files to mp3 and move them to a new directory called mp3 in current directory.
here is the command:
```bash
  find . -name "*.mp4" -type f -print | parallel -j20 "ffmpeg -i {} ./mp3/{/.}.mp3"
```
where `{/.}` represents a clear file name that stripped extension name and path
