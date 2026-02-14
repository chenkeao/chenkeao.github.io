---
title: "Disable Network Discovery of Speakers on Fedora"
slug: "disable-network-discovery-of-speakers-on-fedora"
date: 2025-11-04T15:39:12+11:00
draft: false
toc: true
categories: [tips]
tags: [linux]
sitemap:
    changefreq: never
    priority: 1.0
---

The network discovery of remote speakers is enabled by default on Fedora, leading to a very long list in the output device setting. To disable this feature:

```bash
mkdir -p ~/.config/pipewire/pipewire.conf.d/
echo "context.properties = {
        module.raop = false
}" > ~/.config/pipewire/pipewire.conf.d/noraop.conf
systemctl --user restart pipewire
```

Source: [Fedora Discussion](https://discussion.fedoraproject.org/t/airplay-audio-outputs-discovery-enabled-by-default/166328)