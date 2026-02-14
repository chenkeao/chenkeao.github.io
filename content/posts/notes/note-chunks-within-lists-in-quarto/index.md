---
title: "Code Chunks Within Lists in Quarto"
slug: "code-chunks-within-lists-in-quarto"
date: 2025-09-14T14:41:04+10:00
draft: false
toc: true
categories: [tips]
tags: []
---

When writing code within lists like the following structure, quarto cannot render the list properly.

````markdown
1. question

   answer

   ```{python}
   print()
   ```
````

The trick is to add an extra space after single-digit list indexes. This is because indentation is significant in Quarto, and both the list itself and any nested code blocks must start in the same column (note that the index itself, e.g., `1.`, `2.`, etc., does not count toward the list indentation).

For example, in my VSCode setup, pressing Tab inserts four spaces, but there are only use three characters before a list with single-digit indexes (e.g., `1. `). As a result, when I try to indent a code block under such a list, it doesn’t align correctly with the list column. Adding an extra space after the index ensures proper alignment.

In addition, unlike code blocks, which must be strictly aligned with the list, other lines (non-code content) should be indented at least as much as the list and code blocks.

````markdown
1.  question 1

    answer 1 (work)
     answer 1 (work)
   answer 1 (doesn't work)

    ```{python}
    # some code
    ```
````

> https://forum.posit.co/t/code-chunks-within-lists-in-quarto/159866