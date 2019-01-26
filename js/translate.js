window.onload = () => {
  const ru = '../data/ru.json';
  const en = '../data/en.json';
  const by = '../data/by.json';

  const fetchLang = (url) => {
    fetch(url)
      .then(response => response.json())
      .then((resultJson) => {
        document.querySelector('.navbar-brand').innerHTML = resultJson.values.sitename;
        document.querySelector('.nav-link').innerHTML = resultJson.values.listLink;
        document.querySelector('.nav-link').innerHTML = resultJson.values.listLink;
        document.querySelector('#navbardrop').innerHTML = resultJson.values.currantLang;
        document.querySelector('.dropdown-item:first-child').innerHTML = resultJson.values.lang1;
        document.querySelector('.dropdown-item:last-child').innerHTML = resultJson.values.lang2;
        document.querySelector('h1').innerHTML = resultJson.values.h1;
        document.querySelector('.lead').innerHTML = resultJson.values.lead;
        document.querySelector('.about h2').innerHTML = resultJson.values.about;
        document.querySelector('.about p').innerHTML = resultJson.values.aboutText;
        document.querySelector('.author h2').innerHTML = resultJson.values.author;
        document.querySelector('.team h2').innerHTML = resultJson.values.team;
        const names = document.querySelectorAll('.name');
        names[0].innerHTML = resultJson.values.p1;
        const works = document.querySelectorAll('.work');
        works[0].innerHTML = resultJson.values.p1Work;
        names[1].innerHTML = resultJson.values.p2;
        works[1].innerHTML = resultJson.values.p2Work;
        names[2].innerHTML = resultJson.values.p3;
        works[2].innerHTML = resultJson.values.p3Work;
        names[3].innerHTML = resultJson.values.p4;
        works[3].innerHTML = resultJson.values.p4Work;
        names[4].innerHTML = resultJson.values.p5;
        works[4].innerHTML = resultJson.values.p5Work;
      });
  };

  fetchLang(ru);

  const selectLanguage = (e) => {
    if (e.target.nodeName === 'A') {
      const lang = e.target.innerHTML;
      switch (lang) {
        case 'Русский':
          fetchLang(ru);
          break;
        case 'Беларускi':
          fetchLang(by);
          break;
        case 'English':
          fetchLang(en);
          break;
        default:
          fetchLang(ru);
          break;
      }
    }
  };

  const langSelect = document.body.querySelector('.dropdown');
  langSelect.addEventListener('click', selectLanguage);
};
