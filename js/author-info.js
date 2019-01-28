function generatePage(numberOfAuthor, language) {
  fetch('../data/data.json')
    .then(response => response.json())
    .then((resultJson) => {
      generateInformation(resultJson, numberOfAuthor, language);
    });
}

window.onload = function() {
  if (localStorage.getItem('numberOfAuthor') !== null) {
    const numberOfAuthor = localStorage.getItem('numberOfAuthor');
    generatePage(+numberOfAuthor, "ru");
  } else {
    generatePage(0, "ru");
  }
}

function generateInformation(resultJson, numberOfAuthor, language){
  AuthorInfo.draw();
  const authorImage = document.querySelector('.author-img');
  const img = document.createElement('img');
  img.src = resultJson[numberOfAuthor].img;
  img.classList.add('img-fluid');
  img.classList.add('rounded-circle');
  authorImage.appendChild(img);

  const authorName = document.querySelector('.author-name');
  const name = document.createElement('h3');
  name.innerHTML = resultJson[numberOfAuthor].name[language];
  authorName.appendChild(name);

  const authorTimelineInfo = document.querySelector('.main-timeline');
  let addInfo = ``;
  resultJson[numberOfAuthor].bio.forEach(element => {
    addInfo += `<div class="timeline">
    <div class="timeline-icon"></div>
      <div class="timeline-content">
        <span class="date">${element.year}</span>
        <h5 class="title">${element.placeRu}</h5>
        <p class="description">${element.descriptionRu}</p>
    </div>
  </div>
  </div>`;
  });
  authorTimelineInfo.innerHTML = addInfo;

  const authorWorksInfo = document.querySelector('.table');
  addInfo = authorWorksInfo.innerHTML;
  resultJson[numberOfAuthor].biblio.forEach(element => {
    addInfo += `
    <div class="row-table">
      <div class="cell" data-title="Название">${element.workRu}</div>
      <div class="cell" data-title="Год выпуска">${element.year}</div>
    </div>`;
  });
  authorWorksInfo.innerHTML = addInfo;
}