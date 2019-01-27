const ready = () => {
  const printAuthor = (obj, key1, action1) => {
    const mainEl = document.querySelector('.daily-author');

    const res = document.createElement('div');
    res.className = 'result';

    const leftPart = document.createElement('div');
    leftPart.className = '.left-part';
    res.appendChild(leftPart);

    const pic = document.createElement('img');
    pic.src = obj.img;
    pic.classList.add('photo');
    leftPart.appendChild(pic);

    const wrapper = document.createElement('div');
    wrapper.className = 'info';

    const name = document.createElement('h3');
    name.innerHTML = obj.name.ru;
    wrapper.appendChild(name);

    if (key1) {
      const year = document.createElement('p');
      year.innerHTML = `${key1} - ${action1}`;
      wrapper.appendChild(year);
    }

    const link = document.createElement('a');
    link.href = '/';
    link.innerHTML = 'Читать далее...';
    wrapper.appendChild(link);

    res.appendChild(wrapper);
    mainEl.appendChild(res);
  };

  const loading = () => {
    fetch('../data/data.json')
      .then(response => response.json())
      .then(resultJson => {
        resultJson.forEach(o => {
          printAuthor(o, o.bio[0].year, o.bio[0].descriptionRu);
        });
      });
  };

  loading();

  const startSearch = () => {
    fetch('../data/data.json')
      .then(response => response.json())
      .then(resultJson => {
        const keyWord = document.body.querySelector('.search').value;
        const mainEl = document.querySelector('.daily-author');
        mainEl.innerHTML = '';
        let res = 0;
        if (keyWord !== '') {
          resultJson.forEach(obj => {
            const name = obj.name.ru.toLowerCase();
            if (name.indexOf(keyWord) !== -1) {
              printAuthor(obj);
              res += 1;
            }
            obj.bio.forEach(bioObj => {
              if (
                bioObj.year === keyWord ||
                bioObj.placeRu.indexOf(keyWord) !== -1
              ) {
                printAuthor(obj, keyWord, bioObj.descriptionRu);
                res += 1;
              }
            });
            obj.biblio.forEach(biblioObj => {
              if (biblioObj.year === keyWord) {
                printAuthor(obj, keyWord, biblioObj.workRu);
                res += 1;
              }
            });
          });
        }
        if (res === 0) {
          mainEl.innerHTML = 'Ничего не найдено';
        }
      });
  };

  const findBtn = document.body.querySelector('.btn-outline-secondary');
  findBtn.addEventListener('click', startSearch);
};

document.addEventListener('DOMContentLoaded', ready);
