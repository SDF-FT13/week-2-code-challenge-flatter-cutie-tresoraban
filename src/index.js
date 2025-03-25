document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const votesForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("vote-input");
    const resetVotesButton = document.getElementById("reset-votes");
    const characterForm = document.getElementById("character-form");
    const characterNameInput = document.getElementById("character-name");
    const characterImageInput = document.getElementById("character-image");
  
    const baseUrl = "http://localhost:3000";
  
    // Correct the fetch request with template literals
    fetch(`${baseUrl}/characters`)
      .then((response) => response.json())
      .then((characters) => {
        characters.forEach((character) => {
          createCharacterSpan(character);
        });
      })
      .catch((error) => console.error("Error fetching characters:", error));
  
    function createCharacterSpan(character) {
      const span = document.createElement("span");
      span.textContent = character.name;
      span.classList.add("character-name");
  
      span.addEventListener("click", () => showCharacterDetails(character));
  
      characterBar.appendChild(span);
    }
  
    function showCharacterDetails(character) {
      detailedInfo.innerHTML = "";
  
      const name = document.createElement("h2");
      name.textContent = character.name;
      const image = document.createElement("img");
      image.src = character.image;
      image.alt = character.name;
      image.width = 200;
      const votes = document.createElement("p");
      // Correct the template literal for the votes text
      votes.textContent = `Votes: ${character.votes}`;
  
      detailedInfo.appendChild(name);
      detailedInfo.appendChild(image);
      detailedInfo.appendChild(votes);
  
      votesForm.dataset.characterId = character.id;
      votesForm.dataset.characterVotes = character.votes;
    }
  
    votesForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const characterId = votesForm.dataset.characterId;
      let currentVotes = parseInt(votesForm.dataset.characterVotes, 10);
      const addedVotes = parseInt(voteInput.value, 10);
  
      if (isNaN(addedVotes) || addedVotes < 0) {
        alert("Please enter a valid number of votes.");
        return;
      }
  
      currentVotes += addedVotes;
  
      const votesDisplay = detailedInfo.querySelector("p");
      // Correct the template literal for updating votes text
      votesDisplay.textContent = `Votes: ${currentVotes}`;
  
      votesForm.dataset.characterVotes = currentVotes;
  
      voteInput.value = ""; // Clear the input field
    });
  
    // Check if the resetVotesButton exists before adding event listener
    if (resetVotesButton) {
      resetVotesButton.addEventListener("click", () => {
        const characterId = votesForm.dataset.characterId;
        const votesDisplay = detailedInfo.querySelector("p");
  
        votesDisplay.textContent = "Votes: 0";
  
        votesForm.dataset.characterVotes = 0;
      });
    }
  
    characterForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const name = characterNameInput.value;
      const image = characterImageInput.value;
  
      if (!name || !image) {
        alert("Please provide a name and image URL for the new character.");
        return;
      }
  
      const newCharacter = {
        name,
        image,
        votes: 0,
      };
  
      createCharacterSpan(newCharacter);
  
      showCharacterDetails(newCharacter);
  
      characterForm.reset();
    });
  });
  