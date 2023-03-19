// Define the list of core values
const coreValues = [
    "Achievement",
    "Adventure",
    "Authenticity",
    "Balance",
    "Community",
    "Compassion",
    "Creativity",
    "Curiosity",
    "Education",
    "Empathy",
    "Family",
    "Friendship",
    "Fun",
    "Gratitude",
    "Growth",
    "Happiness",
    "Health",
    "Humility",
    "Independence",
    "Innovation",
    "Integrity",
    "Justice",
    "Kindness",
    "Knowledge",
    "Leadership",
    "Learning",
    "Love",
    "Openness",
    "Optimism",
    "Passion",
    "Peace",
    "Perseverance",
    "Quality",
    "Respect",
    "Responsibility",
    "Security",
    "Self-care",
    "Self-improvement",
    "Service",
    "Simplicity",
    "Stability",
    "Success",
    "Sustainability",
    "Teamwork",
    "Trust",
    "Understanding",
    "Wealth",
    "Wisdom",
  ];
  
  // Get the DOM elements
  const startButton = document.getElementById("start-button");
  const valuesContainer = document.getElementById("values-container");
  const nextButton = document.getElementById("next-button");
  const backButton = document.getElementById("back-button");
  const finishButton = document.getElementById("finish-button");
  const selectedValuesContainer = document.getElementById("selected-values-container");
  const messageContainer = document.getElementById("message-container");
  
  // Define variables to store the selected values
  let selectedValues = [];
  let selectedCount = 0;
  
  // Function to create the bubbles
  function createBubble(value) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.innerText = value;
    bubble.addEventListener("click", () => {
      if (bubble.classList.contains("selected")) {
        bubble.classList.remove("selected");
        selectedCount--;
        updateMessage();
        if (selectedCount === 14) {
          finishButton.classList.add("hidden");
        }
        if (selectedCount < 10) {
          nextButton.classList.add("hidden");
        }
      } else {
        if (selectedCount < 5) {
          bubble.classList.add("selected");
          selectedCount++;
          updateMessage();
          if (selectedCount === 15) {
            finishButton.classList.remove("hidden");
          }
          if (selectedCount > 9) {
            nextButton.classList.remove("hidden");
          }
        }
      }
    });
    return bubble;
  }
  
  // Function to update the message
  function updateMessage() {
    let message;
    if (selectedCount === 0) {
      message = "Please select your top 15 values from the list below:";
    } else if (selectedCount < 5) {
      message = `You have selected ${selectedCount} values. Please select ${5 - selectedCount} more.`;
    } else if (selectedCount < 10) {
      message = `You have selected ${selectedCount} values. Please select ${10 - selectedCount} more.`;
    } else if (selectedCount < 15) {
      message = `You have selected ${selectedCount} values. Please select ${15 - selectedCount} more.`;
    } else {
      message = "Congratulations! You have selected your top 15 values.";
    }
    messageContainer.innerText = message;
  }
  
  // Function to show the values
function showValues(start, end) {
    valuesContainer.innerHTML = "";
    for (let i = start; i < end; i++) {
    const bubble = createBubble(coreValues[i]);
    valuesContainer.appendChild(bubble);
    }
    }
    
    // Event listener for the start button
    startButton.addEventListener("click", () => {
    startButton.classList.add("hidden");
    showValues(0, 10);
    nextButton.classList.remove("hidden");
    backButton.classList.remove("hidden");
    messageContainer.classList.remove("hidden");
    updateMessage();
    });
    
    // Event listener for the next button
    nextButton.addEventListener("click", () => {
    const start = parseInt(nextButton.dataset.start);
    const end = parseInt(nextButton.dataset.end);
    showValues(end, end + 10);
    backButton.dataset.start = start;
    backButton.dataset.end = end;
    nextButton.dataset.start = end;
    nextButton.dataset.end = end + 10;
    });
    
    // Event listener for the back button
    backButton.addEventListener("click", () => {
    const start = parseInt(backButton.dataset.start);
    const end = parseInt(backButton.dataset.end);
    showValues(start - 10, start);
    backButton.dataset.start = start - 10;
    backButton.dataset.end = start;
    nextButton.dataset.start = start;
    nextButton.dataset.end = end;
    });
    
    // Event listener for the finish button
    finishButton.addEventListener("click", () => {
    selectedValues = [];
    selectedCount = 0;
    const bubbles = document.querySelectorAll(".bubble.selected");
    bubbles.forEach((bubble) => {
    selectedValues.push(bubble.innerText);
    });
    valuesContainer.classList.add("hidden");
    selectedValuesContainer.classList.remove("hidden");
    messageContainer.classList.add("hidden");
    selectedValuesContainer.innerHTML = "";
    selectedValues.forEach((value) => {
    const bubble = createBubble(value);
    selectedValuesContainer.appendChild(bubble);
    });
    });
    
    // Event listener for the restart button
    document.getElementById("restart-button").addEventListener("click", () => {
    startButton.classList.remove("hidden");
    valuesContainer.classList.remove("hidden");
    nextButton.classList.add("hidden");
    backButton.classList.add("hidden");
    selectedValuesContainer.classList.add("hidden");
    messageContainer.classList.add("hidden");
    selectedValuesContainer.innerHTML = "";
    selectedValues = [];
    selectedCount = 0;
    showValues(0, 10);
    });
    
    // Show the initial values
    showValues(0, 10);
    backButton.classList.add("hidden");
    updateMessage();