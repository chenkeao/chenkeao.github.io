---
title: "One Time Reboot to Win Shortcut"
slug: "one-time-reboot-to-win-shortcut"
date: 2025-09-16T23:00:17+10:00
draft: false
toc: true
categories: [tips]
tags: [shell, linux]
sitemap:
    changefreq: never
    priority: 1.0
---

## Reboot to Windows Once from Linux

On a dual-boot machine, you may occasionally want to reboot into Windows from Linux for a specific task—such as using a Windows-only application—and then return to Linux afterward. While GRUB allows you to choose which OS to boot, it is more convenient to have a one-time reboot option that boots directly into Windows, then automatically returns to Linux as the default on subsequent boots. This can be accomplished using `efibootmgr` to set the next boot entry to Windows.

```bash
sudo efibootmgr -n <WindowsBootEntryNumber>
```

Here, `<WindowsBootEntryNumber>` is the boot entry number for Windows, which you can find by running `efibootmgr` without any arguments. The output will list all boot entries and their numbers. For example:

```bash
BootCurrent: 0005
Timeout: 2 seconds
BootOrder: 0005,0004,2001,2002,2003
Boot0001* EFI PXE 0 for IPv4
Boot0002* EFI PXE 0 for IPv6
Boot0004* Windows Boot Manager
Boot0005* GRUB
```

To set the next boot to Windows, run:

```bash
efibootmgr -n 0004
```

After executing this command, reboot your machine. It will boot into Windows for that session. On the next reboot, it will default back to Linux.

## Creating a Shortcut Script

To streamline this process, create a simple script at `/usr/local/bin/reboot2win`:

```bash
#!/usr/bin/env bash
# reboot2win: A script to reboot into Windows once
logger -t reboot2win "reboot2win executed by ${SUDO_USER:-$USER}"
# privileged command(s) below:
/usr/bin/efibootmgr -n 0004 && /usr/bin/systemctl reboot
```

Make it executable and set ownership to root for security:

```bash
sudo chmod +x /usr/local/bin/reboot2win && sudo chown root:root /usr/local/bin/reboot2win
```

Now you can run `sudo reboot2win` to reboot into Windows once.

## Make It Even Easier with Polkit

To avoid typing `sudo` every time, you can create a polkit rule to allow your user to run the script without a password prompt. Create a file at `/etc/polkit-1/rules.d/50-reboot2win.rules` with the following content:

```javascript
polkit.addRule(function (action, subject) {
  if (action.id == "org.freedesktop.policykit.exec") {
    var program = action.lookup("program");
    if (
      program == "/usr/local/bin/reboot2win" &&
      subject.isInGroup("wheel") &&
      subject.local &&
      subject.active
    ) {
      return polkit.Result.YES;
    }
  }
  return polkit.Result.NOT_HANDLED;
});
```

This rule allows users in the `wheel` group to execute the `reboot2win` script without a password prompt. Adjust the group name if your user belongs to a different group.

To apply the rule, restart the polkit service:

```bash
sudo systemctl restart polkit
```

Now you can simply run the following command without `sudo`:

```bash
pkexec /usr/local/bin/reboot2win
```

Finally, you can add an `alias` or a desktop shortcut for easier access. Also, to avoid accidentally running the command, you can use a confirmation prompt dialog such as `kdialog` or `zenity`. For example, using `kdialog`:

```bash
bash -lc 'kdialog --yesno "Are you sure you want to reboot the system?"' && pkexec /usr/local/bin/reboot2win
```

This will show a confirmation dialog before executing the reboot command.
