let elForm = $_('#form');
let elSearchInput = $_('#search_input');
let elSort = $_('#rating_sort');
let elResult = $_('#search-result');
let elWrapper = $_('#wrapperList');
let elTemplate = $_('#news-template').content;
let sortValue = elSort.value;
//Render news
function renderNews(data, elWrapper) {
  elWrapper.innerHTML = null;

  let newsFragment = document.createDocumentFragment();
  data?.articles?.forEach(item => {
    let newsTemplate = elTemplate.cloneNode(true);
    console.log(item);
    $_('#new-img', newsTemplate).src = item?.urlToImage;
    $_('#card_title', newsTemplate).textContent = item?.title;
    $_('#news_description', newsTemplate).textContent = item?.description;
    $_('#news_date', newsTemplate).textContent = item?.publishedAt;
    $_('#read_btn', newsTemplate).href = item?.url;
    $_('#news_author', newsTemplate).textContent = item?.author;

    newsFragment.appendChild(newsTemplate);
  })
  elWrapper.appendChild(newsFragment);

  elResult.textContent = data.totalResults;

  if (data.totalResults == 0) {
    elWrapper.textContent = "No news found";
  }
}

fetch(`https://newsapi.org/v2/everything?q=tesla&from=2022-05-03&sortBy=${sortValue}&apiKey=02c4e2d251de4d37b4591abdc4e0e11a`).then((res) => res.json()).then((data) => renderNews(data, elWrapper))

// Search news

elForm.addEventListener("input", function(evt){
evt.preventDefault();
let inValue = elSearchInput.value.trim().toLowerCase();
// let pattern = new RegExp(inValue, "gi") || "No News found"
fetch(`https://newsapi.org/v2/everything?q=${inValue}&from=2022-05-03&sortBy=${sortValue}&apiKey=02c4e2d251de4d37b4591abdc4e0e11a`)
.then((res) => res.json()).then((data) => renderNews(data, elWrapper))
if(inValue == "")
{
  fetch(`https://newsapi.org/v2/everything?q=tesla&from=2022-05-03&sortBy=${sortValue}&apiKey=02c4e2d251de4d37b4591abdc4e0e11a`)
.then((res) => res.json()).then((data) => renderNews(data, elWrapper))
}
})
