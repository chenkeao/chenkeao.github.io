---
title: "Convert IPynb to PDF With Reporting Format"
date: 2025-06-13T12:29:01+08:00
draft: false
comments: true
math: true
toc: false
readingTime: true
tags: [Python]
---

Install `nbconvert` via `pip`

```bash
pip install nbconvert
```

Now, the command 

```bash
jupyter nbconvert --to pdf --template-file report filename.ipynb
```

should work well, producing a document with a table of contents and properly formatted code blocks. However, an unnecessary counter appears before each code block, wasting space and serving no purpose. To remove it, a custom template is required.

The template consists of two files: `assignment.tex.j2` and `style_assignment.tex.j2`, which are modified duplicates of existing files. Template files are located in `share\jupyter\nbconvert\templates\latex`. Duplicate `report.tex.j2` and modify the second line to

```latex
((* set cell_style = 'style_assignment.tex.j2' *))
```

The file `style_assignment.tex.j2` is a duplicate of `style_jupyter.tex.j2` with the line 

```latex
{\ttfamily\llap{{\color{#2}[#3]:\hspace{3pt}#4}}\vspace{-\baselineskip}}
```

replaced by 

```latex
{\ttfamily\llap{{\color{#2}\hspace{3pt}#4}}}
```

Moreover, in order to support Chinese, the code below should be added

```latex
\usepackage{xeCJK}
\setCJKmainfont{SimSun}
```

Now that custom files are used, the command is

```bash
jupyter nbconvert --to pdf --template-file assignment filename.ipynb
```

The complete file is shown as follows:

1. assignment.tex.j2

```latex
% Default to the notebook output style
((* if not cell_style is defined *))
    ((* set cell_style = 'style_assignment.tex.j2' *))
((* endif *))

% Inherit from the specified cell style.
((* extends cell_style *))


%===============================================================================
% Latex Book
%===============================================================================

((* block predoc *))
    ((( super() )))
    ((* block tableofcontents *))\tableofcontents((* endblock tableofcontents *))
((* endblock predoc *))

((* block docclass *))
\documentclass{report}
((* endblock docclass *))

((* block markdowncell scoped *))
((( cell.source | citation2latex | strip_files_prefix | convert_pandoc('markdown+tex_math_double_backslash', 'json',extra_args=[]) | resolve_references | convert_pandoc('json','latex', extra_args=["--top-level-division=chapter"]) )))
((* endblock markdowncell *))
```

2. style_assignment.tex.j2

```latex
((=- IPython input/output style -=))
((*- extends 'base.tex.j2' -*))

((*- block packages -*))
	\usepackage{xeCJK}
	\setCJKmainfont{SimSun}
    \usepackage[breakable]{tcolorbox}
    \usepackage{parskip} % Stop auto-indenting (to mimic markdown behaviour)
    ((( super() )))
((*- endblock packages -*))

((*- block definitions -*))
    ((( super() )))
% Pygments definitions
    (((- resources.latex.pygments_definitions )))

    % For linebreaks inside Verbatim environment from package fancyvrb.
    \makeatletter
        \newbox\Wrappedcontinuationbox
        \newbox\Wrappedvisiblespacebox
        \newcommand*\Wrappedvisiblespace {\textcolor{red}{\textvisiblespace}}
        \newcommand*\Wrappedcontinuationsymbol {\textcolor{red}{\llap{\tiny$\m@th\hookrightarrow$}}}
        \newcommand*\Wrappedcontinuationindent {3ex }
        \newcommand*\Wrappedafterbreak {\kern\Wrappedcontinuationindent\copy\Wrappedcontinuationbox}
        % Take advantage of the already applied Pygments mark-up to insert
        % potential linebreaks for TeX processing.
        %        {, <, #, %, $, ' and ": go to next line.
        %        _, }, ^, &, >, - and ~: stay at end of broken line.
        % Use of \textquotesingle for straight quote.
        \newcommand*\Wrappedbreaksatspecials {%
            \def\PYGZus{\discretionary{\char`\_}{\Wrappedafterbreak}{\char`\_}}%
            \def\PYGZob{\discretionary{}{\Wrappedafterbreak\char`\{}{\char`\{}}%
            \def\PYGZcb{\discretionary{\char`\}}{\Wrappedafterbreak}{\char`\}}}%
            \def\PYGZca{\discretionary{\char`\^}{\Wrappedafterbreak}{\char`\^}}%
            \def\PYGZam{\discretionary{\char`\&}{\Wrappedafterbreak}{\char`\&}}%
            \def\PYGZlt{\discretionary{}{\Wrappedafterbreak\char`\<}{\char`\<}}%
            \def\PYGZgt{\discretionary{\char`\>}{\Wrappedafterbreak}{\char`\>}}%
            \def\PYGZsh{\discretionary{}{\Wrappedafterbreak\char`\#}{\char`\#}}%
            \def\PYGZpc{\discretionary{}{\Wrappedafterbreak\char`\%}{\char`\%}}%
            \def\PYGZdl{\discretionary{}{\Wrappedafterbreak\char`\$}{\char`\$}}%
            \def\PYGZhy{\discretionary{\char`\-}{\Wrappedafterbreak}{\char`\-}}%
            \def\PYGZsq{\discretionary{}{\Wrappedafterbreak\textquotesingle}{\textquotesingle}}%
            \def\PYGZdq{\discretionary{}{\Wrappedafterbreak\char`\"}{\char`\"}}%
            \def\PYGZti{\discretionary{\char`\~}{\Wrappedafterbreak}{\char`\~}}%
        }
        % Some characters . , ; ? ! / are not pygmentized.
        % This macro makes them "active" and they will insert potential linebreaks
        \newcommand*\Wrappedbreaksatpunct {%
            \lccode`\~`\.\lowercase{\def~}{\discretionary{\hbox{\char`\.}}{\Wrappedafterbreak}{\hbox{\char`\.}}}%
            \lccode`\~`\,\lowercase{\def~}{\discretionary{\hbox{\char`\,}}{\Wrappedafterbreak}{\hbox{\char`\,}}}%
            \lccode`\~`\;\lowercase{\def~}{\discretionary{\hbox{\char`\;}}{\Wrappedafterbreak}{\hbox{\char`\;}}}%
            \lccode`\~`\:\lowercase{\def~}{\discretionary{\hbox{\char`\:}}{\Wrappedafterbreak}{\hbox{\char`\:}}}%
            \lccode`\~`\?\lowercase{\def~}{\discretionary{\hbox{\char`\?}}{\Wrappedafterbreak}{\hbox{\char`\?}}}%
            \lccode`\~`\!\lowercase{\def~}{\discretionary{\hbox{\char`\!}}{\Wrappedafterbreak}{\hbox{\char`\!}}}%
            \lccode`\~`\/\lowercase{\def~}{\discretionary{\hbox{\char`\/}}{\Wrappedafterbreak}{\hbox{\char`\/}}}%
            \catcode`\.\active
            \catcode`\,\active
            \catcode`\;\active
            \catcode`\:\active
            \catcode`\?\active
            \catcode`\!\active
            \catcode`\/\active
            \lccode`\~`\~
        }
    \makeatother

    \let\OriginalVerbatim=\Verbatim
    \makeatletter
    \renewcommand{\Verbatim}[1][1]{%
        %\parskip\z@skip
        \sbox\Wrappedcontinuationbox {\Wrappedcontinuationsymbol}%
        \sbox\Wrappedvisiblespacebox {\FV@SetupFont\Wrappedvisiblespace}%
        \def\FancyVerbFormatLine ##1{\hsize\linewidth
            \vtop{\raggedright\hyphenpenalty\z@\exhyphenpenalty\z@
                \doublehyphendemerits\z@\finalhyphendemerits\z@
                \strut ##1\strut}%
        }%
        % If the linebreak is at a space, the latter will be displayed as visible
        % space at end of first line, and a continuation symbol starts next line.
        % Stretch/shrink are however usually zero for typewriter font.
        \def\FV@Space {%
            \nobreak\hskip\z@ plus\fontdimen3\font minus\fontdimen4\font
            \discretionary{\copy\Wrappedvisiblespacebox}{\Wrappedafterbreak}
            {\kern\fontdimen2\font}%
        }%

        % Allow breaks at special characters using \PYG... macros.
        \Wrappedbreaksatspecials
        % Breaks at punctuation characters . , ; ? ! and / need catcode=\active
        \OriginalVerbatim[#1,codes*=\Wrappedbreaksatpunct]%
    }
    \makeatother

    % Exact colors from NB
    ((*- block style_colors *))
    \definecolor{incolor}{HTML}{303F9F}
    \definecolor{outcolor}{HTML}{D84315}
    \definecolor{cellborder}{HTML}{CFCFCF}
    \definecolor{cellbackground}{HTML}{F7F7F7}
    ((*- endblock style_colors *))

    % prompt
    \makeatletter
    \newcommand{\boxspacing}{\kern\kvtcb@left@rule\kern\kvtcb@boxsep}
    \makeatother
    ((*- block style_prompt *))
    \newcommand{\prompt}[4]{
        {\ttfamily\llap{{\color{#2}\hspace{3pt}#4}}}
    }
    ((* endblock style_prompt *))

((*- endblock definitions -*))

%===============================================================================
% Input
%===============================================================================

((* block input scoped *))
    ((( draw_cell(cell.source | highlight_code(strip_verbatim=True), cell, 'In', 'incolor', '\\boxspacing') )))
((* endblock input *))


%===============================================================================
% Output
%===============================================================================

((*- if charlim is not defined -*))
    ((* set charlim = 80 *))
((*- endif -*))

((* block execute_result scoped *))
    ((*- for type in output.data | filter_data_type -*))
        ((*- if type in ['text/plain']*))
            ((( draw_cell(output.data['text/plain'] | wrap_text(charlim) | escape_latex | ansi2latex, cell, 'Out', 'outcolor', '\\boxspacing') )))
        ((* else -*))
            ((( " " )))
            ((( draw_prompt(cell, 'Out', 'outcolor','') )))((( super() )))
        ((*- endif -*))
    ((*- endfor -*))
((* endblock execute_result *))

((* block stream *))
    \begin{Verbatim}[commandchars=\\\{\}]
((( output.text | wrap_text(charlim) | escape_latex | strip_trailing_newline | ansi2latex )))
    \end{Verbatim}
((* endblock stream *))

%==============================================================================
% Support Macros
%==============================================================================

% Name: draw_cell
% Purpose: Renders an output/input prompt
((*- if draw_cell is not defined -*)) % Required to allow overriding.
((* macro draw_cell(text, cell, prompt, prompt_color, extra_space) -*))
((*- if prompt == 'In' -*))
((*- set style = "breakable, size=fbox, boxrule=1pt, pad at break*=1mm,colback=cellbackground, colframe=cellborder"-*))
((*- else -*))((*- set style = "breakable, size=fbox, boxrule=.5pt, pad at break*=1mm, opacityfill=0"-*))((*-  endif -*))

\begin{tcolorbox}[((( style )))]
(((- draw_prompt(cell, prompt, prompt_color, extra_space) )))
\begin{Verbatim}[commandchars=\\\{\}]
((( text )))
\end{Verbatim}
\end{tcolorbox}
((*- endmacro *))
((*- endif -*))

% Name: draw_prompt
% Purpose: Renders an output/input prompt
((* macro draw_prompt(cell, prompt, prompt_color, extra_space) -*))
    ((*- if cell.execution_count is defined -*))
    ((*- set execution_count = "" ~ (cell.execution_count | replace(None, " ")) -*))
    ((*- else -*))((*- set execution_count = " " -*))((*- endif *))

    ((*- if (resources.global_content_filter.include_output_prompt and prompt == 'Out')
         or (resources.global_content_filter.include_input_prompt  and prompt == 'In' ) *))
\prompt{(((prompt)))}{(((prompt_color)))}{(((execution_count)))}{(((extra_space)))}
    ((*- endif -*))
((*- endmacro *))
```

Furthermore, if you want to hide code:

```latex
((=- IPython input/output style -=))
((*- extends 'base.tex.j2' -*))

((*- block packages -*))
	\usepackage{xeCJK}
	\setCJKmainfont{SimSun}
    \usepackage[breakable]{tcolorbox}
    \usepackage{parskip} % Stop auto-indenting (to mimic markdown behaviour)
    ((( super() )))
((*- endblock packages -*))

((*- block definitions -*))
    ((( super() )))
% Pygments definitions
    (((- resources.latex.pygments_definitions )))

    % For linebreaks inside Verbatim environment from package fancyvrb.
    \makeatletter
        \newbox\Wrappedcontinuationbox
        \newbox\Wrappedvisiblespacebox
        \newcommand*\Wrappedvisiblespace {\textcolor{red}{\textvisiblespace}}
        \newcommand*\Wrappedcontinuationsymbol {\textcolor{red}{\llap{\tiny$\m@th\hookrightarrow$}}}
        \newcommand*\Wrappedcontinuationindent {3ex }
        \newcommand*\Wrappedafterbreak {\kern\Wrappedcontinuationindent\copy\Wrappedcontinuationbox}
        % Take advantage of the already applied Pygments mark-up to insert
        % potential linebreaks for TeX processing.
        %        {, <, #, %, $, ' and ": go to next line.
        %        _, }, ^, &, >, - and ~: stay at end of broken line.
        % Use of \textquotesingle for straight quote.
        \newcommand*\Wrappedbreaksatspecials {%
            \def\PYGZus{\discretionary{\char`\_}{\Wrappedafterbreak}{\char`\_}}%
            \def\PYGZob{\discretionary{}{\Wrappedafterbreak\char`\{}{\char`\{}}%
            \def\PYGZcb{\discretionary{\char`\}}{\Wrappedafterbreak}{\char`\}}}%
            \def\PYGZca{\discretionary{\char`\^}{\Wrappedafterbreak}{\char`\^}}%
            \def\PYGZam{\discretionary{\char`\&}{\Wrappedafterbreak}{\char`\&}}%
            \def\PYGZlt{\discretionary{}{\Wrappedafterbreak\char`\<}{\char`\<}}%
            \def\PYGZgt{\discretionary{\char`\>}{\Wrappedafterbreak}{\char`\>}}%
            \def\PYGZsh{\discretionary{}{\Wrappedafterbreak\char`\#}{\char`\#}}%
            \def\PYGZpc{\discretionary{}{\Wrappedafterbreak\char`\%}{\char`\%}}%
            \def\PYGZdl{\discretionary{}{\Wrappedafterbreak\char`\$}{\char`\$}}%
            \def\PYGZhy{\discretionary{\char`\-}{\Wrappedafterbreak}{\char`\-}}%
            \def\PYGZsq{\discretionary{}{\Wrappedafterbreak\textquotesingle}{\textquotesingle}}%
            \def\PYGZdq{\discretionary{}{\Wrappedafterbreak\char`\"}{\char`\"}}%
            \def\PYGZti{\discretionary{\char`\~}{\Wrappedafterbreak}{\char`\~}}%
        }
        % Some characters . , ; ? ! / are not pygmentized.
        % This macro makes them "active" and they will insert potential linebreaks
        \newcommand*\Wrappedbreaksatpunct {%
            \lccode`\~`\.\lowercase{\def~}{\discretionary{\hbox{\char`\.}}{\Wrappedafterbreak}{\hbox{\char`\.}}}%
            \lccode`\~`\,\lowercase{\def~}{\discretionary{\hbox{\char`\,}}{\Wrappedafterbreak}{\hbox{\char`\,}}}%
            \lccode`\~`\;\lowercase{\def~}{\discretionary{\hbox{\char`\;}}{\Wrappedafterbreak}{\hbox{\char`\;}}}%
            \lccode`\~`\:\lowercase{\def~}{\discretionary{\hbox{\char`\:}}{\Wrappedafterbreak}{\hbox{\char`\:}}}%
            \lccode`\~`\?\lowercase{\def~}{\discretionary{\hbox{\char`\?}}{\Wrappedafterbreak}{\hbox{\char`\?}}}%
            \lccode`\~`\!\lowercase{\def~}{\discretionary{\hbox{\char`\!}}{\Wrappedafterbreak}{\hbox{\char`\!}}}%
            \lccode`\~`\/\lowercase{\def~}{\discretionary{\hbox{\char`\/}}{\Wrappedafterbreak}{\hbox{\char`\/}}}%
            \catcode`\.\active
            \catcode`\,\active
            \catcode`\;\active
            \catcode`\:\active
            \catcode`\?\active
            \catcode`\!\active
            \catcode`\/\active
            \lccode`\~`\~
        }
    \makeatother

    \let\OriginalVerbatim=\Verbatim
    \makeatletter
    \renewcommand{\Verbatim}[1][1]{%
        %\parskip\z@skip
        \sbox\Wrappedcontinuationbox {\Wrappedcontinuationsymbol}%
        \sbox\Wrappedvisiblespacebox {\FV@SetupFont\Wrappedvisiblespace}%
        \def\FancyVerbFormatLine ##1{\hsize\linewidth
            \vtop{\raggedright\hyphenpenalty\z@\exhyphenpenalty\z@
                \doublehyphendemerits\z@\finalhyphendemerits\z@
                \strut ##1\strut}%
        }%
        % If the linebreak is at a space, the latter will be displayed as visible
        % space at end of first line, and a continuation symbol starts next line.
        % Stretch/shrink are however usually zero for typewriter font.
        \def\FV@Space {%
            \nobreak\hskip\z@ plus\fontdimen3\font minus\fontdimen4\font
            \discretionary{\copy\Wrappedvisiblespacebox}{\Wrappedafterbreak}
            {\kern\fontdimen2\font}%
        }%

        % Allow breaks at special characters using \PYG... macros.
        \Wrappedbreaksatspecials
        % Breaks at punctuation characters . , ; ? ! and / need catcode=\active
        \OriginalVerbatim[#1,codes*=\Wrappedbreaksatpunct]%
    }
    \makeatother

    % Exact colors from NB
    ((*- block style_colors *))
    \definecolor{incolor}{HTML}{303F9F}
    \definecolor{outcolor}{HTML}{D84315}
    \definecolor{cellborder}{HTML}{CFCFCF}
    \definecolor{cellbackground}{HTML}{F7F7F7}
    ((*- endblock style_colors *))

    % prompt
    \makeatletter
    \newcommand{\boxspacing}{\kern\kvtcb@left@rule\kern\kvtcb@boxsep}
    \makeatother
    ((*- block style_prompt *))
    \newcommand{\prompt}[4]{
        {\ttfamily\llap{{\color{#2}\hspace{3pt}#4}}}
    }
    ((* endblock style_prompt *))

((*- endblock definitions -*))

%===============================================================================
% Input
%===============================================================================

((* block input scoped *))
    % input hidden
((* endblock input *))



%===============================================================================
% Output
%===============================================================================

((*- if charlim is not defined -*))
    ((* set charlim = 80 *))
((*- endif -*))

((* block execute_result scoped *))
    ((*- for type in output.data | filter_data_type -*))
        ((*- if type in ['text/plain']*))
            ((( draw_cell(output.data['text/plain'] | wrap_text(charlim) | escape_latex | ansi2latex, cell, 'Out', 'outcolor', '\\boxspacing') )))
        ((* else -*))
            ((( " " )))
            ((( draw_prompt(cell, 'Out', 'outcolor','') )))((( super() )))
        ((*- endif -*))
    ((*- endfor -*))
((* endblock execute_result *))

((* block stream *))
    \begin{Verbatim}[commandchars=\\\{\}]
((( output.text | wrap_text(charlim) | escape_latex | strip_trailing_newline | ansi2latex )))
    \end{Verbatim}
((* endblock stream *))

%==============================================================================
% Support Macros
%==============================================================================

% Name: draw_cell
% Purpose: Renders an output/input prompt
((*- if draw_cell is not defined -*)) % Required to allow overriding.
((* macro draw_cell(text, cell, prompt, prompt_color, extra_space) -*))
((*- if prompt == 'In' -*))
((*- set style = "breakable, size=fbox, boxrule=1pt, pad at break*=1mm,colback=cellbackground, colframe=cellborder"-*))
((*- else -*))((*- set style = "breakable, size=fbox, boxrule=.5pt, pad at break*=1mm, opacityfill=0"-*))((*-  endif -*))

\begin{tcolorbox}[((( style )))]
(((- draw_prompt(cell, prompt, prompt_color, extra_space) )))
\begin{Verbatim}[commandchars=\\\{\}]
((( text )))
\end{Verbatim}
\end{tcolorbox}
((*- endmacro *))
((*- endif -*))

% Name: draw_prompt
% Purpose: Renders an output/input prompt
((* macro draw_prompt(cell, prompt, prompt_color, extra_space) -*))
    ((*- if cell.execution_count is defined -*))
    ((*- set execution_count = "" ~ (cell.execution_count | replace(None, " ")) -*))
    ((*- else -*))((*- set execution_count = " " -*))((*- endif *))

    ((*- if (resources.global_content_filter.include_output_prompt and prompt == 'Out')
         or (resources.global_content_filter.include_input_prompt  and prompt == 'In' ) *))
\prompt{(((prompt)))}{(((prompt_color)))}{(((execution_count)))}{(((extra_space)))}
    ((*- endif -*))
((*- endmacro *))
```
