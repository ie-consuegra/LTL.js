function T(tag, attributes, innerHTML) {
  class Component {
    /** Set the basic properties of the Component
     *
     * @param {String} tagName HTML tag of the element
     * @param {Object} attrs Set of attributes of the HTML element. i.e. class, id, etc.
     * @param {String} html Define innerHTML property of the HTML element
     */
    constructor(tagName, attrs, html) {
      this.template = {}; // Template of the element
      this.elements = []; // Array of elements created with the template
      this.elemIndex = 0; // The index of the first element to be created
      this.isUnique = false; // If the template only will store one node is unique
      // else is false (default) create a new element each time is required

      // Set the basic properties of the component
      this.template.html = '';
      if (tagName) {
        this.template.tagName = tagName;
      }

      if (attrs) {
        this.template.attrs = { ...attrs };
      }

      if (innerHTML) {
        this.template.html = html;
      }

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
      if (!component.isUnique) {
        component.elemIndexForward();
      }
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
      this.setAttributes(element);

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

    _() {
      // Deattach any child
      // Use only if the element is unique
      if (this.isUnique) {
        if (!this.elements[this.elemIndex]) {
          this.newElement();
        }
        this.elements[0].innerHTML = '';
      } else {
        throw new Error('_() Method to be used only in unique components');
      }
      return this;
    }

    setAttributes(element) {
      if (this.template.attrs) {
        const attrsArr = Object.keys(this.template.attrs);
        attrsArr.forEach((name) => {
          const value = this.template.attrs[name];
          if (typeof value === 'string') {
            element.setAttribute(name, value);
          } else if (Array.isArray(value)) {
            const severalAttrsValues = value.join(' ');
            element.setAttribute(name, severalAttrsValues);
          }
        });
      }
    }
  }

  const component = new Component(tag, attributes, innerHTML);
  return component;
}

export default T;
