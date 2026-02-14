---
title: "彻底关闭 Windows 11 的虚拟化"
slug: "disable-windows11-virtualization"
date: 2025-06-26T14:31:50+08:00
draft: false
toc: false
categories: [tips]
tags: []
---

## Disabling-Hyper-V

Certain advanced Windows 10 features, such as _Device Guard_ (in particular,
_Hypervisor-protected code integrity_ or HVCI) and _Credential Guard_, can
prevent Hyper-V from being completely disabled. In other words, when any of
these features are enabled, so is Hyper-V, even though Windows may report
otherwise.

The _Device Guard and Credential Guard hardware readiness tool_ released by
Microsoft can disable the said Windows 10 features along with Hyper-V:

1. Download the latest version of the tool from [here](https://www.microsoft.com/en-us/download/details.aspx?id=53337) dgreadiness-tool. The
   following steps assume version 3.6.
1. Unzip.
1. Open an **elevated** (i.e. _Run as administrator_) Command Prompt.
1. `@powershell -ExecutionPolicy RemoteSigned -Command "X:\path\to\dgreadiness_v3.6\DG_Readiness_Tool_v3.6.ps1 -Disable"`
1. Reboot.

如上所述，由于 _Device Guard_ 和 _Credential Guard hardware readiness tool_ 功能，Hyper-V 无法被彻底关闭。使用微软提供的此脚本：[here](https://www.microsoft.com/en-us/download/details.aspx?id=53337) 可以将这些功能彻底关闭，从而彻底关闭 Hyper-V。

> https://github.com/gmh5225/Disabling-Hyper-V
