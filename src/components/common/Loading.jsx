// src/components/common/Loading.jsx

const Loading = ({ message = "Cargando..." }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-5">
      <div className="spinner-border text-warning mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted">{message}</p>
    </div>
  );
};

export default Loading;