function generatePage(numberOfAuthor, language) {
  fetch('https://raw.githubusercontent.com/mbulldozer/team-project/master/data/data.json')
    .then(response => response.json())
    .then((resultJson) => {
      generateInformation(resultJson, numberOfAuthor, language);
    });
}

function ready() {
  if (localStorage.getItem('numberOfAuthor') !== null) {
    const numberOfAuthor = localStorage.getItem('numberOfAuthor');
    if (localStorage.getItem('lang') !== null) {
      const localLang = localStorage.getItem('lang');
      switch (localLang) {
        case 'Русский': generatePage(+numberOfAuthor, 'ru'); break;
        case 'Беларускi': generatePage(+numberOfAuthor, 'by'); break;
        case 'English': generatePage(+numberOfAuthor, 'en'); break;
        default: generatePage(+numberOfAuthor, 'ru'); break;
      }
    } else {
      generatePage(+numberOfAuthor, 'ru');
    }
  } else {
    generatePage(0, 'ru');
  }
}

document.addEventListener('DOMContentLoaded', ready);

function generateInformation(resultJson, numberOfAuthor, language) {
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
  let addInfo = '';
  resultJson[numberOfAuthor].bio.forEach((element) => {
    let place = '';
    let description = '';
    if (localStorage.getItem('lang') !== null) {
      const localLang = localStorage.getItem('lang');
      switch (localLang) {
        case 'Русский': place = element.placeRu; description = element.descriptionRu; break;
        case 'Беларускi': place = element.placeBy; description = element.descriptionBy; break;
        case 'English': place = element.placeEn; description = element.descriptionEn; break;
        default: place = element.placeRu; description = element.descriptionRu; break;
      }
    } else {
      place = element.placeRu;
      description = element.descriptionRu;
    }
    addInfo += `<div class="timeline">
    <div class="timeline-icon"></div>
      <div class="timeline-content">
        <span class="date">${element.year}</span>
        <h5 class="title">${place}</h5>
        <p class="description">${description}</p>
    </div>
  </div>
  </div>`;
  });
  authorTimelineInfo.innerHTML = addInfo;

  const authorWorksInfo = document.querySelector('.table');
  addInfo = authorWorksInfo.innerHTML;
  resultJson[numberOfAuthor].biblio.forEach((element) => {
    let work = '';
    if (localStorage.getItem('lang') !== null) {
      const localLang = localStorage.getItem('lang');
      switch (localLang) {
        case 'Русский': work = element.workRu; break;
        case 'Беларускi': work = element.workBy; break;
        case 'English': work = element.workEn; break;
        default: work = element.workRu; break;
      }
    } else {
      work = element.workRu;
    }
    addInfo += `
    <div class="row-table">
      <div class="cell" data-title="Название">${work}</div>
      <div class="cell" data-title="Год выпуска">${element.year}</div>
    </div>`;
  });
  authorWorksInfo.innerHTML = addInfo;
  initMap(resultJson, numberOfAuthor);
  initVideo(resultJson, numberOfAuthor);
  initGallery(resultJson, numberOfAuthor);
}

function initMap(resultJson, numberOfAuthor) {
  const { dx, dy, text } = resultJson[numberOfAuthor].location;
  const map = L.map('map').setView([dx, dy], 10);
  const mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
  L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: `&copy; ${mapLink} Contributors`,
      maxZoom: 18,
    },
  ).addTo(map);
  const marker = L.marker([dx, dy]).addTo(map);
  marker.bindPopup(`<b>${text}</b>`).openPopup();
}

function initGallery(resultJson, numberOfAuthor) {
  const { img } = resultJson[numberOfAuthor];
  for (let i = 1; i <= 8; i += 1) {
    const src = `${img.slice(0, -4)}/${i}.jpg`;
    $(`.href${i}`).attr('href', src);
    $(`.img${i}`).attr('src', src);
  }
  $(document).ready(() => {
    $('.fancybox').fancybox({
      openEffect: 'none',
      closeEffect: 'none',
    });
    $('.zoom').hover(() => {
      $(this).addClass('transition');
    }, () => {
      $(this).removeClass('transition');
    });
  });
}

function initVideo(resultJson, numberOfAuthor) {
  const { youtube } = resultJson[numberOfAuthor];
  const videoSrc = `https://www.youtube.com/embed/${youtube}`;
  $('#video-iframe').attr('src', videoSrc);
  $('#video-img').attr('src', '../img/video.png');
  $('#modal6').on('hidden.bs.modal', (e) => {
    $('#modal6 iframe').attr('src', $('#modal6 iframe').attr('src'));
  });
}

const translateContent = (e) => {
  if (e.target.nodeName === 'A') {
    let lang = e.target.innerHTML;
    switch (lang) {
      case 'Русский': lang = 'ru'; break;
      case 'Беларускi': lang = 'by'; break;
      case 'English': lang = 'en'; break;
      default: lang = 'ru';
    }
    if (localStorage.getItem('numberOfAuthor') !== null) {
      const numberOfAuthor = localStorage.getItem('numberOfAuthor');
      generatePage(+numberOfAuthor, lang);
    } else {
      generatePage(0, lang);
    }
  }
};

const langSelect = document.body.querySelector('.dropdown');
langSelect.addEventListener('click', translateContent);
