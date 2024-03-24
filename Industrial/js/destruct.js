let lastScrollTop = 0;

window.addEventListener(
  "scroll",
  function () {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    let elements = document.body.getElementsByTagName("*");

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

// Define the CSS for the melting animation
var style = document.createElement('style');
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

// Function to add 'melting' class to all text nodes
function meltText() {
  var elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, a, span'); // Add more selectors as needed
  elements.forEach(function(element) {
    element.classList.add('melting');
  });
}

// Add event listener to the page
document.addEventListener('click', meltText);
