import { useEffect } from 'react';
import { useStarWars } from '../../context/StarWarsContext';
import { fetchPlanets } from '../../services/swapiService';
import Card from '../common/Card';
import Loading from '../common/Loading';

const Planets = () => {
  const { 
    planets, 
    loading, 
    error, 
    setPlanets, 
    setLoading, 
    setError 
  } = useStarWars();

  useEffect(() => {
    let mounted = true;

    const loadPlanets = async () => {
      // Evitar recargar si ya los tenemos
      if (planets.length > 0) return;

      try {
        setLoading(true);
        setError(null);

        const planetsData = await fetchPlanets();
        if (!mounted) return;

        setPlanets(planetsData);
      } catch (err) {
        if (!mounted) return;
        setError('Error al cargar los planetas: ' + err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadPlanets();

    return () => {
      mounted = false;
    };
  }, []); // Solo correr 1 vez al montar

  if (loading) {
    return <Loading message="Cargando planetas de Star Wars..." />;
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
            <i className="fas fa-globe text-warning me-2"></i>
            Planetas de Star Wars
          </h2>
          <p className="text-center text-muted">
            Explora los mundos más fascinantes del universo
          </p>
        </div>
      </div>

      {planets.length === 0 ? (
        <div className="text-center">
          <i className="fas fa-globe text-muted" style={{ fontSize: '4rem' }}></i>
          <p className="mt-3 text-muted">No se encontraron planetas</p>
        </div>
      ) : (
        <div className="row">
          {planets.map((planet) => (
            <Card 
              key={planet.uid}
              item={planet}
              type="planets"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
