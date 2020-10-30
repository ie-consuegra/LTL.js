// eslint-disable-next-line import/extensions
import T from './LTL.js';

const root = T().setAsRoot('my-app');
const tree = T('div', 'main-wrapper');

// Title component
const brandLogo = T('a', 'brand-logo');
brandLogo.html('My App');
console.log(brandLogo.elements);
// Nav menu
const navMenuUl = T('ul', 'right');
/*
const navMenuItemsArr = [
  {
    text: 'Marketplace',
    href: 'marketplace.html',
  },
  {
    text: 'Contact',
    href: 'contact.html',
  },
  {
    text: 'About us',
    href: 'about.html',
  },
];

navMenuItemsArr.forEach((item) => {
  const navMenuItem = T('li');
  navMenuItem.html(`<a href="${item.href}">${item.text}</a>`);

  navMenuUl
    .L(navMenuItem);
}); */

// Common components
const container = T('div', 'container');
const section = T('div', 'section');
const row = T('div', 'row');
const rowVAlign = T('div', ['row', 'valign-wrapper']);
const half = T('div', ['col', 's12', 'm6']);
const card = T('div', ['card-panel', 'grey', 'lighten-5']);

const cardMessage = T('span');

tree
  .L(T('header')
    .L(T('nav')
      .L(T('div', 'nav-wrapper')
        .L(brandLogo)
        .L(navMenuUl))))
  .L(container
    .L(section
      .L(row
        .L(half
          .L(card
            .L(rowVAlign
              .L(cardMessage.html('LTL.js is experimental do not take it so serious yet')))))
        .L(half
          .L(card
            .L(rowVAlign
              .L(cardMessage.html('Hey it works!'))))))));

root.graft(tree);
