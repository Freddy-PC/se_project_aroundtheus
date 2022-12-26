// Section class is 'renderCard' as an object
class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items; // Array of data
    this._renderer = renderer; // Function creates and renders data
    this._container = document.querySelector(containerSelector); // Class selector
  }
  renderItems() {
    this._renderedItems.forEach(this._renderer);
    // Renders each element on a page
  }
  addItem(element) {
    this._container.prepend(element); // Prepend or append??
    // Takes a DOM element (via Selector) and adds it to the container
  }
}

export default Section;
