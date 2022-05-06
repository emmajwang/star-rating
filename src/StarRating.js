class StarRating extends HTMLElement {
  constructor() {
    super();
    this.#render();
  }
  #render() {
    console.log("hi");
    this.innnerHTML = "<p>hi</p>";
  }
}

customElements.define("star-rating", StarRating);
