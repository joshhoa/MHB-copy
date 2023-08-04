import './styles.scss';

interface WeaponTypeProps {
  name: string
  icon: string
  openSelectionModal: (weapon: string) => void
}

function WeaponType({ name, icon, openSelectionModal }: WeaponTypeProps) {
  // name to snake_case in order to display the right icon depending on weapon type
  const snakeCaseWeaponType = name.toLowerCase().split(' ').join('_');
  return (
    <button
      type="button"
      className="weapon-type"
      onClick={() => openSelectionModal(snakeCaseWeaponType)}
    >
      <img src={icon} alt={`${name} icon`} className="item__icon" />
      <span>{name}</span>
    </button>
  );
}

export default WeaponType;
