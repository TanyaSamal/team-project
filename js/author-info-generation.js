class AuthorInfo {
  static draw() {
    const contentEl = document.querySelector('#container');
    contentEl.insertAdjacentHTML('beforeend', templateInfo);
    contentEl.insertAdjacentHTML('beforeend', templateTimeline);
    contentEl.insertAdjacentHTML('beforeend', templateWorks);
    contentEl.insertAdjacentHTML('beforeend', templateGallery);
    contentEl.insertAdjacentHTML('beforeend', templateVideo);
    contentEl.insertAdjacentHTML('beforeend', templateMap);
  }

  static empty() {
    $('#author-info').remove();
  }
}