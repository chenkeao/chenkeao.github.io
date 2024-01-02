---
title: Archlinux设置挂载硬盘时无需输入密码
date: 2023-06-05
---

在`archlinux`上使用`udisks2`挂载硬盘时需要输入密码，挂载位置为`/run/media/$USER`. 但是在`manjaro`上挂载时不需要密码，经过一番搜索，发现是`udisk2`的配置问题.  
解决方法是修改`/usr/share/polkit-1/actions/org.freedesktop.UDisks2.policy`文件，将其中

```xml
<action id="org.freedesktop.udisks2.filesystem-mount-system">
```

标签下的

```xml
<allow_active>auth_admin_keep</allow_active>
```

修改为

```xml
<allow_active>yes</allow_active>
```

然后重启`udisk2`即可

```bash
sudo systemctl restart udisks2.service
```

> 参考: [https://bbs.archlinuxcn.org/viewtopic.php?id=4582](https://bbs.archlinuxcn.org/viewtopic.php?id=4582)
