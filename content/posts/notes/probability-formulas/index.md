---
title: Probability Formulas
date: 2025-06-27T00:00:00.000Z
draft: false
toc: false
categories: []
tags: [math]
image: 1.png
---


## 概率论中的公式

在南信大的时候，我在概率论期末考试前整理了一份公式大全（当时我脑中全部能想到的），最近整理电脑文件时偶然又把它翻出来了。

## Chapter 1

$$
\begin{align}
&P(A+B)=P(A)+P(B)-P(AB) \\
&P(A-B)=P(A\bar{B})=P(A)-P(AB) \\
&P(AB)=P(A)P(B) \iff \text{A and B are independent} \\
&P(A+B+C)=P(A)+P(B)+P(C)-P(AB)-P(AC)-P(BC)+P(ABC) \\
&P(A|B)=\frac{P(AB)}{P(B)} \\
&P(B|A)=\frac{P(AB)}{P(A)} \\
&P(A)=P(A|B_1)P(B_1)+\cdots+P(A|B_n)P(B_n) \\
&P(B_i|A)=\frac{P(AB_i)}{P(A)}
\end{align}
$$

## Chapter 2

$$
\begin{align}
&E(XY)=E(X)E(Y) \iff \text{X and Y independent} \\
&E(X+Y)=E(X)+E(Y) \\
&E(X-Y)=E(X)-E(Y) \\
&E(c\times X)=c \times E(X) \text{, where c is constant}\\
&E(X+c)=E(X)+c \text{, where c is constant} \\
\newline
&Var(X+Y)=Var(X)+Var(Y) \iff \text{X and Y independent} \\
&Var(X+Y)=Var(X)+Var(Y)+2Cov(X,Y) \\
&Var(X-Y)=Var(X)+Var(Y)-2Cov(X,Y) \\
&Var(c\times X)=c^2\times Var(X) \text{, where c is constant} \\
&Var(X+c)=Var(X) \text{, where c is constant} \\
\newline
&Cov(X,Y)=Cov(Y,X)=E[(X-E(X))\times (Y-E(Y))]=E(XY)-E(X)E(Y) \\
&Cov(a\times X, b\times Y)=a\times b\times Cov(X,Y) \\
&Cov(X,X)=Var(X) \\
&Cov(X,c)=0 \text{, where c is constant} \\
&Cov(X_1+X_2,Y)=Cov(X_1,Y)+Cov(X_2,Y) \\
&Cov(X+a,Y+b)=Cov(X,Y) \\
&\Rho_{XY}=\frac{Cov(X,Y)}{\sqrt{Var(X)}\sqrt{Var(Y)}} \\
&\Rho_{XY}=1 \iff \exists \text{ a and b } \Rightarrow P(Y=a+bX)=1 \\
\end{align}
$$

## Chapter 3
