import { BiLoaderCircle } from 'react-icons/bi';
import Modal from '../Modal';
import ArmorCard from '../Modal/ArmorCard';
import { useAppSelector } from '../../hooks/redux';

interface ArmorSelectionModalProps {
  armorSelectionModalShown: boolean
  setArmorSelectionModalShown: (shown: boolean) => void
}
function ArmorSelectionModal(
  {
    armorSelectionModalShown, setArmorSelectionModalShown,
  }: ArmorSelectionModalProps,
) {
  const errorMessage = useAppSelector((state) => state.builder.errorMessage);
  const isLoading = useAppSelector((state) => state.builder.isLoading);
  const armorList = useAppSelector((state) => state.builder.armorList);
  return (
    <Modal
      modalXl
      shown={armorSelectionModalShown}
      close={() => setArmorSelectionModalShown(!armorSelectionModalShown)}
    >
      <div className="item-list">
        {isLoading && <BiLoaderCircle className="item-list__loader" />}
        {errorMessage && <div className="modal-error">{errorMessage}</div>}
        {!isLoading
          && !errorMessage
          && !armorList
          && <div className="item-list__empty">No items available yet.</div>}
        {
            armorList && armorList.map((armor) => (
              <ArmorCard
                key={armor.id}
                isSelected={false}
                armor={armor}
                showModal={setArmorSelectionModalShown}
              />
            ))
          }
      </div>
    </Modal>
  );
}

export default ArmorSelectionModal;
