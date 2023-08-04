import Modal from '../Modal';
import WeaponType from '../Modal/WeaponType';
import { useAppDispatch } from '../../hooks/redux';
import { fetchWeaponsByType, setWeaponType } from '../../store/reducers/builder';
import getIconByKey from '../../utils/icons';

interface WeaponTypeModalProps {
  showSelectionModal: () => void
  weaponTypeModalShown: boolean
  setWeaponTypeModalShown: (shown: boolean) => void
}

function WeaponTypeModal(
  {
    showSelectionModal, weaponTypeModalShown, setWeaponTypeModalShown,
  }: WeaponTypeModalProps,
) {
  const dispatch = useAppDispatch();

  const handleClickOnWeaponType = (weaponType: string): void => {
    dispatch(setWeaponType(weaponType));
    dispatch(fetchWeaponsByType(weaponType));
    setWeaponTypeModalShown(!weaponTypeModalShown);
    showSelectionModal();
  };

  return (
    <Modal
      modalXl={false}
      shown={weaponTypeModalShown}
      close={() => setWeaponTypeModalShown(!weaponTypeModalShown)}
    >
      <WeaponType name="Great Sword" icon={getIconByKey('great_sword_1')} openSelectionModal={handleClickOnWeaponType} />
      <WeaponType name="Long Sword" icon={getIconByKey('long_sword_1')} openSelectionModal={handleClickOnWeaponType} />
      <WeaponType name="Sword and Shield" icon={getIconByKey('sword_and_shield_1')} openSelectionModal={handleClickOnWeaponType} />
      <WeaponType name="Dual Blades" icon={getIconByKey('dual_blades_1')} openSelectionModal={handleClickOnWeaponType} />
      <WeaponType name="Lance" icon={getIconByKey('lance_1')} openSelectionModal={handleClickOnWeaponType} />
      <WeaponType name="Gunlance" icon={getIconByKey('gunlance_1')} openSelectionModal={handleClickOnWeaponType} />
      <WeaponType name="Hammer" icon={getIconByKey('hammer_1')} openSelectionModal={handleClickOnWeaponType} />
      <WeaponType name="Hunting Horn" icon={getIconByKey('hunting_horn_1')} openSelectionModal={handleClickOnWeaponType} />
      <WeaponType name="Switch Axe" icon={getIconByKey('switch_axe_1')} openSelectionModal={handleClickOnWeaponType} />
      <WeaponType name="Charge Blade" icon={getIconByKey('charge_blade_1')} openSelectionModal={handleClickOnWeaponType} />
      <WeaponType name="Insect Glaive" icon={getIconByKey('insect_glaive_1')} openSelectionModal={handleClickOnWeaponType} />
      <WeaponType name="Light Bow Gun" icon={getIconByKey('light_bow_gun_1')} openSelectionModal={handleClickOnWeaponType} />
      <WeaponType name="Heavy Bow Gun" icon={getIconByKey('heavy_bow_gun_1')} openSelectionModal={handleClickOnWeaponType} />
      <WeaponType name="Bow" icon={getIconByKey('bow_1')} openSelectionModal={handleClickOnWeaponType} />
    </Modal>
  );
}

export default WeaponTypeModal;
