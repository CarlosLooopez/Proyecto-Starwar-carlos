
import { useStarWars } from '../../context/StarWarsContext';
import Card from '../common/Card';

const Favorites = () => {
  const { favorites } = useStarWars();

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col">
          <h2 className="text-center mb-3">
            <i className="fas fa-heart text-warning me-2"></i>
            Mis Favoritos
          </h2>
          <p className="text-center text-muted">
            Elementos que has guardado para leer más tarde
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="fas fa-heart-broken text-muted" style={{ fontSize: '4rem' }}></i>
          </div>
          <h4 className="text-muted mb-3">No tienes favoritos aún</h4>
          <p className="text-muted mb-4">
            Explora personajes, vehículos y planetas, y agrega tus favoritos haciendo clic en el corazón.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <div className="text-center">
              <i className="fas fa-users text-primary mb-2 d-block" style={{ fontSize: '2rem' }}></i>
              <small className="text-muted">Personajes</small>
            </div>
            <div className="text-center">
              <i className="fas fa-rocket text-info mb-2 d-block" style={{ fontSize: '2rem' }}></i>
              <small className="text-muted">Vehículos</small>
            </div>
            <div className="text-center">
              <i className="fas fa-globe text-success mb-2 d-block" style={{ fontSize: '2rem' }}></i>
              <small className="text-muted">Planetas</small>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="row mb-3">
            <div className="col">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">
                  Total: {favorites.length} elemento{favorites.length !== 1 ? 's' : ''}
                </span>
                <div className="d-flex gap-2">
                  <span className="badge bg-primary">
                    <i className="fas fa-users me-1"></i>
                    {favorites.filter(f => f.type === 'people').length}
                  </span>
                  <span className="badge bg-info">
                    <i className="fas fa-rocket me-1"></i>
                    {favorites.filter(f => f.type === 'vehicles').length}
                  </span>
                  <span className="badge bg-success">
                    <i className="fas fa-globe me-1"></i>
                    {favorites.filter(f => f.type === 'planets').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            {favorites.map((favorite) => (
              <Card 
                key={`${favorite.type}-${favorite.uid}`} 
                item={favorite} 
                type={favorite.type}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;