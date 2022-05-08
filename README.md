# About

<br>

> <center>“I would rather have questions that can't be answered than answers that can't be questioned.” -- Richard P. Feynman

<br>
</center>

 ![](https://i.imgur.com/0fZ01NB.png)

## What is Iridium?
**Iridium** is an open-source, Javascript-based math plotter & animator that can satisfy most precalculus and some basic calculus plotting needs. 

Iridium is conceived, developed and maintained by 林韋旭(Wish Lin) starting from April 2022 as a free and easy to use alternative to professional softwares such as **MATLAB** (In the field of plotting only, of course).

## The purpose of this project

After the COVID-19 pandemic, online courses, along with the convenience it brings to both students and teachers alike, are getting more and more attention around the world. Under such circumstances, it is forseeable that the demand in online math courses will rise as well, thus, the existence of a tool that anyone can get their hands on, understand, and produce high quality math images & animations for educational purposes has never be this important.

## Functions and Features (as of v0.9.12)

### Functions

**Iridium**'s functions covers almost all precalclus geometry/algebra plotting needs that I could think of, and almost all of them are **completely customizable**.

* Basic geometry: 
    * Lines
    * Dotted Lines
    * Circles
    * Rectangles
    * Triangles
    * Arcs
![](https://i.imgur.com/EtCYp61.png)
![](https://i.imgur.com/SMFe9fI.png)

* Basic algebra: 
    * Basic function plotting ( $y = f(x)$ )
    * Parametric function plotting ( $(x,y) = (f(t),g(t))$ )
    * Polar function plotting ( $r = f(\theta)$ )
![](https://i.imgur.com/zXhEFpU.png)

* Calculus:
    * Numerical plot of first order homogenous ODEs using Euler's method. 
![](https://i.imgur.com/FjtCIFx.png)







### Features

**Iridium** has many tools and features that makes it just as powerful, while being mcuh easier to use than its professional counterparts in the field of basic math plotting:

* Basic Features:
    * I/O 
        * Upload scripts from your computer
        * Save finished scripts
        * Save the finished image or GIF animation
    * Fully customizable points and labels that can be used to mark intersections of functions, show formulas, etc.
    * Fully customizable transparency of **everything** on the canvas.
    * Support importing external images into the canvas, which enables $\LaTeX$ equations generated on an external website as well as a custom background.
    * Cursor Position Tool that makes finding numerical solutions to functions very quick and easy.
* Animation:
    * By using the GIF Encoder [jsgif](https://github.com/antimatter15/jsgif) along with some very basic Javascript scripting, **Iridium** can produce high quality GIF animations. Note that this feature is still in beta-test as of v0.9.12.
    ![](https://i.imgur.com/Z4vr6v0.gif)