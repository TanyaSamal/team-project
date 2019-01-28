/* eslint-disable no-unused-vars,no-undef */
class AuthorInfo {
  static draw() {
    const contentEl = document.querySelector('#container');
    contentEl.insertAdjacentHTML('beforeend', templateInfo);
    contentEl.insertAdjacentHTML('beforeend', templateTimeline);
    contentEl.insertAdjacentHTML('beforeend', templateWorks);
  }
}
