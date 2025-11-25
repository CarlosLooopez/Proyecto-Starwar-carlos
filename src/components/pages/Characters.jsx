import { useEffect } from 'react';
import { useStarWars } from '../../context/StarWarsContext';
import { fetchCharacters } from '../../services/swapiService';
import Card from '../common/Card';
import Loading from '../common/Loading';

const Characters = () => {
  const { 
    characters, 
    loading, 
    error, 
    setCharacters, 
    setLoading, 
    setError 
  } = useStarWars();

  useEffect(() => {
    let mounted = true;

    const loadCharacters = async () => {
      // Evitar cargar si ya existen
      if (characters.length > 0) return;

      try {
        setLoading(true);
        setError(null);

        const charactersData = await fetchCharacters();
        if (!mounted) return;

        setCharacters(charactersData);
      } catch (err) {
        if (!mounted) return;
        setError('Error al cargar los personajes: ' + err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadCharacters();

    return () => {
      mounted = false;
    };
  }, []); // Solo 1 vez al montar

  if (loading) {
    return <Loading message="Cargando personajes de Star Wars..." />;
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
            <i className="fas fa-users text-warning me-2"></i>
            Personajes de Star Wars
          </h2>
          <p className="text-center text-muted">
            Descubre los personajes más icónicos del universo Star Wars
          </p>
        </div>
      </div>

      {characters.length === 0 ? (
        <div className="text-center">
          <i className="fas fa-users text-muted" style={{ fontSize: '4rem' }}></i>
          <p className="mt-3 text-muted">No se encontraron personajes</p>
        </div>
      ) : (
        <div className="row">
          {characters.map((character) => (
            <Card 
              key={character.uid}
              item={character}
              type="people"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Characters;
