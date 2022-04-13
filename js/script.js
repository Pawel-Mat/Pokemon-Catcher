
const welcome = document.querySelector('.home');
const button = document.getElementById('go-button');
const catchButton = document.getElementById('catch-btn');
const mainContent = document.querySelector('.main');
const pokeWrapper = document.querySelector('.poke-wrapper');
let userName = document.getElementById('user-name');
let jsonData = '';
let generatedPokemons = [];
let catchedPokemons = [];


const generatePokemon = (el) => {
  
  const randomPokemon = () => {
    return el.results[Math.floor(Math.random() * el.results.length) + 1];
  }
  
  let pokemonData = {}
  
  fetch(randomPokemon().url)
  .then(res => res.json())
  .then(data => {
    
    pokemonData.namePokemon = data.name;
    pokemonData.artworkPokemon = data.sprites.other["official-artwork"].front_default;
    pokemonData.statsPokemon = data.stats;
    for(i=0; i<data.stats.length; i++) {
      pokemonData.statsPokemon[i].stat.name = data.stats[i].stat.name; 
      pokemonData.statsPokemon[i].stat.value = data.stats[i].base_stat; 
    }

    generatedPokemons.push(pokemonData);
    
    
    let div = document.createElement('div');
    let img = document.createElement('img');
    let pokeName = document.createElement('h3');
    
    div.classList.add('poke-card');
    img.src = pokemonData.artworkPokemon;
    pokeName.textContent = pokemonData.namePokemon;
    pokeWrapper.appendChild(div);
    div.appendChild(img);
    div.appendChild(pokeName);
  })
  return pokemonData;
}
  
const app = () => {
  user = document.getElementById('name').value;
  pokemonLength = user.length*10;
  userName.innerHTML = user;
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=' + pokemonLength + '&offset=[offset]';
  fetch(url)
  .then(response => response.json())
  .then(json => { 
    jsonData = json;
    console.log('jsonData', jsonData);
    console.log('json', json);
    for (i=0; i<5; i++) {
      generatePokemon(jsonData);
    }
    console.log('generated', generatedPokemons);
  })
  .catch(err => {
    console.log('error!!!');
    console.error(error);
  })
}

const catchRandom = () => {
  return Math.random() >= 0.5;
}

const removeElements = () => {
  let pokeCards = document.querySelectorAll('.poke-card');
  for ( let card of pokeCards) {
    card.remove();
  }
}

button.addEventListener('click', () => {
  if(document.getElementById('name').value.length > 0 ) {
    mainContent.classList.add('active');
    welcome.classList.remove('active');
    app();
  }
});

catchButton.addEventListener('click', () => {
    for (i=0; i<5; i++){
      if (Math.random() < 0.5) {
        catchedPokemons.push(generatedPokemons[i]);
      }
    }
    removeElements();
    generatePokemon(jsonData);
    generatePokemon(jsonData);
    generatePokemon(jsonData);
    generatePokemon(jsonData);
    generatePokemon(jsonData);
    console.log(catchedPokemons);
})

// input name //
let input = document.querySelector('input');
input.addEventListener('input', resizeInput); 
resizeInput.call(input);

function resizeInput() {
  this.style.width = this.value.length + "ch";
}
