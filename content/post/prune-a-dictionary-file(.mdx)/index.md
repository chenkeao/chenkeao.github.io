---
title: Prune a Dictionary File(.mdx)
date: 2025-06-13T12:23:34+08:00
draft: false
comments: true
math: true
toc: true
readingTime: true
tags:
  - Python
---
## Introduction

Dictionaries such as Oxford and Longman are used as the sources for the definitions in my flashcards. However, they sometimes contain too much unnecessary information, therefore making it unwieldy and grandiose, leading to a low loading speed and distractions. Since an MDX file utilizes the HTML format to save entries, which closely resembles the tree structure, I use the term "prune" to describe the course of removing branches, i.e. html nodes that contain superfluous elements. Each group of three lines in a mdx file constitutes an entry of a word where the first and the third lines are delimiters while the middle line is html content. Since typically MDX files are quite large, a division step is required for parallel processing. Thus, the breakdown procedures are as follows:

1. split a gigantic mdx file into several small files. Note: the number of lines in each file must be a multiple of 3. 
2. process such files parallelly.
3. merge files into one mdx file.


## Code

```python
import sys
import os

def split_file_by_lines(file_path):
    file_name, file_extension = os.path.splitext(file_path)
    lines_per_file = 28311
    folder_path = "divided_files"

    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
    else:
        raise BaseException("directory exists")

    with open(file_path, "r", encoding="utf-8") as f:
        file_count = 0
        lines = []
        for line in f:
            lines.append(line)
            if len(lines) == lines_per_file:
                new_file_name = f"{file_name}_{file_count:02d}{file_extension}"
                with open(
                    os.path.join(folder_path, new_file_name), "w", encoding="utf-8"
                ) as chunk_file:
                    chunk_file.writelines(lines)
                lines = []
                file_count += 1
        if lines:
            new_file_name = f"{file_name}_{file_count}{file_extension}"
            with open(
                os.path.join(folder_path, new_file_name), "w", encoding="utf-8"
            ) as chunk_file:
                chunk_file.writelines(lines)
            file_count += 1


def merge_files(files, output_file="res.txt"):
    with open(output_file, "w") as f:
        pass
    for file in files:
        if os.path.isfile(file):
            with open(file, "r", encoding="utf-8") as f:
                content = f.read()
            with open(output_file, "a", encoding="utf-8") as f:
                f.write(content)

split_file_by_lines("./mdx.txt")
os.system(
    r'ls ./divided_files | parallel -j16 "python3 ./prune.py ./divided_files/{} ./divided_files/new_{}"'
)
merge_files([
    os.path.join("./divided_files", f) for f in os.listdir("./divided_files")
    if os.path.isfile(os.path.join("./divided_files", f))
    and f.startswith("new")
])
import shutil
shutil.rmtree("./divided_files")
```

detailed pruning code:

```python
#!/usr/bin/python
import sys
from bs4 import BeautifulSoup
def remove_tags_with_class(html_content):
    soup = BeautifulSoup(html_content, features="html.parser")
    [tag.decompose() for tag in soup.find_all("idm-gs-blk")]
    [tag.decompose() for tag in soup.find_all("pv-gs-blk")]
    def_tags = soup.find_all("def")
    for def_tag in def_tags:
        xhtml_a_texts = [a_tag.unwrap() for a_tag in def_tag.find_all("xhtml:a")]
        [tag.decompose() for tag in def_tag.find_all("chn")]
    new_soup = BeautifulSoup(
        r'<html><body></body></html>',
        "html.parser",
    )
    for tag in def_tags:
        new_soup.body.append(tag)
    for def_tag in def_tags:
        new_tag = soup.new_tag("p")
        new_tag.string = def_tag.get_text().strip()
        def_tag.replace_with(new_tag)
    return str(new_soup)
def process_html_file(input_file, output_file):
    with open(input_file, "r", encoding="utf-8") as file:
        lines = file.readlines()
    with open(output_file, "w", encoding="utf-8") as outfile:
        for line in lines:
            if line.strip().startswith("<head><link"):
                new_line = remove_tags_with_class(line)
                outfile.write(new_line + "\n")
            else:
                outfile.write(line)
input_file = sys.argv[1]
output_file = sys.argv[2]
process_html_file(input_file, output_file)
```