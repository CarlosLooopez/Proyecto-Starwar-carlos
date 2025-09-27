import { useStarWars } from '../../context/StarWarsContext';

const Home = () => {
  const { setCurrentView } = useStarWars();

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: "url('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTJkZTZjNXNtbGdpa2FtM3hjbzQyc3o0dDM1dHQ2MXU4b3BjbGx3NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6ZtfSGhfV71RtlSg/giphy.gif')",
        backgroundSize: 'cover',       // hace que cubra todo
        backgroundPosition: 'center',  // centra la imagen
        backgroundRepeat: 'no-repeat', // evita que se repita
        color: '#ffe81f',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
       
      }}
    >
      <h1 style={{ 
  fontSize: '3rem', 
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '15px'
}}>
  <img 
    src="https://tse3.mm.bing.net/th/id/OIP.tq9a7_DuQ6QlP8cMFnu22wAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" 
    alt="Star Wars Logo" 
    style={{ 
      height: '60px', 
      width: 'auto' 
    }}
  />
  Star Wars
</h1>

      <p style={{ fontSize: '1.2rem', color: 'white' }}>
        Explora Personajes, Vehículos y Planetas de la Galaxia.
      </p>

      <div
        style={{
          marginTop: '200px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '100px',
          width: '100%',
          maxWidth: '800px',
        }}
      >
        <button
  onClick={() => handleNavigation('characters')}
  style={{
    backgroundColor: '#1e90ff',
    color: 'white',
    padding: '15px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  }}
>
  <img 
    src="https://www.pngmart.com/files/3/Star-Wars-Transparent-PNG.png" 
    alt="Personajes" 
    style={{ 
      width: '50px', 
      height: '50px' 
    }}
  />
  Personajes
</button>

        <button
          onClick={() => handleNavigation('vehicles')}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '15px',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          
          🚀 Vehículos
        </button>

        <button
          onClick={() => handleNavigation('planets')}
          style={{
            backgroundColor: '#ffc107',
            color: 'black',
            padding: '15px',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          🪐 Planetas
        </button>
      </div>
    </div>
  );
};

export default Home;
