let nameWriter = document.querySelectorAll(".name");
let year = document.querySelectorAll(".date-of-birth");
let town = document.querySelectorAll(".location");

for (let i = 0; i < nameWriter.length; i++) {
  for (let j = 0; j < writers.length; j++) {
    nameWriter[i].innerHTML = writers[i].name.ru;
  }
}

for (let i = 0; i < year.length; i++) {
  for (let j = 0; j < writers.length; j++) {
    year[i].innerHTML = writers[i].bio[0].year;
  }
}

for (let i = 0; i < town.length; i++) {
  for (let j = 0; j < writers.length; j++) {
    town[i].innerHTML = writers[i].bio[0].placeRu;
  }
}
