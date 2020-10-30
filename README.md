# LTL.js
A tiny experimental library to create dynamic webapps.

## Concept
Create reusable components that can be used in a visual representation of the DOM tree afterwards.

For example:

Creation of a very basic component:

```
const header = T('header');
```

Creation of the tree:

```
tree
  .L(header
    .L(nav
      .L(navBar))
  .L(main)
  .L(footer);
```

Appending the tree to the root (now it is visible to the user):

```
root.graft(tree)
```

## How to use it
LTL.js is still in development so, some features can change with time.

### The T function
The T function returns an object with the characteristics of any element to be created with it.
"T" comes from Template. These object also stores all the elements created by itself.


The T function can get three parameters, the tagName, the class (string) or classes (array of strings) and an id.
In this example, we create a template of a button with a "red" class, and a "send" Id
```
const sendBtn = T('button', 'red', 'send')
```
To set the default text this button will have, we set its innerHtml this way:
```
sendBtn.html('send')
```

To set other attributes, we can modify the "attrs" property:
(This feature is not ready yet)

```
sendBtn.attrs = {
  type: 'submit'
};
```

### The L Method
The L method appends a child. The use of this capital letter is to create a visual representation of a tree, it is not based in any specific word.

```
navBar
  .L(logo)
  .L(menu);
```
In case of creating a component directly in the tree, the T function accomplish a similar visual effect.
```
navBar
  .L(T('a', 'logo')
    .L(logoImg))
  .L(menu);
```
