const axios = require('axios').default;

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  const card = document.createElement('div');
  card.classList.add('card');
  
  const headline = document.createElement('div');
  headline.classList.add('headline');
  headline.textContent = article.headline;

  const authDiv = document.createElement('div');
  authDiv.classList.add('author');

  const authImgContainer = document.createElement('div');
  authImgContainer.classList.add('img-container');

  const authImg = document.createElement('img');
  authImg.setAttribute('src',article.authorPhoto);

  const byLine = document.createElement('span');
  byLine.textContent = `By ${ article.authorName }`

  
  authImgContainer.appendChild(authImg);
  authDiv.appendChild(authImgContainer);
  authDiv.appendChild(byLine);

  card.appendChild(headline);
  card.appendChild(authDiv);

  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  axios.get('http://localhost:5001/api/articles')
    .then(response => {
      
      const articleKeys = Object.keys(response.data.articles);
      articleKeys.forEach(x => {
         response.data.articles[x].forEach(item => {
           const newCard = Card(item);
           const cardParent = document.querySelector(selector);
           cardParent.appendChild(newCard); 
        });
      });
    });
}

export { Card, cardAppender }
