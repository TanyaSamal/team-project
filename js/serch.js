const ready = () => {
  const printAuthor = (obj, lang, key1, action1) => {
    const mainEl = document.querySelector('.daily-author');

    const res = document.createElement('div');
    res.className = 'result';

    const pic = document.createElement('img');
    pic.src = obj.img;
    pic.classList.add('photo');
    res.appendChild(pic);

    const wrapper = document.createElement('div');
    wrapper.className = 'info';

    const name = document.createElement('h3');
    name.innerHTML = obj.name[lang];
    wrapper.appendChild(name);

    if (key1) {
      const year = document.createElement('p');
      year.innerHTML = `${key1} - ${action1}`;
      wrapper.appendChild(year);
    }

    const link = document.createElement('a');
    link.href = '/';
    switch (lang) {
      case 'ru': link.innerHTML = 'Читать далее...'; break;
      case 'by': link.innerHTML = 'Чытаць далей...'; break;
      case 'en': link.innerHTML = 'More...'; break;
      default: link.innerHTML = 'Читать далее...';
    }
    wrapper.appendChild(link);

    res.appendChild(wrapper);
    mainEl.appendChild(res);
  };

  const loading = (lang) => {
    fetch('../data/data.json')
      .then(response => response.json())
      .then((resultJson) => {
        resultJson.forEach((o) => {
          let bio = '';
          switch (lang) {
            case 'ru': bio = o.bio[0].descriptionRu; break;
            case 'by': bio = o.bio[0].descriptionBy; break;
            case 'en': bio = o.bio[0].descriptionEn; break;
            default: bio = o.bio[0].descriptionRu;
          }
          printAuthor(o, lang, o.bio[0].year, bio);
        });
      });
  };

  loading('ru');

  const startSearch = () => {
    fetch('../data/data.json')
      .then(response => response.json())
      .then((resultJson) => {
        const keyWord = document.body.querySelector('.form-control').value;
        const mainEl = document.querySelector('.daily-author');
        mainEl.innerHTML = '';
        const currantLang = document.body.querySelector('#navbardrop').innerHTML;
        let lang = 'ru';
        switch (currantLang) {
          case 'Русский': lang = 'ru'; break;
          case 'Беларускi': lang = 'by'; break;
          case 'English': lang = 'en'; break;
          default: lang = 'ru';
        }
        let res = 0;
        if (keyWord !== '') {
          resultJson.forEach((obj) => {
            const name = obj.name[lang].toLowerCase();
            if (name.indexOf(keyWord) !== -1) {
              printAuthor(obj, lang);
              res += 1;
            }
            let description = '';
            obj.bio.forEach((bioObj) => {
              let place = '';
              switch (lang) {
                case 'ru': place = bioObj.placeRu; break;
                case 'by': place = bioObj.placeBy; break;
                case 'en': place = bioObj.placeEn; break;
                default: place = bioObj.placeRu; break;
              }
              if (bioObj.year === keyWord || place.indexOf(keyWord) !== -1) {
                switch (lang) {
                  case 'ru': description = bioObj.descriptionRu; break;
                  case 'by': description = bioObj.descriptionBy; break;
                  case 'en': description = bioObj.descriptionEn; break;
                  default: description = bioObj.descriptionRu; break;
                }
                printAuthor(obj, lang, keyWord, description);
                res += 1;
              }
            });
            obj.biblio.forEach((biblioObj) => {
              if (biblioObj.year === keyWord) {
                switch (lang) {
                  case 'ru': description = biblioObj.workRu; break;
                  case 'by': description = biblioObj.workBy; break;
                  case 'en': description = biblioObj.workEn; break;
                  default: description = biblioObj.workRu; break;
                }
                printAuthor(obj, lang, keyWord, description);
                res += 1;
              }
            });
          });
        }
        if (res === 0) {
          switch (lang) {
            case 'ru': mainEl.innerHTML = 'Ничего не найдено'; break;
            case 'by': mainEl.innerHTML = 'Нічога не знойдзена'; break;
            case 'en': mainEl.innerHTML = 'No results'; break;
            default: mainEl.innerHTML = 'Ничего не найдено';
          }
        }
      });
  };

  const translateSearch = (e) => {
    const keyWord = document.body.querySelector('.form-control').value;
    if (e.target.nodeName === 'A') {
      let lang = e.target.innerHTML;
      switch (lang) {
        case 'Русский': lang = 'ru'; break;
        case 'Беларускi': lang = 'by'; break;
        case 'English': lang = 'en'; break;
        default: lang = 'ru';
      }
      if (keyWord === '') {
        const mainEl = document.querySelector('.daily-author');
        mainEl.innerHTML = '';
        loading(lang);
      } else {
        startSearch();
      }
    }
  };

  const enterSearch = (e) => {
    if (e.keyCode === 13) {
      startSearch();
    }
  };

  const findBtn = document.body.querySelector('.btn-outline-secondary');
  const input = document.body.querySelector('.form-control');
  input.addEventListener('keypress', enterSearch);
  findBtn.addEventListener('click', startSearch);
  const langSelect = document.body.querySelector('.dropdown');
  langSelect.addEventListener('click', translateSearch);
};

document.addEventListener('DOMContentLoaded', ready);
