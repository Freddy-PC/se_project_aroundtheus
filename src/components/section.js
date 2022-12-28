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
  // Adds initial cards in order
  addItem(element) {
    this._container.append(element);
    // Takes a DOM element (via Selector) and adds it to the container
  }
  // Reverse cards
  prependItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
