async function fetchPokemon() {

  const input = document.getElementById("input");

  if (input.value === "") { 
    displayChoosePoke();
    return;
 }
  else { 
    try {
        const pokeAPI = `https://pokeapi.co/api/v2/pokemon/${input.value.trim()}`;
        const response = await fetch(pokeAPI);
        const pokeInfo = await response.json();
        let typeString =``;
        for (let item of pokeInfo.types) {
            const response = await fetch(item.type.url);
            const pokeType = await response.json();
            typeString += `<img class="poke-type" src=${pokeType.sprites['generation-iii']['firered-leafgreen']['name_icon']} alt="type icon">`;
        }
        displayPokemon(pokeInfo, typeString);
    } catch (err) {
        displayError();
    }
  }
}

function displayPokemon(pokeInfo, type) {

    const pokeName = pokeInfo.name.charAt(0).toUpperCase() + pokeInfo.name.slice(1, pokeInfo.name.length);
    const pokeImageURL = pokeInfo.sprites.front_default;

    const info = document.getElementById("poke-card");
    info.innerHTML = `<p class="poke-name">${pokeName}</p><div class="image-container"><img class="poke-photo" src=${pokeImageURL} alt="It's Bulbasaur!"></div>${type}`;
}

function displayChoosePoke() {
    const info = document.getElementById("poke-card");
    info.innerHTML = `<p class="error">Please enter a Pokemon!</p>`;
}

function displayError() {
    const info = document.getElementById("poke-card");
    info.innerHTML = `<p class="error">C'mon...that's not a Pokemon!</p>`;
}

const button = document.getElementById("button");
button.addEventListener("click", fetchPokemon);
