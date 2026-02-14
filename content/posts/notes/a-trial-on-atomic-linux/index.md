---
title: "A Trial on Atomic Linux"
slug: "a-trial-on-atomic-linux"
date: 2025-12-22T22:36:43+11:00
draft: false
toc: true
categories: []
tags: []
sitemap:
    changefreq: never
    priority: 1.0
---

# Issues and Solutions

## Dual Boot With Windows

As of Fedora 41, `/etc/default/grub` has been removed. Consequently, we cannot modify the default GRUB settings and generate the config file in the usual way. According to discussions on the Fedora Forum, we must modify the config files in `/boot/grub2` directly.

For example, to set a longer timeout, add the following line to `/boot/grub2/user.cfg`:

```
set timeout=5
```

To add a Windows entry, add the following code to `/boot/grub2/custom.cfg`:

```
menuentry 'Windows 11' {
    insmod part_gpt
    insmod fat
    search --no-floppy --fs-uuid --set=root EFI_UUID
    chainloader /EFI/Microsoft/Boot/bootmgfw.efi
}
```

Replace `EFI_UUID` with the actual UUID found using `blkid`.

The difference between these two files is the order of execution: `user.cfg` runs first, while `custom.cfg` runs last.

## Chrome shows CJK characters as tofu

```
mv .cache/fontconfig .cache/fontconfig.save
```