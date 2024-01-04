let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

/* API MArvel */

// biblioteca md5
/* import  md5  from 'md5'; */

// ts - a timestamp (or other long string which can change on a request-by-request basis)
// hash - a md5 digest of the ts parameter, your private key and your public key (e.g. md5(ts+privateKey+publicKey)

/* Private key: bd6d7f61dbf280219da831a8b2cbae979ec0927d */
/* Public key: dc7596ce5d404405dc4c7aa350042e01 */

/* const ts = new Date().getTime(); */
const ts = '1702060313149';
const apikey = "dc7596ce5d404405dc4c7aa350042e01";
const hash = "1b89946d6f2dc57e5d1e7187ff680845";
const limit = 100;

/* const hashedKey =  md5(ts + apikeyP + apikey); */

// muestra en consola public key
console.log("public key: " + apikey + "\n");
// muestra en consola timestamp generado
console.log("timestamp: " + ts + "\n");
console.log("hashed key: " + hash + "\n");
/* console.log("hashed key: " + hashedKey + "\n"); */

function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 4) {
    return false;
  }

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ ts }&apikey=${ apikey }&hash=${ hash }&nameStartsWith=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
  displayCatalogCards(jsonData.data["results"]);
});

button.addEventListener("click", (getResult = async () => {
    if (input.value.trim().length < 1) {
      alert("Input cannot be blank");
    }
    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ ts }&apikey=${ apikey }&hash=${ hash }&name=${ input.value }`;

    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((element) => {
      showContainer.innerHTML = `
        <div class="card-container">
          <div class="container-character-image">
            <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}">
          </div>
          <div class="character-name">${element.name}</div>
          <div class="character-description">${element.description}</div>
        </div>`;
    });
  })
);

window.onload = () => {
  getResult();
};

/* const url = `https://gateway.marvel.com:443/v1/public/characters?limit=${ limit }&ts=${ ts }&apikey=${ apikey }&hash=${ hash }`;

console.log(url + "\n");
console.log("Lista de personajes: \n"); */

/* datos en formato json */
/* fetch(url)
  .then(response => response.json())
  .then(response => printData(response.data.results))
  .catch(err => console.log('Se ha producido un error: ', err));

const printData = (personajes) => {
    console.log(personajes);
} */