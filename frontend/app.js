const map = L.map("map").setView([14.5995, 120.9842], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Load existing incidents
function loadIncidents() {
  fetch("http://127.0.0.1:8000/incidents")
    .then(res => res.json())
    .then(data => {
      data.forEach(i => {
        L.marker([i.latitude, i.longitude])
          .addTo(map)
          .bindPopup(`<b>${i.title}</b><br>Severity: ${i.severity}`);
      });
    });
}

loadIncidents();

// Click to add incident
map.on("click", function (e) {
  const title = prompt("Incident title:");
  if (!title) return;

  const severity = prompt("Severity (1-5):", "1");

  const incident = {
    title: title,
    latitude: e.latlng.lat,
    longitude: e.latlng.lng,
    severity: parseInt(severity)
  };

  fetch("http://127.0.0.1:8000/incidents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(incident)
  })
    .then(res => res.json())
    .then(data => {
      L.marker([data.latitude, data.longitude])
        .addTo(map)
        .bindPopup(`<b>${data.title}</b><br>Severity: ${data.severity}`)
        .openPopup();
    })
    .catch(err => console.error(err));
});
