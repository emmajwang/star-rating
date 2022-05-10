class StarRating extends HTMLElement {
  constructor() {
    super();
    this.#render();
  }
  #rating = 3;
  #outof = null;
  #emoji = null;

  get rating() {
    return this.#rating;
  }
  set rating(r) {
    this.#rating = parseInt(r);
    this.setAttribute("rating", parseInt(r));
  }

  get outof() {
    return this.#outof;
  }
  set outof(o) {
    this.#outof = parseInt(o);
    this.setAttribute("outof", parseInt(o));
  }

  get emoji() {
    return this.#emoji;
  }
  set emoji(e) {
    this.#emoji = e;
    this.setAttribute("emoji", e);
  }

  static get observedAttributes() {
    return ["rating", "outof", "emoji"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "rating") {
      this.#rating = parseInt(newValue);
    } else if (name === "outof") {
      this.#outof = parseInt(newValue);
    } else if (name === "emoji") {
      this.#emoji = newValue;
    }
    this.#render();
  }

  connectedCallback() {
    this.#render();
  }

  #render() {
    if (this.#emoji) {
      this.innerHTML = this.#emoji.repeat(this.#rating);
    } else {
      const shadedStar = "★";
      if (this.#outof) {
        const emptyStar = "☆";
        if (this.#rating <= this.#outof) {
          this.innerHTML =
            shadedStar.repeat(this.#rating) +
            emptyStar.repeat(this.#outof - this.#rating);
        } else {
          this.innerHTML = shadedStar.repeat(this.#outof);
          this.#rating = this.#outof;
          this.setAttribute("rating", this.#outof);
        }
      } else {
        this.innerHTML = shadedStar.repeat(this.#rating);
      }
    }
  }
}

customElements.define("star-rating", StarRating);
