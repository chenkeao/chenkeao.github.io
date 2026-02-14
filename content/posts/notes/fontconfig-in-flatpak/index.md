---
title: "Fontconfig in Flatpak"
slug: "fontconfig-in-flatpak"
date: 2025-11-03T16:35:29+11:00
draft: false
toc: true
categories: [tips]
tags: [linux, flatpak, fontconfig]
sitemap:
    changefreq: never
    priority: 1.0
---

Applications installed via Flatpak do not respect fontconfig settings stored in `~/.config/fontconfig/` by default. The solution is to copy the `fontconfig` directory to `.var/app/<APP_ID>/config/`, where `<APP_ID>` is the Flatpak application ID. 

For example:

```bash
cp -r ~/.config/fontconfig ~/.var/app/com.example.App/config/
```