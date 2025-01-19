import '../styles/Loading.css';

export function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Route wordt geladen...</p>
    </div>
  );
}
