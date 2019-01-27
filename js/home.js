fetch('../data/data.json')
  .then(response => response.json())
  .then((resultJson) => {
    const rand = Math.trunc(Math.random() * (resultJson.length));
    const mainEl = document.querySelector('.daily-author');

    const pic = document.createElement('img');
    pic.src = resultJson[rand].img;
    pic.classList.add('photo');
    mainEl.appendChild(pic);

    const content = document.createElement('div');
    content.className = 'info';

    const name = document.createElement('h3');
    name.innerHTML = resultJson[rand].name.ru;
    content.appendChild(name);

    const info = document.createElement('p');
    info.innerHTML = `${resultJson[rand].bio[0].descriptionRu}, ${resultJson[rand].bio[0].placeRu} (${resultJson[rand].bio[0].year})`;
    content.appendChild(info);

    const book = document.createElement('p');
    book.innerHTML = ` - ${resultJson[rand].biblio[0].workRu} (${resultJson[rand].biblio[0].year})`;
    content.appendChild(book);

    const link = document.createElement('a');
    link.href = '/';
    link.innerHTML = 'Читать далее...';
    content.appendChild(link);

    mainEl.appendChild(content);
  });
