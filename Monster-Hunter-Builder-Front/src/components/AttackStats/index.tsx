import { useAppSelector } from '../../hooks/redux';
import './styles.scss';

function AttackStats() {
  const stats = useAppSelector((state) => state.builder.stats);

  return (
    <div className="stats-container">
      <h3 className="stats-title">Attack stats</h3>
      <div>
        Neutral attack :
        {' '}
        <span className="stats-value">
          {stats?.attack ? Math.round(stats.attack) : false}
        </span>
      </div>

      {stats?.elements?.map((element) => (
        <div key={element?.name}>
          {`Element ${element?.name} : `}
          <span className="stats-value">
            {Math.round(Number(element?.value))}
          </span>
        </div>
      ))}

      <div>
        Affinity :
        {' '}
        <span className="stats-value">
          {stats?.affinity}
          %
        </span>
      </div>
    </div>
  );
}

export default AttackStats;
