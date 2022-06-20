/* ---------------------------------- class --------------------------------- */
//Section class renders the markup returned by card class

// import Card from "./Card";

//and inserts it into the DOM
export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._initialArray = items;
    this._renderer = renderer;

    this._container = document.querySelector(classSelector);
  }

  //render items using renderer called in index.js new Section
  //call renderer and pass item to it
  renderItems(item) {
    this._initialArray.forEach((item) => {
      //use this._renderer  to create elements for rendering
      this._renderer(item);
    });
  }

  addItem(element) {
    //take items and render it into this._container
    this._container.prepend(element);
  }
}
