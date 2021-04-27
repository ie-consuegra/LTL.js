// eslint-disable-next-line import/extensions
import T from './LTL.js';

const root = T().setAsRoot('my-app');

// Title component
const brandLogo = T('a', { class: 'brand-logo' }, 'My app');
brandLogo.isUnique = true;

// Nav menu
const navMenuUl = T('ul', { class: ['right', 'hide-on-med-and-down'] });

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

// Common components
const container = T('div', { class: 'container' });
// const section = T('div', 'section');
const row = T('div', { class: 'row' });
const rowVAlign = T('div', { class: ['row', 'valign-wrapper'] });
const half = T('div', { class: ['col', 's12', 'm6'] });
const blueCard = T('div', { class: ['card-panel', 'blue', 'lighten-5'] });
const redCard = T('div', { class: ['card-panel', 'red', 'lighten-5'] });
const cardMessage = T('span');
const button = T('a', { class: ['waves-effect', 'waves-light', 'btn', 'red'] }, 'Change color');
button.isUnique = true;
button.onClick(() => {
  button.removeAttributes({ class: 'red' });
  button.addAttributes({ class: 'deep-purple' });
});

const contentWrapper = T('div', { class: 'section', id: 'content-wrapper' });
contentWrapper.isUnique = true;
const contact = T('div', { class: 'content', id: 'contact' });
contact.isUnique = true;
const marketplace = T('div', { class: 'content', id: 'marketplace-content' });
marketplace.isUnique = true;

// Test interactivity of the menu
navMenuItemsArr.forEach((item) => {
  const navMenuItem = T('li', null, `<a href="#">${item.text}</a>`);
  navMenuItem.onClick(() => {
    brandLogo.html(item.text);
    switch (item.text) {
      case 'Marketplace':
        contentWrapper._().L(marketplace);
        break;
      case 'Contact':
        contentWrapper._().L(contact);
        break;
      default:
        break;
    }
  });

  navMenuUl
    .L(navMenuItem);
});

// marketplace component tree
marketplace._()
  .L(row
    .L(half
      .L(redCard.L(rowVAlign.L(cardMessage.html('Red card Marketplace')))))
    .L(half
      .L(blueCard.L(rowVAlign.L(cardMessage.html('Blue card Marketplace'))))))
  .L(row
    .L(half.L(blueCard))
    .L(half.L(redCard.L(button))));

// contact component tree
contact._()
  .L(row
    .L(half
      .L(redCard.L(rowVAlign.L(cardMessage.html('Red card Contact')))))
    .L(half
      .L(blueCard.L(rowVAlign.L(cardMessage.html('Blue card Contact'))))))
  .L(row
    .L(half.L(blueCard))
    .L(half.L(redCard)));

root
  .L(T('header')
    .L(T('nav')
      .L(T('div', { class: 'nav-wrapper' })
        .L(brandLogo)
        .L(navMenuUl))))
  .L(T('main')
    .L(container
      .L(contentWrapper)))
  .L(T('footer', { class: 'page-footer' })
    .L(container
      .L(row
        .L(half.L(T('p', { class: 'white-text' }, 'footer'))))));
