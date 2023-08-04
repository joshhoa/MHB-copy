import { IArmorType } from '../../../@types/armor';
import AddItem from '../../../components/AddItem';
import { useAppDispatch } from '../../../hooks/redux';
import { clearArmorList, clearWeaponList, fetchArmorsByType } from '../../../store/reducers/builder';
import getIconByKey from '../../../utils/icons';

interface ItemsSectionProps {
  setArmorSelectionModalShown: (bool: boolean) => void
  setWeaponSelectionModalShown: (bool: boolean) => void
  setWeaponTypeModalShown: (bool: boolean) => void
}
function ItemsSection({
  setArmorSelectionModalShown, setWeaponSelectionModalShown, setWeaponTypeModalShown,
}: ItemsSectionProps) {
  const dispatch = useAppDispatch();

  const handleShowModal = (itemType: 'weapon' | IArmorType) => {
    if (itemType === 'weapon') {
      // clear list of weapons
      dispatch(clearWeaponList());
      setArmorSelectionModalShown(false);
      setWeaponSelectionModalShown(false);
      setWeaponTypeModalShown(true);
    } else {
      dispatch(clearArmorList());
      setWeaponTypeModalShown(false);
      setWeaponSelectionModalShown(false);
      setArmorSelectionModalShown(true);
      dispatch(fetchArmorsByType(itemType));
    }
  };
  return (
    <section className="section-items">
      <p className="section-items__description">Set your items</p>
      <AddItem itemType="weapon" icon={getIconByKey('great_sword_1')} openModal={handleShowModal} />
      <AddItem itemType="head" icon={getIconByKey('head_1')} openModal={handleShowModal} />
      <AddItem itemType="chest" icon={getIconByKey('chest_1')} openModal={handleShowModal} />
      <AddItem itemType="arms" icon={getIconByKey('arms_1')} openModal={handleShowModal} />
      <AddItem itemType="waist" icon={getIconByKey('waist_1')} openModal={handleShowModal} />
      <AddItem itemType="legs" icon={getIconByKey('legs_1')} openModal={handleShowModal} />
    </section>
  );
}

export default ItemsSection;
