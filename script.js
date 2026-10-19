const cars = [
  { year: "1970", name: "Alfa ROmeo GT Junior", image: "assets/car-01.jpg", description: "A beautifully proportioned grand tourer, admired for its elegant coachwork and restrained sporting character." },
  { year: "1972", name: "Alfa Romeo Montreal", image: "assets/car-02.jpg", description: "A distinctive V8-era Alfa Romeo with unmistakable details and a cockpit built around the driver." },
  { year: "1967", name: "Fiat Dino Spider", image: "assets/car-03.jpg", description: "An open Italian classic with crisp Pininfarina lines and an evocative period feel." },
  { year: "1974", name: "Lancia Fulvia Coupé", image: "assets/car-04.jpg", description: "A compact coupé with rally heritage, delicate proportions and a character all its own." },
  { year: "1969", name: "Maserati Ghibli", image: "assets/car-05.jpg", description: "A long, low grand tourer with dramatic lines and a distinctly Italian sense of occasion." },
  { year: "1987", name: "Ferrari Testarossa", image: "assets/car-06.jpg", description: "An unmistakable eighties icon, defined by its wide stance and signature side strakes." },
  { year: "1971", name: "Alfa Romeo Spider", image: "assets/car-07.jpg", description: "A classic open-top Alfa made for winding roads, with timeless lines and a lively spirit." },
  { year: "1965", name: "Lamborghini 350 GT", image: "assets/car-08.jpg", description: "An early Lamborghini grand tourer with understated elegance and a landmark place in the marque's story." },
  { year: "1976", name: "Fiat 124 Spider", image: "assets/car-09.jpg", description: "A light, approachable roadster with elegant lines and an enduring connection to open-air motoring." },
  { year: "1962", name: "Lancia Flaminia Coupé", image: "assets/car-10.jpg", description: "A refined Italian coupé with thoughtful detailing and a quietly formal presence." },
  { year: "1973", name: "De Tomaso Pantera", image: "assets/car-11.jpg", description: "A muscular Italian-American sports car with purposeful proportions and a memorable profile." },
  { year: "1984", name: "Ferrari 308 GTB", image: "assets/car-12.jpg", description: "A compact mid-engined Ferrari that captures the balance and style of its era." }
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
