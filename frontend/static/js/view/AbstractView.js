export default class {
  constructor(params) {
    this.params = params;
  }

  // 페이지 타이틀
  setTitle(title) {
    document.title = title;
    console.log("title:", title);
  }

  // 뿌려질 Html
  async getHtml() {
    return "";
  }
}
