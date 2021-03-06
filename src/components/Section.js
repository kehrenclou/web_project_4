//Section class renders the markup returned by card class
//and inserts it into the DOM

/* ---------------------------------- class --------------------------------- */
export default class Section {
  constructor({ items, renderer }, { containerSelector }) {
    this._initialArray = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  //render items using renderer called in index.js new Section
  //call renderer and pass item to it
  renderItems() {
    this._initialArray.forEach(this._renderer);
  }
  // renderItems(item) {
  //   this._initialArray.forEach(this._renderer);
  // }

  addItem(element) {
    //take items and render it into this._container
    this._container.prepend(element);
  }
}
