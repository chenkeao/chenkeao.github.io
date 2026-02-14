---
title: "Toggle Color Theme on Plasma"
slug: "toggle-color-theme-on-plasma"
date: 2025-10-12T12:07:36+11:00
draft: false
toc: true
categories: [tips]
tags: [linux, shell]
description: "How to toggle between light and dark themes on KDE Plasma while preserving customizations."
---

Plasma introduced a quick settings panel in plasma 6, where you can toggle between `Breeze` and `Breeze Dark` themes. However, it will change the entire theme, ruining customizations like icons. You can toggle the color scheme manually by using the following command:

For dark theme:

```bash
plasma-apply-desktoptheme breeze-dark && plasma-apply-colorscheme BreezeDark && plasma-apply-cursortheme Breeze_Light && /usr/lib/plasma-changeicons Papirus-Dark && /usr/bin/sed -i 's/DefaultProfile=Light.profile/DefaultProfile=Dark.profile/' ~/.config/konsolerc
```

For light theme:

```bash
plasma-apply-desktoptheme breeze && plasma-apply-colorscheme Breeze && plasma-apply-cursortheme Breeze_Dark && /usr/lib/plasma-changeicons Papirus-Light && /usr/bin/sed -i 's/DefaultProfile=Dark.profile/DefaultProfile=Light.profile/' ~/.config/konsolerc
```

Before running the commands, ensure you have the `Papirus` icon theme installed and `Light` and `Dark` `konsole` profiles created. It will change the desktop theme, color scheme, cursor theme, icon theme, and `konsole` profile. Moreover, you can create two scripts and bind them to keyboard shortcuts for easy toggling.

> 24/10/25 Update

Plasma 6.5 was released, introducing a new feature to automatically switch between light and dark themes based on the time of day. However, it does not support custom icon themes and `konsole` profiles. A workaround is to run a script that monitors the theme change event and applies the necessary changes.

```bash
#!/bin/bash

# Monitor KDE theme changes and execute commands

# Function to check current color scheme
check_theme() {
    # Query KDE's color scheme setting (KF6 uses kreadconfig6)
    theme=$(kreadconfig6 --file kdeglobals --group General --key ColorScheme)

    # Check if it's a dark theme (common dark themes contain "Dark" in name)
    if [[ $theme == *"Dark"* ]] || [[ $theme == *"Breeze Dark"* ]]; then
        echo "dark"
    else
        echo "light"
    fi
}

# Get initial state
previous_theme=$(check_theme)
echo "Current theme: $previous_theme"

# Monitor D-Bus for KDE settings changes
dbus-monitor --session "type='signal',interface='org.kde.KGlobalSettings',member='notifyChange'" | \
while read -r line; do
    # When we detect a change notification
    if [[ $line == *"notifyChange"* ]]; then
        sleep 0.5  # Small delay to ensure settings are written

        current_theme=$(check_theme)

        # Only act if theme actually changed
        if [[ $current_theme != $previous_theme ]]; then
            echo "Theme changed: $previous_theme -> $current_theme"

            if [[ $current_theme == "dark" ]]; then
                echo "Executing dark theme commands..."
                # Add your dark theme commands here
                notify-send "Dark Mode" "Switched to dark theme"
                /usr/lib/plasma-changeicons Papirus-Dark && /usr/bin/sed -i 's/DefaultProfile=Light.profile/DefaultProfile=Dark.profile/' ~/.config/konsolerc

            elif [[ $current_theme == "light" ]]; then
                echo "Executing light theme commands..."
                # Add your light theme commands here
                notify-send "Light Mode" "Switched to light theme"
                /usr/lib/plasma-changeicons Papirus-Light && /usr/bin/sed -i 's/DefaultProfile=Dark.profile/DefaultProfile=Light.profile/' ~/.config/konsolerc
            fi

            previous_theme=$current_theme
        fi
    fi
done
```

A user-level systemd service can be created to run this script in the background:

```
[Unit]
Description=KDE Theme Monitor
After=graphical-session.target

[Service]
Type=simple
ExecStart=/home/username/.local/bin/theme-monitor.sh
Restart=on-failure

[Install]
WantedBy=default.target
```

And the commands to enable and start the service:

```bash
systemctl --user enable theme-monitor.service
systemctl --user start theme-monitor.service
```

Even though this solution works, it's quite hacky and heavy. Hoping for a better built-in feature in the future Plasma releases.