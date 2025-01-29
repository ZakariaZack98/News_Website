//variables===================================================
const APIKey = '68aa09a6cfcb43eb8eb7e77a99fa0c5f';
const urlHead = 'https://newsapi.org/v2/everything?q=';
const navLinks = document.querySelector('.navLinks');
const feedHeading = document.querySelector('.feedHeading');
const feedWrapper = document.querySelector('.feedWrapper');
const searchInp = document.querySelector('.searchInp');
const searchBtn = document.querySelector('.searchBtn');
let newsData;


//functions===================================================
window.addEventListener('load', async () => {
  await getNewsByCategory('General');
  setTimeout(() => {
    feedHeading.textContent = 'Trendy Now';
    updateFeed();
  }, 1000);
})


async function getNewsByCategory(category) {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${APIKey}`);
  const data = await response.json();
  newsData = data.articles;
}

async function getNewsByQuery(query) {
  const response = await fetch(`${urlHead}${query}&apiKey=${APIKey}`);
  const data = await response.json();
  newsData = data.articles;
}

function updateFeed() {
  feedWrapper.innerHTML = '';
  let markup = [];
  for(let i = 0; i < 12; i++) {
    //creating news card
    const newsCard = document.createElement('div');
    newsCard.classList.add('card', 'pointer', 'col-4');
    newsCard.style.width = '30%';
    //assigning image
    const newsCardImg = document.createElement('img');
    newsCardImg.classList.add('card-img-top')
    newsCardImg.src = newsData[i].urlToImage;
    newsCardImg.style.height = '200px';
    newsCardImg.alt = 'No valid image source found'
    //creating card body
    const newsCardBody = document.createElement('div');
    newsCardBody.classList.add('card-body');
    //adding title
    const newsCardTitle = document.createElement('h5');
    newsCardTitle.classList.add('card-title');
    newsCardTitle.textContent = newsData[i].title;
    //adding author and date
    const authorSec = document.createElement('div');
    authorSec.classList.add('authorSec', 'd-flex', 'justify-content-between', 'align-items-start');
    const authorName = document.createElement('span');
    newsData[i].author ? authorName.textContent = newsData[i].author : authorName.textContent = 'Unknown Author'
    // authorName.textContent = newsData[i].author;
    const publishDate = document.createElement('span');
    publishDate.textContent = newsData[i].publishedAt;
    authorSec.append(authorName, publishDate);
    //adding description
    const newsDesc = document.createElement('p');
    newsDesc.classList.add('card-text');
    newsDesc.textContent = newsData[i].description;
    //adding link to full article
    const readMoreBtn = document.createElement('a');
    readMoreBtn.classList.add('btn', 'btn-primary');
    readMoreBtn.href = newsData[i].url;
    readMoreBtn.target = '_blank'
    readMoreBtn.textContent = 'Read More'

    //appending elems================================================
    newsCardBody.append(newsCardTitle, authorSec, newsDesc, readMoreBtn);
    newsCard.append(newsCardImg, newsCardBody);
    feedWrapper.appendChild(newsCard);
  }
}

navLinks.addEventListener('click', async (e) => {
  e.stopPropagation();
  await getNewsByCategory(e.target.textContent);
  setTimeout(() => {
    feedWrapper.innerHTML = `<div class="d-flex justify-content-center align-items-center my-5"><img src="https://i.gifer.com/ZKZg.gif" style="width: 300px;"></div>`
  }, 50);
  setTimeout(() => {
    feedHeading.textContent = e.target.textContent;
    updateFeed();
  }, 1000);
})

searchBtn.addEventListener('click', async (e) => {
  e.stopPropagation();
  await getNewsByQuery(searchInp.value);
  setTimeout(() => {
    feedWrapper.innerHTML = `<div class="d-flex justify-content-center align-items-center my-5"><img src="https://i.gifer.com/ZKZg.gif" style="width: 300px;"></div>`
  }, 50);
  setTimeout(() => {
    feedHeading.textContent = `Search Results for - ${searchInp.value}`;
    updateFeed();
  }, 1000);
})
