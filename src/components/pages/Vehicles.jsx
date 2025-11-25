import { useEffect } from 'react';
import { useStarWars } from '../../context/StarWarsContext';
import { fetchVehicles } from '../../services/swapiService';
import Card from '../common/Card';
import Loading from '../common/Loading';

const Vehicles = () => {
  const { 
    vehicles, 
    loading, 
    error, 
    setVehicles, 
    setLoading, 
    setError 
  } = useStarWars();

  useEffect(() => {
    let mounted = true;

    const loadVehicles = async () => {
      // Si ya tenemos vehículos en el contexto, NO cargar de nuevo
      if (vehicles.length > 0) return;

      try {
        setLoading(true);
        setError(null);

        const vehiclesData = await fetchVehicles();

        if (!mounted) return;
        setVehicles(vehiclesData);

      } catch (err) {
        if (mounted) {
          setError('Error al cargar los vehículos: ' + err.message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadVehicles();

    return () => {
      mounted = false;
    };
  }, []); // se ejecuta una sola vez

  if (loading) {
    return <Loading message="Cargando vehículos de Star Wars..." />;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col">
          <h2 className="text-center mb-3">
            <i className="fas fa-rocket text-warning me-2"></i>
            Vehículos de Star Wars
          </h2>
          <p className="text-center text-muted">
            Explora los vehículos más increíbles de la galaxia
          </p>
        </div>
      </div>
      
      {vehicles.length === 0 ? (
        <div className="text-center">
          <i className="fas fa-rocket text-muted" style={{ fontSize: '4rem' }}></i>
          <p className="mt-3 text-muted">No se encontraron vehículos</p>
        </div>
      ) : (
        <div className="row">
          {vehicles.map((vehicle) => (
            <Card 
              key={vehicle.uid} 
              item={vehicle} 
              type="vehicles"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Vehicles;
