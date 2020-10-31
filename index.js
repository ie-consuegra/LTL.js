// eslint-disable-next-line import/extensions
import T from './LTL.js';

const root = T().setAsRoot('my-app');

// Title component
const brandLogo = T('a', 'brand-logo');
brandLogo.html('My App');

// Function to test the menu
function load(content) {
  brandLogo.elements[0].innerHTML = content;
}

// Nav menu
const navMenuUl = T('ul', ['right', 'hide-on-med-and-down']);

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
  navMenuItem.html(`<a href="#">${item.text}</a>`);
  navMenuUl
    .L(navMenuItem);

  navMenuItem.elements[0].addEventListener('click', () => {
    load(item.text);
  });
});

// Common components
const container = T('div', 'container');
const section = T('div', 'section');
const row = T('div', 'row');
const rowVAlign = T('div', ['row', 'valign-wrapper']);
const half = T('div', ['col', 's12', 'm6']);
const blueCard = T('div', ['card-panel', 'blue', 'lighten-5']);
const redCard = T('div', ['card-panel', 'red', 'lighten-5']);
const cardMessage = T('span');

root
  .L(T('header')
    .L(T('nav')
      .L(T('div', 'nav-wrapper')
        .L(brandLogo)
        .L(navMenuUl))))
  .L(T('main')
    .L(container
      .L(section
        .L(row
          .L(half
            .L(redCard.L(rowVAlign.L(cardMessage.html('Red card')))))
          .L(half
            .L(blueCard.L(rowVAlign.L(cardMessage.html('Blue card')))))))))
  .L(T('footer', 'page-footer')
    .L(container
      .L(row
        .L(half.L(T('p', 'white-text').html('Footer'))))));
