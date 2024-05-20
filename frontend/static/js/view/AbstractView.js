export default class {
  constructor(params) {
    this.params = params;
    console.log("AbstractView:", this.params);
  }

  // 페이지 타이틀
  setTitle(title) {
    document.title = title;
  }

  // 뿌려질 Html
  async getHtml() {
    return "";
  }
}
