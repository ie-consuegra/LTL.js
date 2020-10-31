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
      // L appendChilds an element to the last element in the elements array

      // Check first if there is no element yet, to create the first one
      if (!this.elements[this.elemIndex]) {
        this.newElement();
      }

      // Request an element from component and append it
      if (typeof component === 'object') {
        this.elements[this.elemIndex].appendChild(component.getElement());
      }
      component.elemIndexForward();
      return this;
    }

    html(htmlString, overwrite = true) {
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

      // Push it to elements array
      // Save the current element index
      this.elemIndex = this.elements.push(element) - 1;

      return element;
    }

    getElement() {
      // Return the last element of the array if exists, else return a new one
      let element;
      if (!this.elements[this.elemIndex]) {
        element = this.newElement();
      } else {
        element = this.elements[this.elemIndex];
      }

      return element;
    }

    elemIndexForward() {
      this.elemIndex += 1;
    }
  }

  const component = new Component(tag, classList, ID);
  return component;
}

export default T;
