function T(tag, classList, ID) {
  class Component {
    constructor(tagName, classes, id) {
      this.template = {}; // Template of the element
      this.elements = []; // Array of elements created with the template
      this.elemIndex = 0; // The index of the first element to be created

      if (tagName) {
        this.template.tagName = tagName;
      }

      if (classes) {
        if ((typeof classes) === 'string') {
          this.template.classes = classes;
        } else if ((typeof classes) === 'object') {
          this.template.classes = [...classes];
        }
      }
      if (id) {
        this.template.id = id;
      }
      this.template.attrs = {};
      this.template.html = '';

      this.isRoot = false;
    }

    L(component) {
      // Each time L is called appendChilds an element to
      // the last element in the elements array

      // Create a new element and store it
      this.elements.push(this.newElement());
      if (typeof component === 'object') {
        this.elemIndex = this.elements.length - 1;

        this.elements[this.elemIndex].appendChild(component.getElements()[component.elemIndex]);
      }
      return this;
    }

    html(htmlString, overwrite) {
      if (overwrite) {
        this.template.html = htmlString;
      } else {
        this.template.html += htmlString;
      }
      return this;
    }

    setAsRoot(selector) {
      if (document.querySelector(selector)) {
        this.elements[0] = document.querySelector(selector);
      } else {
        this.elements[0] = document.getElementById(selector);
      }
      this.isRoot = true;
      return this;
    }

    graft(tree) {
      if (this.isRoot) {
        this.elements[0].appendChild(tree.elements[0]);
      }
    }

    newElement() {
      const element = document.createElement(this.template.tagName);
      if (this.template.classes) {
        if ((typeof this.template.classes) === 'string') {
          element.classList.add(this.template.classes);
        } else if ((typeof this.template.classes) === 'object') {
          element.classList.add(...this.template.classes);
        }
      }
      if (this.template.id) {
        element.id = this.template.id;
      }
      element.innerHTML = this.template.html;

      return element;
    }

    getElements() {
      // If there is no element created, create the first one
      if (!this.elements[0]) {
        if (this.template.tagName) {
          this.elemIndex = this.elements.push(this.newElement()) - 1;
        }
      }
      return this.elements;
    }
  }

  const component = new Component(tag, classList, ID);
  return component;
}

export default T;
