import Modal from '../../../components/Modal';
import { useAppDispatch } from '../../../hooks/redux';
import { deleteUser } from '../../../store/reducers/user';

interface ProfileDeleteModalProps {
  showConfirmModal: boolean
  setShowConfirmModal: (bool: boolean) => void
  setShowSettings: (bool: boolean) => void
}
function ProfileDeleteModal({
  showConfirmModal, setShowConfirmModal, setShowSettings,
}: ProfileDeleteModalProps) {
  const dispatch = useAppDispatch();

  const handleDeleteUser = () => {
    dispatch(deleteUser());
  };
  const handleCloseDeleteModal = () => {
    setShowConfirmModal(false);
    setShowSettings(false);
  };
  return (
    <Modal
      modalXl={false}
      shown={showConfirmModal}
      close={handleCloseDeleteModal}
    >
      <div className="profile__modal-content">
        <p className="profile__modal-text">If you confirm, you will lose all informations related.</p>
        <p className="profile__modal-text">Do you still want to delete?</p>
        <div className="profile__modal-confirm">
          <button type="button" className="profile__modal__button-delete" onClick={handleDeleteUser}>Delete</button>
          <button type="button" className="profile__modal__button-cancel" onClick={handleCloseDeleteModal}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

export default ProfileDeleteModal;
