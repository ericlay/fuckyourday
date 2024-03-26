//--------------Flip the img tags when scrolling --------------------//

let lastScrollTop = 0;

window.addEventListener(
  "scroll",
  function () {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    let elements = document.body.getElementsByTagName("img");

    if (st > lastScrollTop) {
      // downscroll
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.transform = "scaleX(-1)";
      }
    } else {
      // upscroll
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.transform = "scaleX(1)";
      }
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  },
  false
);
//-------------------------------------------// Define the CSS for the melting animation
var style = document.createElement("style");
style.innerHTML = `
  @keyframes melt {
    0% { transform: translateY(0); }
    100% { transform: translateY(100px); opacity: 0; }
  }
  .melting {
    animation: melt 2s linear forwards;
  }
`;
document.head.appendChild(style);

// Initialize an array of text element types (tags) to rotate
var textElementTypes = [
  "p",
  "h1",
  "li",
  "h2",
  "span",
  "img",
  "h3",
  "a",
  "h4",
  "div",
  "h5",
  "h6", 
];

// Initialize a variable to keep track of the current text element type
var currentElementType = 0;

// Initialize a variable to keep track of the click count
var clickCountMelt = 0;

// Function to add 'melting' class to the specified text element type
function meltText() {
  var elements = document.querySelectorAll(
    textElementTypes[currentElementType]
  );
  elements.forEach(function (element) {
    element.classList.add("melting");
  });

  // Increment the click count
  clickCountMelt++;

  // Check if every 3rd click
  if (clickCountMelt % 3 === 0) {
    // Remove 'melting' class from all elements
    elements.forEach(function (element) {
      element.classList.remove("melting");
    });
  } else {
    // Increment the currentElementType and wrap around if needed
    currentElementType = (currentElementType + 1) % textElementTypes.length;
  }
}

// Add an event listener to the entire document
document.addEventListener("click", meltText);

//--------------------------------------------Load something on 7th click-----------//
// Initialize a counter for the number of clicks
let clickCountReload = 0;
// Define the maximum number of clicks required
const maxClicksReload = 5;
// Define the predefined link to load
const predefinedLink = "#";
// Function to handle the click event
function handleButtonClick() {
  clickCountReload++;
  // Check if the required number of clicks is reached
  if (clickCountReload >= maxClicksReload) {
    // Load the predefined link
    window.location.href = predefinedLink;
    // Remove the melting class from all elements
    elements.forEach(function (element) {
      element.classList.remove("melting");
    });
    // Reset the counter
    clickCountReload = 0;
  }
}
// Add an event listener to the entire document
document.addEventListener("click", handleButtonClick);
//----------------------------------------Changing Place holder texts ---------//
// Function to check if the user has scrolled to the bottom
function isScrolledToBottom() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollPosition = window.scrollY;

  // Consider a small buffer (e.g., 10 pixels) to account for minor discrepancies
  return scrollPosition + windowHeight >= documentHeight - 10;
}

// Function to replace the placeholder value of a textarea
function replacePlaceholderOnScroll() {
  const textarea = document.getElementById("message");
  const placeholderText = "Please help me. This is not fun.";

  if (isScrolledToBottom()) {
    textarea.placeholder = placeholderText;
  }
}

// Add an event listener to the window's scroll event
window.addEventListener("scroll", replacePlaceholderOnScroll);
