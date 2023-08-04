import { BiLoaderCircle } from 'react-icons/bi';
import { RiArrowGoBackFill } from 'react-icons/ri';
import Modal from '../Modal';
import { useAppSelector } from '../../hooks/redux';
import WeaponCard from '../Modal/WeaponCard';
import './styles.scss';

interface WeaponSelectionModalProps {
  weaponSelectionModalShown: boolean
  setWeaponSelectionModalShown: (shown: boolean) => void
  setWeaponTypeModalShown: (shown: boolean) => void
}

function WeaponSelectionModal(
  {
    weaponSelectionModalShown, setWeaponSelectionModalShown, setWeaponTypeModalShown,
  }: WeaponSelectionModalProps,
) {
  const errorMessage = useAppSelector((state) => state.builder.errorMessage);
  const isLoading = useAppSelector((state) => state.builder.isLoading);
  const weaponList = useAppSelector((state) => state.builder.weaponList);

  function handleGoBack(): void {
    setWeaponSelectionModalShown(false);
    setWeaponTypeModalShown(true);
  }

  return (
    <Modal
      modalXl
      shown={weaponSelectionModalShown}
      close={() => setWeaponSelectionModalShown(!weaponSelectionModalShown)}
    >
      <button type="button" className="item__go-back" onClick={handleGoBack}>
        <RiArrowGoBackFill className="item__go-back__icon" />
      </button>
      <div className="item-list">
        {isLoading && <BiLoaderCircle className="item-list__loader" />}
        {errorMessage && <div className="modal-error">{errorMessage}</div>}
        {!isLoading
          && !errorMessage
          && !weaponList
          && (
          <div className="item-list__empty">
            <div>No items available yet.</div>
            <div>Please, select another category.</div>
            <button type="button" className="item-list__empty__button-back" onClick={handleGoBack}>Go back</button>
          </div>
          )}

        {
          weaponList && weaponList.map((weapon) => (
            <WeaponCard
              key={weapon.id}
              weapon={weapon}
              showModal={setWeaponSelectionModalShown}
              isSelected={false}
            />
          ))
          }
      </div>
    </Modal>
  );
}

export default WeaponSelectionModal;
