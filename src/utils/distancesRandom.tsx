export function generateNearbyCoordinates(userLocation: { latitude: number; longitude: number; }, minDistance = 100, maxDistance = 800) {
  const earthRadius = 6371000; // Raio da Terra em metros
  const { latitude, longitude } = userLocation;

  // Converte latitude e longitude para radianos
  const latInRad = latitude * (Math.PI / 180);
  const lngInRad = longitude * (Math.PI / 180);

  // Gera uma distância aleatória entre minDistance e maxDistance
  const randomDistance = Math.random() * (maxDistance - minDistance) + minDistance;

  // Gera um ângulo aleatório em radianos
  const randomAngle = Math.random() * 2 * Math.PI;

  // Calcula o deslocamento em latitude e longitude
  const deltaLat = randomDistance * Math.cos(randomAngle) / earthRadius;
  const deltaLng = randomDistance * Math.sin(randomAngle) / (earthRadius * Math.cos(latInRad));

  // Converte de radianos para graus e calcula as novas coordenadas
  const newLatitude = latitude + (deltaLat * (180 / Math.PI));
  const newLongitude = longitude + (deltaLng * (180 / Math.PI));

  return { latitude: newLatitude, longitude: newLongitude };
}

// Exemplo de uso:
const userLocation = { latitude: -23.53013050773563, longitude: -46.73149246440858 };
const nearbyLocation = generateNearbyCoordinates(userLocation);
console.log(nearbyLocation);