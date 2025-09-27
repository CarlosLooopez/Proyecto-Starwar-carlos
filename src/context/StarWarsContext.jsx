// src/context/StarWarsContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';

// Tipos de acciones
const ACTIONS = {
  SET_DATA: 'SET_DATA', // Nueva acción unificada
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  SET_CURRENT_VIEW: 'SET_CURRENT_VIEW',
  SET_SELECTED_ITEM: 'SET_SELECTED_ITEM'
};

// Estado inicial del store
const initialState = {
  // Un solo objeto para manejar todos los datos
  data: {
    characters: [],
    vehicles: [],
    planets: []
  },
  favorites: [],
  loading: false,
  error: null,
  currentView: 'home',
  selectedItem: null
};

// Reducer para manejar todas las acciones de forma más eficiente
const starWarsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_DATA:
      // Actualiza solo el tipo de dato que se está cargando (characters, vehicles, etc.)
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.dataType]: action.payload.items,
        },
        loading: false,
        error: null,
      };

    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ACTIONS.ADD_FAVORITE:
      const { uid, type } = action.payload;
      const isDuplicate = state.favorites.some(fav => fav.uid === uid && fav.type === type);
      return isDuplicate ? state : { ...state, favorites: [...state.favorites, action.payload] };

    case ACTIONS.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
        )
      };

    case ACTIONS.SET_CURRENT_VIEW:
      return { ...state, currentView: action.payload };

    case ACTIONS.SET_SELECTED_ITEM:
      return { ...state, selectedItem: action.payload };

    default:
      return state;
  }
};

const StarWarsContext = createContext();

export const StarWarsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(starWarsReducer, initialState);

  // Cargar favoritos del localStorage
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('starWarsFavorites');
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        parsedFavorites.forEach(favorite => {
          dispatch({ type: ACTIONS.ADD_FAVORITE, payload: favorite });
        });
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, []);

  // Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem('starWarsFavorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  const contextValue = {
    // Estado
    ...state,
    // Ahora accedemos a los datos con state.data.characters, etc.
    characters: state.data.characters, 
    vehicles: state.data.vehicles,
    planets: state.data.planets,

    // Funciones de acción
    setCharacters: (items) => dispatch({ type: ACTIONS.SET_DATA, payload: { dataType: 'characters', items } }),
    setVehicles: (items) => dispatch({ type: ACTIONS.SET_DATA, payload: { dataType: 'vehicles', items } }),
    setPlanets: (items) => dispatch({ type: ACTIONS.SET_DATA, payload: { dataType: 'planets', items } }),
    setLoading: (isLoading) => dispatch({ type: ACTIONS.SET_LOADING, payload: isLoading }),
    setError: (message) => dispatch({ type: ACTIONS.SET_ERROR, payload: message }),
    addToFavorites: (item) => dispatch({ type: ACTIONS.ADD_FAVORITE, payload: item }),
    removeFromFavorites: (uid, type) => dispatch({ type: ACTIONS.REMOVE_FAVORITE, payload: { uid, type } }),
    setCurrentView: (view) => dispatch({ type: ACTIONS.SET_CURRENT_VIEW, payload: view }),
    setSelectedItem: (item) => dispatch({ type: ACTIONS.SET_SELECTED_ITEM, payload: item }),
    
    // Función de verificación de favoritos
    isFavorite: (uid, type) => state.favorites.some(fav => fav.uid === uid && fav.type === type)
  };

  return (
    <StarWarsContext.Provider value={contextValue}>
      {children}
    </StarWarsContext.Provider>
  );
};

export const useStarWars = () => {
  const context = useContext(StarWarsContext);
  if (!context) {
    throw new Error('useStarWars debe ser usado dentro de StarWarsProvider');
  }
  return context;
};