// src/utils/constants.js

export const API_BASE_URL = 'https://www.swapi.tech/api';

export const ENTITY_TYPES = {
  PEOPLE: 'people',
  VEHICLES: 'vehicles',
  PLANETS: 'planets'
};

export const VIEW_TYPES = {
  HOME: 'home',
  CHARACTERS: 'characters',
  VEHICLES: 'vehicles',
  PLANETS: 'planets',
  FAVORITES: 'favorites',
  DETAILS: 'details'
};

export const STORAGE_KEYS = {
  FAVORITES: 'starWarsFavorites'
};

export const ENTITY_LABELS = {
  [ENTITY_TYPES.PEOPLE]: 'Personajes',
  [ENTITY_TYPES.VEHICLES]: 'Vehículos',
  [ENTITY_TYPES.PLANETS]: 'Planetas'
};

export const ENTITY_DESCRIPTIONS = {
  [ENTITY_TYPES.PEOPLE]: 'Personaje del universo Star Wars con historia única y características especiales.',
  [ENTITY_TYPES.VEHICLES]: 'Vehículo utilizado en la galaxia para transporte y combate.',
  [ENTITY_TYPES.PLANETS]: 'Planeta del sistema Star Wars con características únicas.'
};

export const ENTITY_ICONS = {
  [ENTITY_TYPES.PEOPLE]: 'fas fa-user',
  [ENTITY_TYPES.VEHICLES]: 'fas fa-rocket',
  [ENTITY_TYPES.PLANETS]: 'fas fa-globe'
};

export const ERROR_MESSAGES = {
  GENERIC: 'Ha ocurrido un error inesperado',
  NETWORK: 'Error de conexión. Verifica tu conexión a internet.',
  NOT_FOUND: 'No se encontró el recurso solicitado',
  LOADING: 'Error al cargar los datos'
};

export const SUCCESS_MESSAGES = {
  FAVORITE_ADDED: 'Agregado a favoritos',
  FAVORITE_REMOVED: 'Eliminado de favoritos'
};

// URLs de imágenes
export const IMAGE_URLS = {
  [ENTITY_TYPES.PEOPLE]: (uid) => `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`, 
  [ENTITY_TYPES.VEHICLES]: (uid) => `https://starwars-visualguide.com/assets/img/vehicles/${uid}.jpg`, 
  [ENTITY_TYPES.PLANETS]: (uid) => `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`, 
  PLACEHOLDER: 'https://via.placeholder.com/400x300?text=Star+Wars', 
  NO_IMAGE: 'https://via.placeholder.com/400x300?text=No+Image'
};