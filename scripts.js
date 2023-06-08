function useFetch(url) {
  return fetch(url)
  .then((response) => { return response.json(); })
  .then((data) => { 
    return data;
  })
  .catch(() => { console.log('error') });
  };

function displayResult(apiData) {
  let cards = '';
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img src="${item.download_url}" class="card-image"/>
        <p>${item.author}</p>
      </div>
      `;
    cards = cards + cardBlock;
  });
  resultNode.innerHTML = cards;
};

function inputCheck(value_1, value_2) {
    let val1 = value_1 > 0 && value_1 < 11 && Number.isInteger(Number(value_1));
    let val2 = value_2 > 0 && value_2 < 11 && Number.isInteger(Number(value_2));
    if (val1 && val2) {
      return true;
    } else if (val1 == true && val2 == false) {
      resultNode.textContent = 'Лимит вне диапазона от 1 до 10';
      return false;
    }
      else if (val1 == false && val2 == true) {
      resultNode.textContent = 'Номер страницы вне диапазона от 1 до 10';
      return false;
      }
    else {
      resultNode.textContent = "Номер страницы и лимит вне диапазона от 1 до 10";
      return false;
    }
};

const resultNode = document.querySelector('.j-result');
const input_1 = document.querySelector('.j-input-pages');
const input_2 = document.querySelector('.j-input-limit');
const form = document.querySelector('.form');
let url = '';
const myJSON = localStorage.getItem('myJSON');
if (myJSON) {
  displayResult(JSON.parse(myJSON));
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  url = `https://picsum.photos/v2/list?page=${input_1.value}&limit=${input_2.value}`;
})

form.addEventListener('submit', async () => {
  localStorage.clear();
  if (inputCheck(input_1.value, input_2.value)) {
    let data = await useFetch(url);
    localStorage.setItem("myJSON", JSON.stringify(data));
    displayResult(data);
  }
});
