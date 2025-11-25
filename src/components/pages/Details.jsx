
import { useState, useEffect } from 'react';
import { useStarWars } from '../../context/StarWarsContext';
import { fetchItemDetails } from '../../services/swapiService';
import Loading from '../common/Loading';

const Details = () => {
  const { 
    selectedItem, 
    setCurrentView, 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite 
  } = useStarWars();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedItem) {
      setCurrentView('home');
      return;
    }

    const loadDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchItemDetails(selectedItem.type, selectedItem.uid);
        setDetails(data);
      } catch (err) {
        setError('Error al cargar los detalles: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [selectedItem, setCurrentView]);

  const handleBack = () => {
    const viewMap = {
      'people': 'characters',
      'vehicles': 'vehicles',
      'planets': 'planets'
    };
    setCurrentView(viewMap[selectedItem?.type] || 'home');
  };

  const handleFavoriteToggle = () => {
    const isInFavorites = isFavorite(selectedItem.uid, selectedItem.type);
    if (isInFavorites) {
      removeFromFavorites(selectedItem.uid, selectedItem.type);
    } else {
      addToFavorites(selectedItem);
    }
  };

  if (loading) {
    return <Loading message="Cargando detalles..." />;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
        <button className="btn btn-primary" onClick={handleBack}>
          <i className="fas fa-arrow-left me-2"></i>
          Volver
        </button>
      </div>
    );
  }

  if (!selectedItem || !details) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning" role="alert">
          No se encontraron detalles para mostrar.
        </div>
      </div>
    );
  }

  const getIcon = () => {
    switch (selectedItem.type) {
      case 'people': return 'fas fa-user';
      case 'vehicles': return 'fas fa-rocket';
      case 'planets': return 'fas fa-globe';
      default: return 'fas fa-star';
    }
  };

  const getImageUrl = () => {
    switch (selectedItem.type) {
      case 'people':
        return `https://starwars-visualguide.com/assets/img/characters/${selectedItem.uid}.jpg`;
      case 'vehicles':
        return `https://starwars-visualguide.com/assets/img/vehicles/${selectedItem.uid}.jpg`;
      case 'planets':
        return `https://starwars-visualguide.com/assets/img/planets/${selectedItem.uid}.jpg`;
      default:
        return 'https://via.placeholder.com/400x300?text=Star+Wars';
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
  };

  const renderDetailFields = () => {
    const properties = details.properties;
    
    switch (selectedItem.type) {
      case 'people':
        return (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Altura:</strong>
                  <span className="ms-2">{properties.height} cm</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Peso:</strong>
                  <span className="ms-2">{properties.mass} kg</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Color de cabello:</strong>
                  <span className="ms-2">{properties.hair_color}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Color de ojos:</strong>
                  <span className="ms-2">{properties.eye_color}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Color de piel:</strong>
                  <span className="ms-2">{properties.skin_color}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Año de nacimiento:</strong>
                  <span className="ms-2">{properties.birth_year}</span>
                </div>
              </div>
            </div>
            <div className="detail-item mb-3">
              <strong>Género:</strong>
              <span className="ms-2">{properties.gender}</span>
            </div>
          </>
        );

      case 'vehicles':
        return (
          <>
            <div className="detail-item mb-3">
              <strong>Modelo:</strong>
              <span className="ms-2">{properties.model}</span>
            </div>
            <div className="detail-item mb-3">
              <strong>Fabricante:</strong>
              <span className="ms-2">{properties.manufacturer}</span>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Costo:</strong>
                  <span className="ms-2">{properties.cost_in_credits} créditos</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Longitud:</strong>
                  <span className="ms-2">{properties.length} metros</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Velocidad máxima:</strong>
                  <span className="ms-2">{properties.max_atmosphering_speed}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Tripulación:</strong>
                  <span className="ms-2">{properties.crew}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Pasajeros:</strong>
                  <span className="ms-2">{properties.passengers}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Capacidad de carga:</strong>
                  <span className="ms-2">{properties.cargo_capacity} kg</span>
                </div>
              </div>
            </div>
          </>
        );

      case 'planets':
        return (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Período de rotación:</strong>
                  <span className="ms-2">{properties.rotation_period} horas</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Período orbital:</strong>
                  <span className="ms-2">{properties.orbital_period} días</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Diámetro:</strong>
                  <span className="ms-2">{properties.diameter} km</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Población:</strong>
                  <span className="ms-2">{properties.population}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Clima:</strong>
                  <span className="ms-2">{properties.climate}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Terreno:</strong>
                  <span className="ms-2">{properties.terrain}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Gravedad:</strong>
                  <span className="ms-2">{properties.gravity}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-item mb-3">
                  <strong>Agua superficial:</strong>
                  <span className="ms-2">{properties.surface_water}%</span>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return <p>No hay detalles disponibles</p>;
    }
  };

  const isInFavorites = isFavorite(selectedItem.uid, selectedItem.type);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-lg">
            <div className="card-header bg-dark text-white">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <button className="btn btn-outline-light me-3" onClick={handleBack}>
                    <i className="fas fa-arrow-left"></i>
                  </button>
                  <div>
                    <h3 className="mb-0">
                      <i className={`${getIcon()} me-2`}></i>
                      {details.properties.name}
                    </h3>
                  </div>
                </div>
                <button 
                  className={`btn ${isInFavorites ? 'btn-danger' : 'btn-outline-warning'}`}
                  onClick={handleFavoriteToggle}
                  title={isInFavorites ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  <i className="fas fa-heart"></i>
                  {isInFavorites ? ' Quitar' : ' Agregar'}
                </button>
              </div>
            </div>
            
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-4">
                  <img 
                    src={getImageUrl()} 
                    className="img-fluid rounded shadow" 
                    alt={details.properties.name}
                    onError={handleImageError}
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-8">
                  {renderDetailFields()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;