import { IIcons } from '../../@types/icons';
import { useAppSelector } from '../../hooks/redux';
import getIconByKey from '../../utils/icons';
import './styles.scss';

function ArmorStats() {
  const stats = useAppSelector((state) => state.builder.stats);
  const res = stats?.resistances;

  const elements = [
    {
      name: 'fire',
      value: res?.fire,
    },
    {
      name: 'water',
      value: res?.water,
    },
    {
      name: 'thunder',
      value: res?.thunder,
    },
    {
      name: 'ice',
      value: res?.ice,
    },
    {
      name: 'dragon',
      value: res?.dragon,
    },
  ];
  return (
    <div className="stats-container">
      <h3 className="stats-title">Armor stats</h3>
      <h4>
        Defense :
        {' '}
        <span className="stats-value">
          {stats?.defense}
        </span>
      </h4>
      {elements.map((element) => (
        <div key={element.name}>
          Res.
          {' '}
          <img src={getIconByKey(`element_${element.name}` as keyof IIcons)} alt={`${element.name} icon`} className="stats__element-icon" />
          {' '}
          :
          {' '}
          <span className="stats-value">
            {element.value}
          </span>
        </div>
      ))}

    </div>
  );
}

export default ArmorStats;
