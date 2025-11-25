
import { useStarWars } from '../../context/StarWarsContext';

const Navbar = () => {
  const { favorites, currentView, setCurrentView, setSelectedItem } = useStarWars();

  const handleNavigation = (view) => {
    setCurrentView(view);
    setSelectedItem(null); // Limpiar item seleccionado al navegar
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand d-flex align-items-center">
          <img 
            src="https://png.pngtree.com/png-clipart/20231006/original/pngtree-star-wars-png-free-download-png-image_13130372.png" 
            alt="Star Wars Logo" 
            className="me-2"
            style={{ height: '32px', width: 'auto' }}
          />
          Star Wars
        </span>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-start ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => handleNavigation('home')}
              >
                <i className="fas fa-home me-2"></i>
                Inicio
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-start ${currentView === 'characters' ? 'active' : ''}`}
                onClick={() => handleNavigation('characters')}
              >
                <i className="fas fa-users me-2"></i>
                Personajes
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-start ${currentView === 'vehicles' ? 'active' : ''}`}
                onClick={() => handleNavigation('vehicles')}
              >
                <i className="fas fa-rocket me-2"></i>
                Vehículos
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-start ${currentView === 'planets' ? 'active' : ''}`}
                onClick={() => handleNavigation('planets')}
              >
                <i className="fas fa-globe me-2"></i>
                Planetas
              </button>
            </li>
          </ul>
          
          <div className="d-flex">
            <button 
              className={`btn btn-outline-warning ${currentView === 'favorites' ? 'active' : ''}`}
              onClick={() => handleNavigation('favorites')}
            >
              <i className="fas fa-heart me-2"></i>
              Favoritos 
              {favorites.length > 0 && (
                <span className="badge bg-warning text-dark ms-2">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;