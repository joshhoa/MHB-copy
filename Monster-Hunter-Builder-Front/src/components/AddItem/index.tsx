import { IArmor, IArmorType } from '../../@types/armor';
import { IIcons } from '../../@types/icons';
import { IWeapon } from '../../@types/weapon';
import { useAppSelector } from '../../hooks/redux';
import getIconByKey from '../../utils/icons';
import ArmorCard from '../Modal/ArmorCard';
import WeaponCard from '../Modal/WeaponCard';
import './styles.scss';

interface AddItemProps {
  itemType: 'weapon' | IArmorType
  icon: string
  openModal: (itemType: 'weapon' | IArmorType) => void
}
function AddItem({ itemType, icon, openModal }: AddItemProps) {
  // Get the item stocked in the state
  const itemInState = useAppSelector((state) => state.builder[itemType]);
  const isInState = Boolean(itemInState);
  // if an item exist in the state, format the type to fit the function getIconByKey()
  const snakeCaseTypeItem = itemInState?.type.split('-').join('_').concat('_1');
  return (
    <div className="section-items__item">
      {/* if an item is added to the builder, displays its related icon */}
      {itemType === 'weapon'
        && itemInState
        && (
        <button type="button" className="item__button-add" onClick={() => openModal(itemType)}>
          <WeaponCard
            weapon={itemInState as IWeapon}
            isSelected={isInState}
            // showModal prop is required. but we dont need it here. So we set a fake function
            showModal={(bool) => bool}
          />
        </button>
        )}
      {itemType !== 'weapon'
        && itemInState
        && (
        <button type="button" className="item__button-add" onClick={() => openModal(itemType)}>
          <ArmorCard
            armor={itemInState as IArmor}
            isSelected={isInState}
            // showModal prop is required. but we dont need it here. So we set a fake function
            showModal={(bool) => bool}
          />
        </button>
        )}
      {!itemInState
        && (
        <button type="button" className="item__button-add" onClick={() => openModal(itemType)}>
          <img src={itemInState ? getIconByKey(snakeCaseTypeItem as keyof IIcons) : icon} alt={`${itemType} icon`} className="item__icon" />
          <span>
            {/* if an item is added to the builder, displays its name */}
            {/* {itemInState ? itemInState.name : `Add ${itemType}`} */}
            {`Add ${itemType}`}
          </span>
        </button>
        )}
    </div>
  );
}

export default AddItem;
