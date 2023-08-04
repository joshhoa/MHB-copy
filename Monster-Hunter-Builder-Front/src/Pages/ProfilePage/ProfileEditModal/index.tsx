import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { changeEditCredentialsField, editUser, resetEditForm } from '../../../store/reducers/user';
import EditForm from '../../../components/EditForm';
import Modal from '../../../components/Modal';

interface ProfileEditModalProps {
  showEditModal: boolean
  setShowEditModal: (bool: boolean) => void
  setShowSettings: (bool: boolean) => void
}

function ProfileEditModal({
  showEditModal, setShowSettings, setShowEditModal,
}: ProfileEditModalProps) {
  const dispatch = useAppDispatch();

  const usernameEdit = useAppSelector((state) => state.user.editCredentials.username);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setShowSettings(false);
    dispatch(resetEditForm());
  };

  const handleChangeEditCredentials = (value: string) => {
    dispatch(changeEditCredentialsField({
      value,
    }));
  };

  const handleEditUser = () => {
    dispatch(editUser());
    setShowEditModal(false);
  };

  return (
    <Modal
      modalXl={false}
      shown={showEditModal}
      close={handleCloseEditModal}
    >
      <div className="profile__modal-content">
        <EditForm
          username={usernameEdit}
          changeField={handleChangeEditCredentials}
          handleEdit={handleEditUser}
        />
      </div>
    </Modal>
  );
}

export default ProfileEditModal;
