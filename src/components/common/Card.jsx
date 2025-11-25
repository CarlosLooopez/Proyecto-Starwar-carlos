
import { useStarWars } from '../../context/StarWarsContext';

const Card = ({ item, type }) => {
  const { 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite, 
    setCurrentView, 
    setSelectedItem 
  } = useStarWars();

  const isInFavorites = isFavorite(item.uid, type);

  const handleFavoriteToggle = () => {
    if (isInFavorites) {
      removeFromFavorites(item.uid, type);
    } else {
      addToFavorites({
        uid: item.uid,
        name: item.name,
        type: type,
        url: item.url
      });
    }
  };

  const handleViewDetails = () => {
    setSelectedItem({ ...item, type });
    setCurrentView('details');
  };

  const getDescription = () => {
    switch (type) {
      case 'people':
        return 'Personaje del universo Star Wars con historia única y características especiales.';
      case 'vehicles':
        return 'Vehículo utilizado en la galaxia para transporte y combate.';
      case 'planets':
        return 'Planeta del sistema Star Wars con características únicas.';
      default:
        return 'Elemento del universo Star Wars.';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'people':
        return 'fas fa-user';
      case 'vehicles':
        return 'fas fa-rocket';
      case 'planets':
        return 'fas fa-globe';
      default:
        return 'fas fa-star';
    }
  };

 

const getImageUrl = () => {
  
  const imageMap = {
   
    people: {
      1: 'https://cdn.quotesgram.com/img/52/81/1395363194-Star_Wars_LukeSkywalker.jpg',        // Luke Skywalker

      2: 'https://wallpapercave.com/wp/wp2182707.jpg',       // C-3PO

      3: 'https://th.bing.com/th/id/R.275a0562297c5bad0299112825a4758c?rik=%2fUMJ0XcBUkDsTg&pid=ImgRaw&r=0',          // R2-D2

      4: 'https://images.wallpapersden.com/image/download/darth-vader-star-wars-2021_bGdtaGqUmZqaraWkpJRmbmdlrWZlbWU.jpg',        // Darth Vader

      5: 'https://tse1.mm.bing.net/th/id/OIP.OHZdlT0Bh05CYR-LdqYlcAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3',          // Leia Organa

      6: 'https://www.hollywoodreporter.com/wp-content/uploads/2023/05/Joel-Edgerton-Obi-Wan-Kenobi-Publicity-H-2023.jpg?w=1296&h=730&crop=1',           // Owen Lars

      7: 'https://i.pinimg.com/736x/d8/a8/7d/d8a87d047989ce78e00a9d4db87eeb19.jpg',           // Beru Whitesun Lars

      8: 'https://tse2.mm.bing.net/th/id/OIP.wRDXnRe1xg9gDj1xOCQnJAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',                // R5-D4 
      

      10: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2021/05/obi-wan-kenobi-2323059.jpg?tf=3840x',               // Obi-Wan Kenobi

      11: 'https://tse4.mm.bing.net/th/id/OIP.96g0pvJC1DM8C1O8zsJbpwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',          // Anakin Skywalker

      13: 'https://tse4.mm.bing.net/th/id/OIP.zt08NiWS17cySAvPTQ5m3AHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',             // Chewbacca

      14: 'https://imgix.bustle.com/inverse/03/b9/b2/fe/3b72/420f/9008/288e5c43bb99/han-solo-space-cowboy.jpeg?w=349&h=182&fit=max&auto=format%2Ccompress&q=50&dpr=2',         // Han Solo
      
    },
    
    // VEHÍCULOS (type: 'vehicles')
    vehicles: {
      4: 'https://i.pinimg.com/originals/46/35/b4/4635b4a68bb348f626cbd20b62879b14.jpg',        // Sand Crawler

      6: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ab940dbf-6b1c-43d5-9e49-aa8736340b2d/dclh32o-d561b1e3-0522-47df-9973-07d7a45faa61.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FiOTQwZGJmLTZiMWMtNDNkNS05ZTQ5LWFhODczNjM0MGIyZFwvZGNsaDMyby1kNTYxYjFlMy0wNTIyLTQ3ZGYtOTk3My0wN2Q3YTQ1ZmFhNjEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BWcsYZBwFbHRmsHFeEkk1sfunOCRtkz-0qfgnILPFTU',      // T-16 skyhopper

      7: 'https://cdna.artstation.com/p/marketplace/presentation_assets/000/123/522/large/file.png?1554837142',      // X-34 landspeeder

      8: 'https://th.bing.com/th/id/R.9c9926e0321fc2d5bdd187da995c1fc9?rik=pLHP1oBAtSUvSQ&riu=http%3a%2f%2fvignette2.wikia.nocookie.net%2fthelastofthedroids%2fimages%2ff%2ff7%2fTIE_Fighter.gif%2frevision%2flatest%2fscale-to-width-down%2f2000%3fcb%3d20141007230617&ehk=dCAZtv4I3%2fQ9GJTz72CUyC51%2bHErOAAbjJ4ZkJI1fn0%3d&risl=&pid=ImgRaw&r=0',         // TIE/LN starfighter

      14: 'https://cdnb.artstation.com/p/assets/images/images/000/201/471/large/paul-beards-incom-t-47-snowspeeder-final-a.jpg?1410444561',     
      //Snowspeeder

      16: 'https://th.bing.com/th/id/R.533866d2699d136f4db22c8d6b1cc7c4?rik=%2fMg1efk%2flD30fA&riu=http%3a%2f%2fpm1.aminoapps.com%2f6332%2f47969c102ec015574f9edfaac833ae66fb30f1bc_00.jpg&ehk=Gj4uGh4PjMmccytEr738OO8UC1asAi8Y1JCtr4%2feU3s%3d&risl=&pid=ImgRaw&r=0',        // TIE bomber

      18: 'https://tse2.mm.bing.net/th/id/OIP.mpi038y3gad_iLA6Rpc9IAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',        // AT-AT
      19: 'https://tse2.mm.bing.net/th/id/OIP.mpi038y3gad_iLA6Rpc9IAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',                 // AT-ST

      20: 'https://th.bing.com/th/id/R.82d8b37eaf8401839f7c154d89f820c2?rik=3QO3jJ%2bk%2bVLhpg&pid=ImgRaw&r=0',    // Yoda 
      // Agrega más vehículos aquí...
    },
    
    // PLANETAS (type: 'planets')
    planets: {
      1: 'https://ejemplo.com/tatooine.jpg',               // Tatooine
      2: 'https://ejemplo.com/alderaan.jpg',               // Alderaan
      3: 'https://ejemplo.com/yavin4.jpg',                 // Yavin IV
      4: 'https://ejemplo.com/hoth.jpg',                   // Hoth
      5: 'https://ejemplo.com/dagobah.jpg',                // Dagobah
      6: 'https://ejemplo.com/bespin.jpg',                 // Bespin
      7: 'https://ejemplo.com/endor.jpg',                  // Endor
      8: 'https://ejemplo.com/naboo.jpg',                  // Naboo
      9: 'https://ejemplo.com/coruscant.jpg',              // Coruscant
      10: 'https://ejemplo.com/kamino.jpg',                // Kamino
      
    }
  };

  // Buscar imagen específica
  const specificImage = imageMap[type]?.[item.uid];
  if (specificImage) {
    return specificImage;
  }

  // Si no hay imagen específica, usar placeholder con el nombre
  return `https://via.placeholder.com/300x200/1a1a1a/ffffff?text=${encodeURIComponent(item.name)}`;
};

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
  };

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img 
          src={getImageUrl()} 
          className="card-img-top" 
          alt={item.name}
          style={{ height: '200px', objectFit: 'cover' }}
          onError={handleImageError}
        />
        
        <div className="card-body d-flex flex-column">
          <div className="d-flex align-items-center mb-2">
            <i className={`${getIcon()} text-warning me-2`}></i>
            <h5 className="card-title mb-0">{item.name}</h5>
          </div>
          
          <p className="card-text text-muted small flex-grow-1">
            {getDescription()}
          </p>
          
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center">
              <button 
                className="btn btn-primary btn-sm"
                onClick={handleViewDetails}
              >
                <i className="fas fa-eye me-1"></i>
                Ver detalles
              </button>
              
              <button 
                className={`btn btn-sm ${
                  isInFavorites 
                    ? 'btn-danger' 
                    : 'btn-outline-warning'
                }`}
                onClick={handleFavoriteToggle}
                title={isInFavorites ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                <i className={`fas fa-heart ${isInFavorites ? '' : 'text-muted'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;