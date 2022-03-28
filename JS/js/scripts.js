

const btnBuscar = document.querySelector('.buscar__boton');
const pokeInput = document.querySelector('#busqueda');
const secCaracteristicas = document.querySelector('.pokemon-caracteristicas');
const secEstadisticas = document.querySelector('.pokemon-estadisticas');
const secMovimientos = document.querySelector('.pokemon-movimientos');

btnBuscar.addEventListener('click', fetchPokemon);
pokeInput.addEventListener('keypress', evento => {
    if (evento.keyCode === 13){
        evento.preventDefault();
        btnBuscar.click();
    }
});

async function fetchPokemon() {
    const pokemonInput = document.querySelector('#busqueda');
    let pokemon = pokemonInput.value;
    pokemon = pokemon.toLowerCase();
    pokemonInput.value = '';

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`; 
    console.log(url);

    const respuestaPokeAPI = await fetch(url);
    if (respuestaPokeAPI.ok) {
        let pokemonJSON = await respuestaPokeAPI.json();
        foundPokemon(pokemonJSON);
        console.log(pokemonJSON);
    }else {        
        errorURL();
    }
}

function foundPokemon(json) {
    const imgURL = json.sprites.front_default;
    const name = json.forms[0].name;
    const id = json.id;
    const types = json.types;
    const height = json.height;
    const weight = json.weight;
    const stats = json.stats;
    const moves = json.moves;

    const img = pokeImg(imgURL);
    const titulo =  document.querySelector('.pokemon-area__name .name');
    const idText =  document.querySelector('.pokemon-area__name .id');
    const typesDisplay = document.querySelectorAll('.pokemon-type');
    const altura = document.querySelector('#altura');
    const peso = document.querySelector('#peso');
    const hp = document.querySelector('#hp');
    const atk = document.querySelector('#atk');
    const def = document.querySelector('#def');
    const satk = document.querySelector('#satk');
    const sdef = document.querySelector('#sdef');
    const spd = document.querySelector('#spd');
    const movimientosText = document.querySelector('.movimientos');

    const formattedName =  name.slice(0, 1).toUpperCase() + name.slice(1);
    titulo.textContent = formattedName;
    idText.textContent = `#${id}`;

    document.querySelector('.pokemon-types').style.display = 'flex';
    if (types.length == 1) {
        typesDisplay[0].textContent = types[0].type.name;
        typesDisplay[1].style.display = 'none';
    }else {
        typesDisplay[0].textContent = types[0].type.name;
        typesDisplay[1].textContent = types[1].type.name;
        typesDisplay[0].style.display = 'flex';
        typesDisplay[1].style.display = 'flex';
    }

    peso.textContent = weight;
    altura.textContent = height;

    hp.textContent = stats[0].base_stat;
    atk.textContent = stats[1].base_stat;
    def.textContent = stats[2].base_stat;
    satk.textContent = stats[3].base_stat;
    sdef.textContent = stats[4].base_stat;
    spd.textContent = stats[5].base_stat;
    
    let movimientos = [];
    moves.forEach((movimiento) => {
        movimientos.push(movimiento.move.name);
    });
    console.log(movimientos);

    movimientosText.innerHTML = '';
    movimientos.forEach((mov) => {
        let nuevoParrafo = document.createElement('P');
        nuevoParrafo.textContent = mov;
        movimientosText.appendChild(nuevoParrafo);
        
    });

    secCaracteristicas.style.display = 'block'; 
    secEstadisticas.style.display = 'block'; 
    secMovimientos.style.display = 'block'; 

}

function errorURL () {
    const img = pokeImg('img/ditto.png');
    img.style = 'filter: brightness(10%); opacity: 30%';

    const titulo =  document.querySelector('.pokemon-area__name .name');
    const id =  document.querySelector('.pokemon-area__name .id');
    const types = document.querySelector('.pokemon-types');

    titulo.textContent = 'No conozco ese pokemon):';
    id.textContent = '404';
    types.style.display = 'none';

    //TODO: ocultar el area de informacion
    secCaracteristicas.style.display = 'none'; 
    secEstadisticas.style.display = 'none'; 
    secMovimientos.style.display = 'none'; 

    console.log('url incorrecta');
}

function pokeImg(url) {
    const pokeImg = document.querySelector('.pokemon-icon');
    pokeImg.src = url;
    pokeImg.style = 'opacity:100%';
    return pokeImg
}