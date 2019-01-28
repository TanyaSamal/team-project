class AuthorInfo {
  static draw() {
    const contentEl = document.querySelector('#container');
    contentEl.innerHTML = '';
    contentEl.insertAdjacentHTML('beforeend', templateInfo);
    contentEl.insertAdjacentHTML('beforeend', templateTimeline);
    contentEl.insertAdjacentHTML('beforeend', templateWorks);
  }

  static empty() {
    $('#author-info').remove();
  }
}