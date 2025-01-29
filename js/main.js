//variables===================================================
const APIKey = '68aa09a6cfcb43eb8eb7e77a99fa0c5f';
const urlHead = 'https://newsapi.org/v2/everything?q=';


//functions===================================================
async function getNewsByCategory(category) {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${APIKey}`);
  const data = await response.json();
  console.log(data);
}

async function getNewsByQuery(query) {
  const response = await fetch(`${urlHead}${query}&apiKey=${APIKey}`);
  const data = await response.json();
  console.log(data);
}