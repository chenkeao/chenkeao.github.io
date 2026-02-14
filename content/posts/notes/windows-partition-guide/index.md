---
title: "Windows Partition Guide"
slug: "windows-partition-guide"
date: 2025-08-12T16:35:30+10:00
draft: false
toc: false
categories: [tips]
tags: []
---

The Windows installer assigns too little space to the EFI and Recovery partitions by default, which is not ideal for future updates. To resolve this issue, we need to manually partition using `Diskpart` during the installation phase. The following script is from Microsoft and serves as an example of a partitioning script.

```batch
rem == CreatePartitions-UEFI.txt ==
rem == These commands are used with DiskPart to
rem    create five partitions
rem    for a UEFI/GPT-based PC.
rem    Adjust the partition sizes to fill the drive
rem    as necessary. ==
select disk 0
clean
convert gpt
rem == 1. Windows RE tools partition ===============
create partition primary size=300
format quick fs=ntfs label="Windows RE tools"
assign letter="T"
set id="de94bba4-06d1-4d40-a16a-bfd50179d6ac"
gpt attributes=0x8000000000000001
rem == 2. System partition =========================
create partition efi size=100
rem    ** NOTE: For Advanced Format 4Kn drives,
rem               change this value to size = 260 **
format quick fs=fat32 label="System"
assign letter="S"
rem == 3. Microsoft Reserved (MSR) partition =======
create partition msr size=128
rem == 4. Windows partition ========================
rem ==    a. Create the Windows partition ==========
create partition primary
rem ==    b. Create space for the recovery image ===
shrink minimum=15000
rem       ** NOTE: Update this size to match the size
rem                of the recovery image           **
rem ==    c. Prepare the Windows partition =========
format quick fs=ntfs label="Windows"
assign letter="W"
rem === 5. Recovery image partition ================
create partition primary
format quick fs=ntfs label="Recovery image"
assign letter="R"
set id="de94bba4-06d1-4d40-a16a-bfd50179d6ac"
gpt attributes=0x8000000000000001
list volume
exit
```

The following is a modified version of the above script, with all comments removed and the partition size changed.

```batch
select disk 0
clean
convert gpt
create partition primary size=300
format quick fs=ntfs label="Windows RE tools"
assign letter="T"
set id="de94bba4-06d1-4d40-a16a-bfd50179d6ac"
gpt attributes=0x8000000000000001


create partition efi size=512
format quick fs=fat32 label="System"
assign letter="S"

create partition msr size=128

create partition primary
shrink minimum=15000
format quick fs=ntfs label="Windows"
assign letter="W"

create partition primary
format quick fs=ntfs label="Recovery image"
assign letter="R"
set id="de94bba4-06d1-4d40-a16a-bfd50179d6ac"
gpt attributes=0x8000000000000001
exit
```

## References

https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-8.1-and-8/hh825686(v=win.10)
