import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BiLoaderCircle } from 'react-icons/bi';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserLoadouts } from '../../store/reducers/loadout';
import {
  changeEditCredentialsField, checkTokenValidity, logout,
} from '../../store/reducers/user';
import getIconByKey from '../../utils/icons';
import Loadout from '../../components/Loadout';
import ProfileEditModal from './ProfileEditModal';
import ProfileDeleteModal from './ProfileDeleteModal';
import './styles.scss';

function ProfilePage() {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const username = useAppSelector((state) => state.user.username);
  const loadouts = useAppSelector((state) => state.loadout.loadouts);
  const isLoading = useAppSelector((state) => state.loadout.isLoading);

  const [showSettings, setShowSettings] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleShowEditModal = () => {
    setShowEditModal(true);
    dispatch(changeEditCredentialsField({ value: username }));
  };

  // Automatic fetch loadouts when reach /profile
  useEffect(() => {
    dispatch(fetchUserLoadouts());
  }, [dispatch]);

  // This function will check if token is still valid. if not, will be automatically disconnected.
  useEffect(() => {
    dispatch(checkTokenValidity());
  }, [dispatch]);

  return (
    <main className="main">
      {!isLogged && <Navigate to="/login" />}
      {isLogged
          && (
          <div className="profile">
            <h2 className="profile-title">Profile Page</h2>
            <div className="profile-header">
              <div className="profile-header__identity">
                <img src={getIconByKey('villager')} alt="Profile avatar" className="profile-header__avatar" />
                <h3 className="profile-pseudo">{username}</h3>
              </div>
              <div className="profile-header__actions">
                <button type="button" className="profile-header__logout" onClick={handleLogout}>
                  Logout
                  {' '}
                  <FiLogOut />
                </button>
                <button type="button" className="profile-header__settings" onClick={() => setShowSettings(!showSettings)}>
                  Settings
                  {' '}
                  <FiSettings />
                  {' '}
                </button>
                {showSettings
                    && (
                      <div className="profile-header__settings-actions">
                        <button
                          type="button"
                          className="profile-header__settings-actions__edit"
                          onClick={handleShowEditModal}
                        >
                          Edit Profile
                        </button>
                        <button
                          type="button"
                          className="profile-header__settings-actions__delete"
                          onClick={() => setShowConfirmModal(true)}
                        >
                          Delete Profile
                        </button>
                        <button
                          type="button"
                          className="profile-header__settings-actions__cancel"
                          onClick={() => setShowSettings(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                {/* Delete profile */}
                <ProfileDeleteModal
                  showConfirmModal={showConfirmModal}
                  setShowConfirmModal={setShowConfirmModal}
                  setShowSettings={setShowSettings}
                />

                {/* Edit profile */}
                <ProfileEditModal
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  setShowSettings={setShowSettings}
                />
              </div>
            </div>
            <div className="profile-divider" />
            <div className="profile-content">
              <h3>My loadouts</h3>
              {isLoading && <BiLoaderCircle className="profile-content__loader" />}
              {!isLoading

              && (
                <ul className="profile-content__list">
                  {loadouts && loadouts.map((loadout) => (
                    <Loadout key={loadout.id} loadout={loadout} isOnProfilePage />

                  ))}
                </ul>
              )}
            </div>
          </div>
          )}
    </main>
  );
}

export default ProfilePage;
