const form = document.getElementById('wishForm');
const mapContainer = document.getElementById('mapContainer');
const worldMap = document.getElementById('worldMap');

let targetX = null;
let targetY = null;

// 1. Nutzer klickt auf die Karte → Ziel speichern
worldMap.addEventListener('click', (e) => {
  const rect = worldMap.getBoundingClientRect();
  targetX = e.clientX - rect.left;
  targetY = e.clientY - rect.top;

  // Optional: kleines Marker-Kreuz setzen
  let marker = document.getElementById('marker');
  if (!marker) {
    marker = document.createElement('div');
    marker.id = 'marker';
    marker.textContent = '✚';
    marker.style.position = 'absolute';
    marker.style.color = 'red';
    marker.style.fontSize = '20px';
    mapContainer.appendChild(marker);
  }
  marker.style.left = targetX + 'px';
  marker.style.top = targetY + 'px';
});

// 2. Wenn Formular abgeschickt → Taube fliegt los
form.addEventListener('submit', function(e){
  e.preventDefault();
  
  const wish = document.getElementById('wishInput').value;

  if (targetX === null || targetY === null) {
    alert("Bitte zuerst auf die Weltkarte klicken!");
    return;
  }

  // Taube erstellen
  const dove = document.createElement('div');
  dove.className = 'dove';
  dove.textContent = '🕊️';
  dove.style.left = '50%';
  dove.style.top = '90%'; // Start unten
  mapContainer.appendChild(dove);

  // Animation
  gsap.to(dove, {
    duration: 3,
    left: targetX + 'px',
    top: targetY + 'px',
    ease: "power1.inOut",
    onComplete: () => {
      // Wunschtext einblenden
      const wishDiv = document.createElement('div');
      wishDiv.className = 'wish';
      wishDiv.style.left = targetX + 'px';
      wishDiv.style.top = targetY + 'px';
      wishDiv.textContent = wish;
      mapContainer.appendChild(wishDiv);
    }
  });

  form.reset();
});
