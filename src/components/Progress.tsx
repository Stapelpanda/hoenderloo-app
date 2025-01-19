import '../styles/Progress.css';

interface ProgressProps {
  current: number;
  total: number;
}

export function Progress({ current, total }: ProgressProps) {
  return (
    <div className="progress-container">
      <div className="progress-number">
        Vraag {current + 1} / {total}
      </div>
      <div className="progress-dots">
        {Array.from({ length: total }, (_, i) => (
          <div 
            key={i} 
            className={`progress-dot ${i <= current ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
