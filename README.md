# LTL.js
A tiny experimental library to create SPAs.

## Concept
Create reusable or non-reusable components that can be used in a visual representation of the DOM tree afterwards.

For example:

Creation of a very basic component:

```
const header = T('header');
```

Creation of the tree:

```
// Code to import or create the components: header, nav, navBar, main, footer...

const root = T().setAsRoot('body');

root
  .L(header
    .L(nav
      .L(navBar))
  .L(main)
  .L(footer);
```

## How to use it
If you are writing your JavaScript in diferent modules, import the T function from the LTL.js file wherever you have downloaded it.

```
import T from './LTL.js';
```

LTL.js is still in development so, many features can change with time.

### The T function
Anytime you want to create a new "component" you use the T() function. This function returns and object able to add elements to the DOM anytime is passed as an argument to the L() method.

The T function gets three arguments: the HTML tag (String), attributes (Object, where keys are the names of the attributes and values that can be a string or an array), the inner HTML of the element.

In this example, we create a "component" of a button with a "red" class, a "send-button" Id, and the inner HTML will be 'Send'.
```
const sendBtn = T('button', { class: 'red', id: 'send-button' }, 'Send')
```
Whenever you want to set or change the default text of this button, do it this way:
```
sendBtn.html('Submit')
```
### The L Method
The L method appends a component, which is passed as an argument. The use of a capital L has no special meaning but just help to represent a tree visually.

```
navBar
  .L(logo)
  .L(menu);
```
In case of creating a component directly in the tree, the T function accomplishes a similar visual effect.
```
navBar
  .L(T('a', { class: 'logo' })
    .L(logoImg))
  .L(menu);
```
This way of creating anonymous components "on the fly" can be useful when it is a simple and non-reusable component.

## Why LTL.js
The purpose of LTL.js is to provide a way to create a SPA while creating a visual representation of the DOM tree using JavaScript.

### Disclosure
LTL.js is merely experimental and it's a way I can improve my coding skills in JS while setting up a tiny library I could use in my personal projects in the future.

It is so obvious but I have to warn about not using this library in production.

Thanks for reading up to this point.
