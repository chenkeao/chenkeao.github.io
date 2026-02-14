---
title: A Study on Linear Regression
slug: a-study-on-linear-regression
date: 2025-10-26T07:29:27.000Z
draft: true
toc: true
categories: []
tags: []
sitemap:
  changefreq: never
  priority: 1
---


$$
\begin{aligned}
y &= \mathbf{x}^\top A \mathbf{x} \\
dy &= (d\mathbf{x})^\top A \mathbf{x} + \mathbf{x}^\top A d\mathbf{x} \\
&= (d\mathbf{x})^\top A \mathbf{x} + (\mathbf{x}^\top A d\mathbf{x})^\top \\
&= (d\mathbf{x})^\top A \mathbf{x} + (d\mathbf{x})^\top A^\top \mathbf{x} \\
&= (d\mathbf{x})^\top (A + A^\top) \mathbf{x} \\
\end{aligned}
$$

Basis function

$$
R^n \rightarrow R
$$

$$
 \mathcal{N}
$$
