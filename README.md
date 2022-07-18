![](https://i.imgur.com/Z4vr6v0.gif)

## [Try Iridium Here](https://wish-lin.github.io/Iridium/)

## What is Iridium?
**Iridium** is an open-source, Javascript-based, fully customizable math plotter & animator that can satisfy most precalculus and basic calculus plotting needs. 

Iridium is conceived, written and maintained by 林韋旭(Wei-Hsu Lin) starting from April 2022.

## The purpose of this project

After the COVID-19 pandemic, online courses, along with the convenience it brings to both students and teachers alike, are getting more and more attention around the world. Under such circumstances, it is forseeable that the demand in online math courses will rise as well. However, most softwares that can produce high quality math images(ex. MATLAB) are way too complicated and an absolute overkill for most pre-college courses. Thus, I believe creating a free tool that anyone can obtain, learn and use to create textbook level math content has never been this important. 

## Functions and Features (as of v1.5.0) 
 
### Functions

**Iridium**'s functions covers almost all precalclus geometry/algebra plotting needs that I could think of, and almost all of the functions are **completely customizable**.

For  more in-depth information, please check out [scripting commands](https://hackmd.io/@Wish-Lin/BkkNjgKr5).

* Basic geometry: 
    * Lines
    * Dotted Lines
    * Circles
    * Rectangles
    * Triangles
    * Arcs
    * Regular Polygons
![](https://i.imgur.com/EtCYp61.png)
![](https://i.imgur.com/SMFe9fI.png)

* Basic algebra: 
    * Basic function plotting ( $y = f(x)$ )
    * Parametric function plotting ( $(x,y) = (f(t),g(t))$ )
    * Polar function plotting ( $r = f(\theta)$ )

![](https://i.imgur.com/zXhEFpU.png)

     


* Calculus:
    * Marking out bounded areas of basic and polar functions.
![](https://i.imgur.com/tlpRRyv.png)
    * Numerically plot first order ODEs using Euler's method. 
![](https://i.imgur.com/FjtCIFx.png)







### Features

**Iridium** has many tools and features that makes it almost just as powerful, albeit much easier to use for the average user than its professional counterparts in the field of basic math plotting:

* Basic Features:
    * **I/O** 
        * Upload scripts from your computer
        * Save finished scripts
        * Save the finished image or GIF animation
    * **Fully customizable points and labels** that can be used to mark intersections of functions, show formulas, etc.
    * **Fully customizable transparency** of everything on the canvas.
    * **Fully customizable coordinate grid**, including self-defined origin position, $\hat{x}$ and $\hat{y}$.
    * **Support importing external images** into the canvas, which enables $\LaTeX$ equations generated on an external website as well as a custom background.
    * **Cursor Position Tool** that makes finding numerical solutions to equations quick and easy.
* Animation:
    * By using the GIF Encoder [jsgif](https://github.com/antimatter15/jsgif), **Iridium** can produce high quality GIF animations.

Polar Function:
    ![](https://i.imgur.com/Z4vr6v0.gif)