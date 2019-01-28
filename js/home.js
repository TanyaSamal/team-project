fetch('../data/data.json')
  .then(response => response.json())
  .then((resultJson) => {
    const rand = Math.trunc(Math.random() * (resultJson.length));
    const mainEl = document.querySelector('.daily-author');

    const res = document.createElement('div');
    res.className = 'row result ';

    const pic = document.createElement('img');
    pic.src = resultJson[rand].img;
    pic.classList.add('photo');
    res.appendChild(pic);

    const content = document.createElement('div');
    content.className = 'col-md-6 info ';

    const name = document.createElement('h3');
    if (localStorage.getItem('lang') !== null) {
      const localLang = localStorage.getItem('lang');
      switch (localLang) {
        case 'Русский': name.innerHTML = resultJson[rand].name.ru; break;
        case 'Беларускi': name.innerHTML = resultJson[rand].name.by; break;
        case 'English': name.innerHTML = resultJson[rand].name.en; break;
        default: name.innerHTML = resultJson[rand].name.ru; break;
      }
    } else {
      name.innerHTML = resultJson[rand].name.ru;
    }
    content.appendChild(name);

    const info = document.createElement('p');
    if (localStorage.getItem('lang') !== null) {
      const localLang = localStorage.getItem('lang');
      switch (localLang) {
        case 'Русский': info.innerHTML = `${resultJson[rand].bio[0].descriptionRu}, ${resultJson[rand].bio[0].placeRu} (${resultJson[rand].bio[0].year})`; break;
        case 'Беларускi': info.innerHTML = `${resultJson[rand].bio[0].descriptionBy}, ${resultJson[rand].bio[0].placeBy} (${resultJson[rand].bio[0].year})`; break;
        case 'English': info.innerHTML = `${resultJson[rand].bio[0].descriptionEn}, ${resultJson[rand].bio[0].placeBy} (${resultJson[rand].bio[0].year})`; break;
        default: name.innerHTML = resultJson[rand].name.ru; break;
      }
    } else {
      info.innerHTML = `${resultJson[rand].bio[0].descriptionRu}, ${resultJson[rand].bio[0].placeRu} (${resultJson[rand].bio[0].year})`;
    }
    content.appendChild(info);

    const book = document.createElement('p');
    if (localStorage.getItem('lang') !== null) {
      const localLang = localStorage.getItem('lang');
      switch (localLang) {
        case 'Русский': book.innerHTML = ` - ${resultJson[rand].biblio[0].workRu} (${resultJson[rand].biblio[0].year})`; break;
        case 'Беларускi': book.innerHTML = ` - ${resultJson[rand].biblio[0].workBy} (${resultJson[rand].biblio[0].year})`; break;
        case 'English': book.innerHTML = ` - ${resultJson[rand].biblio[0].workEn} (${resultJson[rand].biblio[0].year})`; break;
        default: name.innerHTML = resultJson[rand].name.ru; break;
      }
    } else {
      book.innerHTML = ` - ${resultJson[rand].biblio[0].workRu} (${resultJson[rand].biblio[0].year})`;
    }
    content.appendChild(book);

    const link = document.createElement('a');
    link.href = './html/author-info.html';
    link.onclick = () => {
      localStorage.setItem('numberOfAuthor', rand);
    };
    if (localStorage.getItem('lang') !== null) {
      const localLang = localStorage.getItem('lang');
      switch (localLang) {
        case 'Русский': link.innerHTML = 'Читать далее...'; break;
        case 'Беларускi': link.innerHTML = 'Чытаць далей...'; break;
        case 'English': link.innerHTML = 'More...'; break;
        default: link.innerHTML = 'Читать далее...'; break;
      }
    } else {
      link.innerHTML = 'Читать далее...';
    }
    content.appendChild(link);

    res.appendChild(content);
    mainEl.appendChild(res);

    const changeInfo = (e) => {
      if (e.target.nodeName === 'A') {
        const lang = e.target.innerHTML;
        const about = document.querySelectorAll('.info p');
        switch (lang) {
          case 'Русский':
            document.querySelector('.info h3').innerHTML = resultJson[rand].name.ru;
            about[0].innerHTML = `${resultJson[rand].bio[0].descriptionRu}, ${resultJson[rand].bio[0].placeRu} (${resultJson[rand].bio[0].year})`;
            about[1].innerHTML = ` - ${resultJson[rand].biblio[0].workRu} (${resultJson[rand].biblio[0].year})`;
            document.querySelector('.info a').innerHTML = 'Читать далее...';
            break;
          case 'Беларускi':
            document.querySelector('.info h3').innerHTML = resultJson[rand].name.by;
            about[0].innerHTML = `${resultJson[rand].bio[0].descriptionBy}, ${resultJson[rand].bio[0].placeBy} (${resultJson[rand].bio[0].year})`;
            about[1].innerHTML = ` - ${resultJson[rand].biblio[0].workBy} (${resultJson[rand].biblio[0].year})`;
            document.querySelector('.info a').innerHTML = 'Чытаць далей...';
            break;
          case 'English':
            document.querySelector('.info h3').innerHTML = resultJson[rand].name.en;
            about[0].innerHTML = `${resultJson[rand].bio[0].descriptionEn}, ${resultJson[rand].bio[0].placeEn} (${resultJson[rand].bio[0].year})`;
            about[1].innerHTML = ` - ${resultJson[rand].biblio[0].workEn} (${resultJson[rand].biblio[0].year})`;
            document.querySelector('.info a').innerHTML = 'More...';
            break;
          default:
            break;
        }
      }
    };

    const langSelect = document.body.querySelector('.dropdown');
    langSelect.addEventListener('click', changeInfo);
  });
