import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Logs");
  }

  async getHtml() {
    return `
    <h1>This is Logs</h1>


    `;
  }
}

{
  /* <p>
  <a href="/users" data-link>
    View Users
  </a>
</p>; */
}
