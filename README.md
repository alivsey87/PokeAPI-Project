
# PokeAPI Project

---
---

## For this project, I created a page that fetches Pokemon objects from the [PokeAPI](https://pokeapi.co/) and displays the name, sprite and type of Pokemon.

---
---

## TABLE OF CONTENTS

1. [Input](#1-input)

2. [Navigation Bar](#2-navigation-bar)

3. [Home](#3-home)

4. [What's New](#4-whats-new)

5. [Deals](#5-deals)

6. [Prices](#6-prices)

7. [Subscribe](#7-subscribe)

8. [Footer](#8-footer)

9. [Style Choices/Bootstrap Components](#9-style-choicesbootstrap-components)

10. [Javascript Functions](#10-javascript-functions)

---
---

## 1. Input

Upon loading the page, there is a main container that holds the "input container" which has a text input to write the name or id of the Pokemon. It also has a label saying "Choose your Pokemon" and a button to actually retrieve the Pokemon indicated in the text input. I have a placeholder that lets the user know it receives a name or id.

---
---

## 2. Javascript Functions

- fetchPokemon()

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

First, the function checks if the input actually contains a name or id, and if not, it executes the [displayChoosePoke()] functions, which prompts the user to enter an actual Pokemon.

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

Now the pokeInfo object and typeString template strings can be passed to the displayPokemon() to handle the actual html element creation with the relevant data from the API. The `try` block is done, and the `catch` block simply makes any error execute the [displayError()] function.

- displayPokemon()

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
  info.innerHTML = `<p class="poke-name">${pokeName}</p><div class="image-container"><img class="poke-photo" src=${pokeImageURL} alt="It's Bulbasaur!"></div>${type}`;
```

I create a reference to the main "poke-card" div called "info" and set the content to a template string which creates a `<p>` containing the name of the Pokemon and an `<img>` containing the image of the Pokemon using the variable created above.

---
---

## 3. Home

For the landing page/home, I used the apple.com layout and created a couple hero sections that advertise the "featured" products. I added a subtle animation to the first hero image just for a cool effect to emphasize the blue "glow" of the speaker:

```css
animation: blue-glow 4s infinite;
```

```css
@keyframes blue-glow {
    0% {
        filter:brightness(1) contrast(1) saturate(1);
    }
    50% {
        filter:brightness(1.8) contrast(1.2) saturate(1.2);
    }
    0% {
        filter:brightness(1) contrast(1) saturate(1);
    }
}
```

Again, using plenty of Bootstrap to handle the responsiveness and structure of the hero sections. I used some z-index and positioning to keep the images in the back and have the headers and buttons stack on top.

---
---

## 4. WHAT'S NEW

This section is styled after the section on apple.com with the grid-style deals and announcements. I used a good amount of CSS styling to get the pictures to align correctly, the text to appear appropriately and (along with Bootstrap) create the gaps similar to those used on the apple.com site.

---
---

## 5. DEALS

I used the carousel Bootstrap Component here to present a slideshow of "deals" offered. I had to do a lot of custom CSS styling here to not only get the pictures lined up correctly, but also keep them as responsive as I could (not totally happy with how it came out, but it does the job).

---
---

## 6. PRICES

I used a simple Bootstrap table here to include a list of products, including their description and prices.

---
---

## 7. SUBSCRIBE

I created a basic form using Bootstrap for users to subscribe to marketing emails. All that is required is a user's first name, last name and email address. Basic validation.

---
---

## 8. FOOTER

I added a basic footer with a bit of CSS styling for a box shadow and the name/copyright as a link back to the home section.

---
---

## 9. STYLE CHOICES/BOOTSTRAP COMPONENTS

The buttons on the apple.com were very easy to imitate as they look like Bootstrap buttons! For the most part, the styling of the buttons follow:

```html
<a href="#" class="btn btn-primary rounded-pill">
```

To replicate the gap/gutter styling, I set many of the sections with the `mt-3` Bootstrap class and used this for the main content gaps:

```html
<div class="row gx-1 gy-4">
  ```

I used the "Strawberry" logo next to header text to replicate the way Apple did it for a few of their items. I achieved this with mostly Bootstrap:

```html
<div class="container-fluid d-flex justify-content-center align-items-center">
        <img id="hero-two-logo" class="d-inline" src="static/s-logo-white.png" alt="hero 2 header logo">
        <h2 class="d-inline pt-1 ms-1 mb-0">TECH</h2>
</div>
```

I used the following Bootstrap Components:

- Buttons
- Carousel
- Collapse
- Navbar
- Scrollspy

All images were downloaded from [UnSplash](https://unsplash.com)!

---
---

## 10. JavaScript Functions

I created functions that handle subscribing and the cart. I set an array for the subscriber list and an array for the items in the cart:

- Add to sub list

```js
const addToSubList = (email) => {
  if (hasSubscribed(email)) console.log("You already subscribed!");
  else subList.push(email);
};
```

This function would take the email provided in the email input as an argument and add it to the `subList` array.

- Has subscribed

```js
const hasSubscribed = (email) => {
  if (subList.includes(email)) return true;
  else return false;
};
```

This function is at work in adding a new subscriber, first checking if the email passed as an argument exists in the `subList` or not.

- Unsubscribe

```js
const unSubscribe = (email) => {
  if (subList.indexOf(email) !== -1) subList.splice(subList.indexOf(email), 1);
  else console.log("You are not subscribed!");
};
```

This function removes an email passed as an argument from the `subList` array. Would have to figure out another function that provides the email from a user clicking some kind of "Unsubscribe" button.

- Add to cart

```js
const addToCart = (item) => {
  cart.push(item.price);
};
```

This function takes the "price" key from an item object passes as an argument (when customer clicks a button to buy) and adds it to the `cart` array.

- Remove item from cart

```js
const removeFromCart = (item) => {
    cart.splice(cart.indexOf(item), 1)
};
```

Removes price of item passed as argument (from customer clicking some kind of "delete" button associated with item) from `cart` array.

- Get total price of cart items

```js
const getTotalPrice = () => {
  let price = 0;
  for (const item of cart) {
    price += item.price;
  }
  return price;
};
```

Returns sum of price of all items in `cart` array.

---

[back to top](#frameworks--intro-to-js-project-strawberrycom)
