(function () {
  var el = document.getElementById('kontakt-map');
  if (!el || typeof L === 'undefined') return;

  var coords = [47.5674193, 9.1077893];

  var map = L.map(el, {
    scrollWheelZoom: false
  }).setView(coords, 16);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19
  }).addTo(map);

  var marker = L.circleMarker(coords, {
    radius: 7,
    color: '#fff',
    weight: 2,
    fillColor: '#b31a25',
    fillOpacity: 1
  }).addTo(map);

  marker.bindTooltip('Cityhaus', {
    permanent: true,
    direction: 'right',
    offset: [10, 0],
    className: 'cityhaus-map-label'
  }).openTooltip();
})();
