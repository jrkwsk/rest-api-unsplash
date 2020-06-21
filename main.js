'use strict'

const allButtons = document.getElementsByTagName("button");

// convert allButtons to array
const allButtonsArr = Array.from(allButtons);

// add to allButtons an id
allButtonsArr.forEach(elem => elem.setAttribute('id', elem.innerText));

allButtonsArr.forEach(elem => elem.addEventListener('click', getPhotosbyColor));

async function getPhotosbyColor(event) {
  // delete content   
  document.getElementById("photo-list").innerHTML = "";
  const color = event.target.id;
  const url = `https://api.unsplash.com/search/photos/?client_id=499c426f6006e77ef88a0217724400eac25f54fb9598af9035782d9c1868202c&query=people&page=1&per_page=30&order_by=latest&color=${color}&orientation=squarish`;
  // console.log(url)
  const resp = await fetch(url);
  // console.log(resp)
  // console.log(typeof resp)
  const data = await resp.json();
  // console.log(data.results[0].urls.thumb)
  // console.log(data.results)
  const fetchedImgArr = data.results;

  const photoUrlsArr = [];
  fetchedImgArr.forEach(elem => photoUrlsArr.push(elem.urls.thumb));
  photoUrlsArr.length !== 0 ? photoUrlsArr.forEach(addPhotos) : document.getElementById("photo-list").innerText = 'sorry, nothing found';

  // photoUrlsArr.forEach(addPhotos);
  // document.getElementById("photo-list").appendChild(img);

  function addPhotos(photoUrl) {
    const img = new Image(200, 200);
    img.src = photoUrl;
    console.log(photoUrl);
    document.getElementById("photo-list").appendChild(img);
  };

  const allImagesArr = document.querySelectorAll("img");

  allImagesArr.forEach(elem => elem.setAttribute('class', 'm-2'));

}