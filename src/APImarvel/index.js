//PARTE 1 API MARVEL - MUESTRA RESULTADOS EN CONSOLA

const md5 = require('md5');

// Se genera un timestamp
const tsv = new Date().getTime();

// Se muestra en consola el ts generado
console.log("timestamp: " + tsv + "\n");

// Generar un valor HASH a partir de ts, private key, public key (Página de Marvel)
const privateKey = "4ebc6b6b3f27c9be903886e53dc6469a32e40858";
const publicKey = "bc620c28895906328b705bde6511b78a";
const hashv = md5(tsv + privateKey + publicKey);

// URL de la petición API
const url = 'https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=C&limit=100&ts=' + tsv + "&apikey=bc620c28895906328b705bde6511b78a&hash=" + hashv;

// Generar una URL para añadir parámetros
const urlsp = new URL('https://gateway.marvel.com:443/v1/public/characters');

console.log(url + "\n");
console.log(urlsp + "\n");
console.log("Lista de personajes que inician con C\n");

/* Objeto que agrupa los parámetros de la petición */
let params = {
    limit: 100,
    apikey: publicKey,
    ts: tsv,
    hash: hashv,
    nameStartsWith: 'C', // Cambiado a 'C' para obtener personajes que comienzan con la letra C
};

// Se añaden los parámetros a la URL usando el método searchParams
Object.keys(params).forEach((key) => urlsp.searchParams.append(key, params[key]));

fetch(urlsp)
    .then((response) => response.json())
    .then((json) => {
        console.log(json.data)
        json.data.results.map((item) => {
            let urlImg = item.thumbnail.path + "," + item.thumbnail.extension;
            console.log(item.name + " " + urlImg.replace('http', 'https'));
        });
    });
