// src/services/swapiService.js

const BASE_URL = 'https://www.swapi.tech/api';

// Función genérica para hacer fetch con mejor manejo de errores
const fetchData = async (url) => {
  try {
    console.log('Fetching from:', url); // Para debug
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Response data:', data); // Para debug
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}; 



// Obtener todos los personajes
export const fetchCharacters = async () => {
  try {
    const data = await fetchData(`${BASE_URL}/people`);
    // SWAPI.tech devuelve los datos en data.results
    return data.results || [];
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw new Error('No se pudieron cargar los personajes');
  }
};

// Obtener un personaje específico
export const fetchCharacterDetails = async (uid) => {
  try {
    const data = await fetchData(`${BASE_URL}/people/${uid}`);
    // SWAPI.tech devuelve los detalles en data.result
    return data.result || null;
  } catch (error) {
    console.error('Error fetching character details:', error);
    throw new Error('No se pudieron cargar los detalles del personaje');
  }
};

// Obtener todos los vehículos
export const fetchVehicles = async () => {
  try {
    const data = await fetchData(`${BASE_URL}/vehicles`);
    // SWAPI.tech devuelve los datos en data.results
    return data.results || [];
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw new Error('No se pudieron cargar los vehículos');
  }
};

// Obtener un vehículo específico
export const fetchVehicleDetails = async (uid) => {
  try {
    const data = await fetchData(`${BASE_URL}/vehicles/${uid}`);
    // SWAPI.tech devuelve los detalles en data.result
    return data.result || null;
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    throw new Error('No se pudieron cargar los detalles del vehículo');
  }
};

// Obtener todos los planetas
export const fetchPlanets = async () => {
  try {
    const data = await fetchData(`${BASE_URL}/planets`);
    // SWAPI.tech devuelve los datos en data.results
    return data.results || [];
  } catch (error) {
    console.error('Error fetching planets:', error);
    throw new Error('No se pudieron cargar los planetas');
  }
};

// Obtener un planeta específico
export const fetchPlanetDetails = async (uid) => {
  try {
    const data = await fetchData(`${BASE_URL}/planets/${uid}`);
    // SWAPI.tech devuelve los detalles en data.result
    return data.result || null;
  } catch (error) {
    console.error('Error fetching planet details:', error);
    throw new Error('No se pudieron cargar los detalles del planeta');
  }
};

// Función genérica para obtener detalles por tipo
export const fetchItemDetails = async (type, uid) => {
  try {
    switch (type) {
      case 'people':
        return await fetchCharacterDetails(uid);
      case 'vehicles':
        return await fetchVehicleDetails(uid);
      case 'planets':
        return await fetchPlanetDetails(uid);
      default:
        throw new Error(`Tipo desconocido: ${type}`);
    }
  } catch (error) {
    console.error('Error fetching item details:', error);
    throw error;
  }
};

// Función para obtener lista de items por tipo
export const fetchItemsByType = async (type) => {
  try {
    switch (type) {
      case 'people':
        return await fetchCharacters();
      case 'vehicles':
        return await fetchVehicles();
      case 'planets':
        return await fetchPlanets();
      default:
        throw new Error(`Tipo desconocido: ${type}`);
    }
  } catch (error) {
    console.error('Error fetching items by type:', error);
    throw error;
  }
};

// Función de prueba para verificar la conexión con la API
export const testAPIConnection = async () => {
  try {
    console.log('Testing API connection...');
    
    // Probar endpoint básico
    const testData = await fetchData(`${BASE_URL}/people/1`);
    console.log('API Connection successful!', testData);
    return true;
  } catch (error) {
    console.error('API Connection failed:', error);
    return false;
  }
};