
# PokeAPI Project

---
---

## For this project, I created a page that fetches Pokemon objects from the [PokeAPI](https://pokeapi.co/) and displays the name, sprite and type of Pokemon.

---
---

## TABLE OF CONTENTS

1. [Input](#1-input)

2. [Javascript Functions](#2-javascript-functions)

   - [fetchPokemon()](#fetchpokemon)
   - [displayPokemon()](#displaypokemon)
   - [displayChoosePoke()](#displaychoosepoke)
   - [displayError()](#displayerror)

3. [Home](#3-home)

---
---

## 1. Input

Upon loading the page, there is a main container that holds the "input container" which has a text input to write the name or id of the Pokemon. It also has a label saying "Choose your Pokemon" and a button (naturally, I called it, "I choose you!") to actually retrieve the Pokemon indicated in the text input. I have a placeholder in the text field that lets the user know it receives a name or id.

---
---

## 2. Javascript Functions

### fetchPokemon()

Where all the magic happens! This is an async function that fetches data from the PokeAPI and sends it to the appropriate functions to be displayed on the page. I'll walk through each bit of code:

```js
const input = document.getElementById("input");
```

this creates the reference to the text input that holds the name or id entered by the user.

```js
if (input.value === "") {
      displayChoosePoke();
      return;
    }
```

First, the function checks if the input actually contains a name or id, and if not, it executes the [displayChoosePoke()](#displaychoosepoke) functions, which prompts the user to enter an actual Pokemon.

```js
else {
      try {
        const pokeAPI = `https://pokeapi.co/api/v2/pokemon/${input.value.trim()}`;
        const response = await fetch(pokeAPI);
        const pokeInfo = await response.json();
```

The pokeAPI variable holds the URL to be fetched, which is completed by adding in the pokemon name or id entered by the user (trimmed to ensure no white space is included). The function waits for the promise to resolve and return the info from the API as a Response. That response is then parsed to a JSON object --pokeInfo-- that can be used later.

```js
for (const item of pokeInfo.types) {
          const response = await fetch(item.type.url);
          const pokeType = await response.json();
```

In order to retrieve the types, I created this for...of loop because not every Pokemon has the same number of types. The first "types" is an array containing a "type" object that contains the "name" key and "url" key for the type. I didn't use the name here because the image contained within the object from the URL has the name in it. Same as above, the function waits for the promise to resolve and return the response, which is then parsed to a useable JSON object stored in pokeType.

```js
          let typeString = ``;



          let typeFound = false;
          
          for (const generation in pokeType.sprites) {
            const genObj = pokeType.sprites[generation];
            for (const color in genObj) {
              if (genObj[color]["name_icon"] !== null) {
                typeString += `<img class="poke-type" src=${genObj[color]["name_icon"]} alt="type icon">`;
                typeFound = true;
                break;
              }
            }
            if (typeFound) break;
          }
        }
```

Unfortunately, not all the Pokemon included type sprites for every generation (of course not LOL), so enter this nested for...in loop action. First, I initialized a template string --typeString-- to '' which will be used to add a new img with the src set to the name_icon URL...one that is NOT "null." Next, I initialized a boolean variable --typeFound-- to "false" to be used to check if a valid type has been found. The nested for loops dive into the "sprites" key, the "generation-*" key, and look at each color (I just called the next keys color...I know colosseum is not a color lol) to find a valid "name_icon". If the "name_icon" does not hold "null" as a value, the typeString is updated to include an `<img>` with the "name_icon" url found at that moment. When this happens, the typeFound is updated to true, the inner loop breaks, the if statement of the outer loop becomes true and then breaks that loop as well. This ensures only one image from the type is used.

```js
displayPokemon(pokeInfo, typeString);
      } catch (err) {
        displayError();
      }
    }
  }
```

Now the pokeInfo object and typeString template strings can be passed to the displayPokemon() to handle the actual html element creation with the relevant data from the API. The `try` block is done, and the `catch` block simply makes any error execute the [displayError()](#displayerror) function.

### displayPokemon()

This function is passed two arguments, the JSON containing the info generated from the first API fetch, and the template string that contains type info for the Pokemon generated from the second API fetch.

```js
function displayPokemon(pokeInfo, type) {
  const pokeName =
    pokeInfo.name.charAt(0).toUpperCase() +
    pokeInfo.name.slice(1, pokeInfo.name.length);
  const pokeImageURL = pokeInfo.sprites.front_default;
```

A new string is created using the "name" from the pokeInfo object. The string just capitalizes the first letter since the name value is all lowercase. I thought this looked better. The image URL is contained as a value in the "front-default" name, under the "sprites" key of the pokeInfo object. I set the pokeImageURL to that value.

```js
const info = document.getElementById("poke-card");
  info.innerHTML = `<p class="poke-name">${pokeName}</p><div class="image-container"><img class="poke-photo" src=${pokeImageURL} alt="It's a Pokemon!"></div>${type}`;
```

I create a reference to the main "poke-card" div called "info" and set the content to a template string which creates a `<p>` containing the name of the Pokemon and an `<img>` containing the image of the Pokemon using the variable created above.

### displayChoosePoke()

This function is called when the user doesn't enter anything in the text input and presses the "I choose you!" button.

```js
function displayChoosePoke() {
  const info = document.getElementById("poke-card");
  info.innerHTML = `<p class="error">Please enter a Pokemon!</p>`;
}
```

Gets a reference to the "poke-card" div and sets the content to a `<p>` containing the phrase "Please enter a Pokemon!"

### displayError()

Executed when a Pokemon is not able to be retrieved either by an error or incorrect name/id entered in

```js
function displayError() {
  const info = document.getElementById("poke-card");
  info.innerHTML = `<p class="error">C'mon...that's not a Pokemon!</p>`;
}
```

Sets the content in the "poke-card" div to the error, "C'mon...that's not a Pokemon!" (...well, I thought it was funny lol)

### addEventListener

```js
const button = document.getElementById("button");
button.addEventListener("click", fetchPokemon);
```

referenced the button to be pressed to start all this magic and added an event listener to it. Upon clicking, the script executes [fetchPokemon()](#fetchpokemon)

---
---


## 4. Miscellaneous

I did some decent CSS styling to make the page look interesting and the Pokemon to be displayed on a "card". I made the sprite of the image larger and also put in into a container to mask off some of the excess white space taking up the png file. The button has a hover effect added and active effect added just to make it fun to press. All of the containers and inputs have border-radius set to them to make the page look fun and friendly. The background is a linear gradient with blue hue. Since the sprites were pixel art, I wanted the page to have a sort of video game feel. The UI was created with this in mind.

During this project I learned about this:

```css
::placeholder {
    color: rgba(255, 255, 255, 0.5);
}
```

Changing the font of the placeholder text! It looked very dark and I found this great solution.

---

[back to top](#pokeapi-project)
