// src/App.jsx
import { StarWarsProvider, useStarWars } from './context/StarWarsContext';
import Navbar from './components/common/Navbar';
import Home from './components/pages/Home';
import Characters from './components/pages/Characters';
import Vehicles from './components/pages/Vehicles';
import Planets from './components/pages/Planets';
import Favorites from './components/pages/Favorites';
import Details from './components/pages/Details';

// Componente interno que usa el contexto
const AppContent = () => {
  const { currentView } = useStarWars();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'characters':
        return <Characters />;
      case 'vehicles':
        return <Vehicles />;
      case 'planets':
        return <Planets />;
      case 'favorites':
        return <Favorites />;
      case 'details':
        return <Details />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      {/* Bootstrap CSS y Font Awesome */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        rel="stylesheet" 
      />
      
      <Navbar />
      <main>
        {renderCurrentView()}
      </main>
      
      {/* Footer */}
      <footer className="bg-dark text-light mt-5 py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h6>
                <i className="fas fa-jedi me-2"></i>
                Star Wars DB
              </h6>
              <p className="small text-muted">
                Información del universo Star Wars obtenida de SWAPI
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="small text-muted mb-0">
                Desarrollado con React y Bootstrap
              </p>
              <p className="small text-muted">
                <i className="fas fa-heart text-danger"></i> May the Force be with you
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Bootstrap JS */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

// Componente principal con el Provider
const App = () => {
  return (
    <StarWarsProvider>
      <AppContent />
    </StarWarsProvider>
  );
};

export default App;
//listo