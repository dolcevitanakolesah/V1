const cars = [
  { year: "1970", name: "Alfa Romeo GT Junior", image: "assets/car-01.jpg", description: "A beautifully proportioned grand tourer, admired for its elegant coachwork and restrained sporting character." },
  { year: "1991", name: "Ferrari Testarossa", image: "assets/car-02.jpg", description: "A distinctive V8-era Alfa Romeo with unmistakable details and a cockpit built around the driver." },
  { year: "1970", name: "Fiat 500L", image: "assets/car-03.jpg", description: "An open Italian classic with crisp Pininfarina lines and an evocative period feel." },
  { year: "1990", name: "Porsche 964", image: "assets/car-04.jpg", description: "A compact coupé with rally heritage, delicate proportions and a character all its own." },
  { year: "1962", name: "Autobianchi Bianchina Cabrio", image: "assets/car-05.jpg", description: "A long, low grand tourer with dramatic lines and a distinctly Italian sense of occasion." },
  { year: "1971", name: "Lancia Fulvia HF", image: "assets/car-05.jpg", description: "A long, low grand tourer with dramatic lines and a distinctly Italian sense of occasion." }
];

const detailViews = [
  "Front three-quarter exterior", "Rear three-quarter exterior", "Front view", "Rear view",
  "Side profile", "Dashboard and instruments", "Front seats and upholstery",
  "Rear cabin / interior trim", "Wheel and tyre detail", "Engine bay", "Boot / luggage area",
  "Chassis, underside or restoration detail"
];

const grid = document.getElementById("carGrid");
const dialog = document.getElementById("galleryDialog");
const galleryGrid = document.getElementById("galleryGrid");

function makeCard(car, index) {
  const card = document.createElement("article");
  card.className = "car-card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `View photographs of ${car.year} ${car.name}`);
  card.innerHTML = `
    <div class="car-image-wrap">
      <img class="car-image" src="${car.image}" alt="${car.year} ${car.name}" loading="${index < 3 ? "eager" : "lazy"}">
    </div>
    <p class="car-title">${car.year} ${car.name}</p>`;
  card.addEventListener("click", () => openGallery(car));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openGallery(car);
    }
  });
  return card;
}

function placeholder(label) {
  return `<div class="photo-placeholder" aria-label="Photo needed: ${label}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="1"></rect>
      <circle cx="8.5" cy="9" r="1.5"></circle>
      <path d="m4 17 5-5 3 3 3-4 5 6"></path>
    </svg>
    <span>${label}</span>
  </div>`;
}

function openGallery(car) {
  document.getElementById("galleryYear").textContent = "THE DETAILS";
  document.getElementById("galleryTitle").textContent = `${car.year} ${car.name}`;
  document.getElementById("galleryDescription").textContent = car.description;
  galleryGrid.innerHTML = "";
  detailViews.forEach((label, index) => {
    const figure = document.createElement("figure");
    figure.className = "gallery-item";
    // The package only includes one cover image per car. These labelled spaces are
    // ready for individual detail photographs to be added later.
    figure.innerHTML = `${placeholder(label)}<figcaption>${String(index + 1).padStart(2, "0")} / 12 · ${label}</figcaption>`;
    galleryGrid.appendChild(figure);
  });
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

document.getElementById("closeGallery").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
cars.forEach((car, index) => grid.appendChild(makeCard(car, index)));
