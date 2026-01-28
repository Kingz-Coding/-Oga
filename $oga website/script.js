// Toggle sidebar on mobile
const toggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

toggle.addEventListener("click", (e) => {
  e.stopPropagation(); 
  sidebar.classList.toggle("active");
});


document.addEventListener("click", (e) => {
  if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && e.target !== toggle) {
    sidebar.classList.remove("active");
  }
});

// Copy Contract Address
const copyBtn = document.querySelector(".copy-btn");
const contractAddress = "0x1234567890abcdef1234567890abcdef12345678"; // replace with real CA

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(contractAddress).then(() => {
    copyBtn.textContent = "Copied!";
    copyBtn.classList.add("copied");

    setTimeout(() => {
      copyBtn.textContent = "Copy CA";
      copyBtn.classList.remove("copied");
    }, 2000);
  });
});
const track = document.getElementById("slider-track");
const slider = document.getElementById("slider");

// Clone children for infinite loop
const clone = track.innerHTML;
track.innerHTML += clone;

let pos = 0;
let speed = 1; // scroll speed
let isDragging = false;
let startX, scrollLeft;

// Auto-scroll loop
function animate() {
  if (!isDragging) {
    pos -= speed;
    if (Math.abs(pos) >= track.scrollWidth / 2) {
      pos = 0; // reset seamlessly
    }
    track.style.transform = `translateX(${pos}px)`;
  }
  requestAnimationFrame(animate);
}
animate();

// Drag / Touch support
slider.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = pos;
});

slider.addEventListener("mouseleave", () => (isDragging = false));
slider.addEventListener("mouseup", () => (isDragging = false));

slider.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX;
  pos = scrollLeft + walk;
  track.style.transform = `translateX(${pos}px)`;
});

// Touch events for mobile
slider.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = pos;
});

slider.addEventListener("touchend", () => (isDragging = false));

slider.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = x - startX;
  pos = scrollLeft + walk;
  track.style.transform = `translateX(${pos}px)`;
});


