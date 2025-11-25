// src/services/swapiService.js

const BASE_URL = 'https://www.swapi.tech/api';

// Reintentos / backoff
const MAX_RETRIES = 3;
const RETRY_DELAY = 3000;

// Caching simple en memoria (clave = URL)
const cache = new Map();

// Delay util
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Límite de concurrencia para peticiones de detalles
const defaultConcurrency = 4;
const runWithConcurrency = async (tasks = [], concurrency = defaultConcurrency) => {
  const results = [];
  const executing = [];
  for (const task of tasks) {
    const p = Promise.resolve().then(() => task());
    results.push(p);

    executing.push(p);
    if (executing.length >= concurrency) {
      // espera al primero que termine
      await Promise.race(executing).catch(() => {});
      // limpiar los finalizados
      for (let i = executing.length - 1; i >= 0; i--) {
        if (executing[i].isFulfilled || executing[i].isRejected) executing.splice(i, 1);
      }
      // Nota: no dependemos de isFulfilled en promesas nativas; la limpieza está "best-effort".
      // Lo importante: limitar la cantidad de promesas en vuelo.
      // Alternativa más robusta: usar una librería p-limit.
    }
  }
  return Promise.allSettled(results);
};

// fetchData con retries y cache por URL
const fetchData = async (url, retries = 0) => {
  // Usa cache si existe
  if (cache.has(url)) {
    // console.debug('Cache hit:', url);
    return cache.get(url);
  }

  try {
    console.log('Fetching from:', url);
    const response = await fetch(url);

    if (response.status === 429) {
      if (retries < MAX_RETRIES) {
        console.warn(`429 received. Retry ${retries + 1}/${MAX_RETRIES} after ${RETRY_DELAY}ms - ${url}`);
        await delay(RETRY_DELAY);
        return fetchData(url, retries + 1);
      } else {
        throw new Error('Max retries exceeded (429).');
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText} - ${url}`);
    }

    const data = await response.json();
    // Cachear el resultado (puedes aplicar TTL si deseas)
    cache.set(url, data);
    console.log('Response data:', data);
    return data;
  } catch (err) {
    console.error('Error fetching data:', err, 'url:', url);
    throw err;
  }
};

/**
 * Si quieres traer *todas* las páginas de un endpoint paginado,
 * esta función las consulta secuencialmente (respetando paginación).
 */
const fetchAllPages = async (endpoint, page = 1, limit = 10) => {
  const accumulated = [];
  let next = `${BASE_URL}/${endpoint}?page=${page}&limit=${limit}`;
  while (next) {
    const data = await fetchData(next);
    if (data && data.results) {
      accumulated.push(...data.results);
      next = data.next || null;
      // Si la API devuelve next como URL absoluta, usarla; si no, construir.
    } else {
      break;
    }
    // Pequeña espera para no saturar
    await delay(100);
  }
  return accumulated;
};

// -> funciones públicas

export const fetchCharacters = async (allPages = false) => {
  try {
    if (allPages) {
      return await fetchAllPages('people');
    }
    const res = await fetchData(`${BASE_URL}/people`);
    return res.results || [];
  } catch (err) {
    console.error('Error fetching characters', err);
    throw err;
  }
};

export const fetchVehicles = async (allPages = false) => {
  try {
    if (allPages) {
      return await fetchAllPages('vehicles');
    }
    const res = await fetchData(`${BASE_URL}/vehicles`);
    return res.results || [];
  } catch (err) {
    console.error('Error fetching vehicles', err);
    throw err;
  }
};

export const fetchPlanets = async (allPages = false) => {
  try {
    if (allPages) {
      return await fetchAllPages('planets');
    }
    const res = await fetchData(`${BASE_URL}/planets`);
    return res.results || [];
  } catch (err) {
    console.error('Error fetching planets', err);
    throw err;
  }
};

// Detalles simples por UID
export const fetchCharacterDetails = async (uid) => {
  const url = `${BASE_URL}/people/${uid}`;
  const data = await fetchData(url);
  return data.result || null;
};
export const fetchVehicleDetails = async (uid) => {
  const url = `${BASE_URL}/vehicles/${uid}`;
  const data = await fetchData(url);
  return data.result || null;
};
export const fetchPlanetDetails = async (uid) => {
  const url = `${BASE_URL}/planets/${uid}`;
  const data = await fetchData(url);
  return data.result || null;
};

// Genérico
export const fetchItemDetails = async (type, uid) => {
  switch (type) {
    case 'people':
      return fetchCharacterDetails(uid);
    case 'vehicles':
      return fetchVehicleDetails(uid);
    case 'planets':
      return fetchPlanetDetails(uid);
    default:
      throw new Error(`Tipo desconocido: ${type}`);
  }
};

/**
 * fetchDetailsWithDelay (mejorada):
 * - recibe items [{ uid, url }, ...] o [{ uid }, ...]
 * - ejecuta peticiones de detalles con límite de concurrencia y caching.
 */
export const fetchDetailsWithDelay = async (items = [], type, concurrency = 4, delayBefore = 50) => {
  if (!Array.isArray(items) || items.length === 0) return [];

  // Crear tareas que piden detalles solo si no están en cache
  const tasks = items.map((item) => async () => {
    try {
      // pequeño delay entre inicios para suavizar
      if (delayBefore) await delay(delayBefore);
      const uid = item.uid || (item.url && item.url.split('/').filter(Boolean).pop());
      if (!uid) return null;
      // Si la respuesta está cacheada bajo la URL, fetchData lo dará
      const detail = await fetchItemDetails(type, uid);
      return detail;
    } catch (err) {
      console.warn(`Failed to get detail for ${type} ${item.uid || item.url}:`, err.message);
      return null;
    }
  });

  // Ejecutar con concurrencia limitada
  // (aquí usamos Promise.allSettled a la salida para filtrar nulos)
  const settled = await runWithConcurrency(tasks, concurrency);

  // extraer valores fulfilled
  const results = settled
    .filter((r) => r.status === 'fulfilled' && r.value)
    .map((r) => r.value);

  return results;
};

// fetchItemsByType genérico
export const fetchItemsByType = async (type, allPages = false) => {
  switch (type) {
    case 'people':
      return fetchCharacters(allPages);
    case 'vehicles':
      return fetchVehicles(allPages);
    case 'planets':
      return fetchPlanets(allPages);
    default:
      throw new Error(`Tipo desconocido: ${type}`);
  }
};

// test connection
export const testAPIConnection = async () => {
  try {
    console.log('Testing API connection...');
    const testData = await fetchData(`${BASE_URL}/people/1`);
    console.log('API Connection successful!', testData);
    return true;
  } catch (err) {
    console.error('API Connection failed:', err);
    return false;
  }
};
