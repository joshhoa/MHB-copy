/* eslint-disable max-len */
import { useAppSelector } from '../../hooks/redux';
import './styles.scss';

function SkillStats() {
  const stats = useAppSelector((state) => state.builder.stats);
  const skills = stats?.skills;

  return (
    <div className="stats-container">
      <h3 className="stats-title">Skills</h3>
      {skills?.map((skill) => (
        <div key={skill.id} style={{ backgroundColor: `${skill.color}` }} className="stats-skill">
          {`${skill.name} : `}
          <span className="stats-skill__value">
            {`lv. ${skill.level}/${skill.level_max}`}
          </span>
        </div>
      ))}
    </div>
  );
}

export default SkillStats;
