import AbstractView from "./AbstractView";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("404 Not found");
  }
  async getHtml() {
    return `
            <h1>404 Not found</h1>
        `;
  }
}
