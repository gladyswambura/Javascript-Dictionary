const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  synonyms = wrapper.querySelector(".synonym .list"),
  volume = wrapper.querySelector(".word i"),
  removeIcon = wrapper.querySelector(".search span"),
  infoText = wrapper.querySelector(".info-text");
let audio;

// fetch api function
function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => myWords(result, word));
}

searchInput.addEventListener("keyup", (event) => {
  // console.log(event)
  // checks if the handler event equals enter and outputs in the console
  if (event.key === "Enter" && event.target.value) {
    fetchApi(event.target.value)
  }
  // console.log(event.target.value)

})


removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  wrapper.classList.remove("active");
  // infoText.style.color("black");
  infoText.innerHTML = `Type any existing word and press enter to get meaning, example,
  synonyms, etc.`
})

const myWords = (result, word) => {
  // console.log(result)
  if (result.title) {
    infoText.innerHTML = `ouch! The word :${word}&nbsp cannot be found here`;
  } else {
    wrapper.classList.add("active");

    let definitions = result[0].meanings[0].definitions[0];
    console.log(definitions)
    phonetics = `commonly pronounced as: ${result[0].phonetics[0].text}`
    // synonyms = `${result[0].synonyms}`;

    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phonetics;
    document.querySelector(".meaning span").innerText = definitions.definition;
    document.querySelector(".example span").innerText = definitions.example ?? 'No examples here';
    document.querySelector(".synonym span").innerText= synonyms.synonyms;
    document.querySelector(".synonym span").innerText = definitions.synonyms ?? 'No synonyms here';
    // document.querySelector(".synonym span").innerText = synonyms ?? `No synonym for ${word}`
  }
}