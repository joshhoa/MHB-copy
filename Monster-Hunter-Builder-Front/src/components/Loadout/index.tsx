import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { MdContentCopy } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import { FaEdit } from 'react-icons/fa';
import { IIcons } from '../../@types/icons';
import { ILoadout } from '../../@types/loadout';
import getIconByKey from '../../utils/icons';
import './styles.scss';
import Modal from '../Modal';
import { useAppDispatch } from '../../hooks/redux';
import { deleteLoadout, setEditMode } from '../../store/reducers/loadout';
import { fetchLoadoutItems, resetBuilder } from '../../store/reducers/builder';
import { setSharpnessWidth } from '../../utils/weapon';

interface LoadoutProps {
  loadout: ILoadout
  isOnProfilePage: boolean
}
function Loadout({ loadout, isOnProfilePage }: LoadoutProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);
  const [deleteLoadoutModalShown, setDeleteLoadoutModalShown] = useState(false);
  const copyButtonClassnames = cn('loadout-code__copy-button', {
    clicked,
  });

  function handleDeleteLoadout(): void {
    dispatch(deleteLoadout(loadout.id));
    setDeleteLoadoutModalShown(false);
    dispatch(setEditMode({
      isEditMode: false,
      editLoadoutId: '',
      title: '',
      description: '',
    }));
    dispatch(resetBuilder());
  }
  function handleEditLoadout(): void {
    dispatch(fetchLoadoutItems({
      weaponId: loadout.weapon_id,
      headId: loadout.head_id || 0,
      chestId: loadout.chest_id || 0,
      armsId: loadout.arms_id || 0,
      waistId: loadout.waist_id || 0,
      legsId: loadout.legs_id || 0,
    }));
    // dispatch(importLoadoutById(loadout.id));
    dispatch(setEditMode({
      isEditMode: true,
      editLoadoutId: loadout.id,
      title: loadout.name,
      description: loadout.description,
    }));
    navigate('/builder');
  }

  return (
    <li className="loadout-container">
      <div className="loadout__main">
        <div className="loadout__header">
          <img src={getIconByKey(loadout.icon as keyof IIcons)} className="loadout__weapon-icon" alt="icon" />
          <div className="loadout__header-identity">
            <div className="loadout__header-title">{loadout.name}</div>
            <span className="loadout-author">{loadout.username}</span>
            <div className="loadout-code">
              <p className="loadout-code__description">{`Code: ${loadout.id}`}</p>
              {/* button below can copy loadout code to clipboard */}
              <button
                type="button"
                className={copyButtonClassnames}
                onClick={() => navigator.clipboard.writeText(loadout.id)}
                onMouseDown={() => setClicked(true)}
                onMouseUp={() => setClicked(false)}
              >
                <MdContentCopy />
              </button>
            </div>
            <div className="sharpness">

              {/* // Then set the width of the sharpness */}
              <div className="sharpness-red" style={{ width: `${setSharpnessWidth(loadout?.stats?.sharpness.red)}%` }} />
              <div className="sharpness-orange" style={{ width: `${setSharpnessWidth(loadout?.stats?.sharpness.orange)}%` }} />

              <div className="sharpness-yellow" style={{ width: `${setSharpnessWidth(loadout?.stats?.sharpness.yellow)}%` }} />

              <div className="sharpness-green" style={{ width: `${setSharpnessWidth(loadout?.stats?.sharpness.green)}%` }} />

              <div className="sharpness-blue" style={{ width: `${setSharpnessWidth(loadout?.stats?.sharpness.blue)}%` }} />

              <div className="sharpness-white" style={{ width: `${setSharpnessWidth(loadout?.stats?.sharpness.white)}%` }} />

              <div className="sharpness-purple" style={{ width: `${setSharpnessWidth(loadout?.stats?.sharpness.purple)}%` }} />

            </div>
          </div>
        </div>

        <div className="loadout__footer">
          <ul className="loadout__footer__skill-list">
            {loadout.stats?.skills?.map((skill) => (
              <li
                key={skill?.id}
                className="loadout__footer__skill-tag"
                style={{ backgroundColor: `${skill.color}` }}
              >
                {`${skill?.name} ${skill?.level}`}
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="loadout-aside">
        <div className="loadout__stats">
          <img src={getIconByKey('attack')} alt="attack icon" className="loadout__stats-icon" />
          <div className="loadout__stats-value">{Math.round(Number(loadout.stats?.attack))}</div>
        </div>
        <div className="loadout__stats">
          <img src={getIconByKey('affinity')} alt="affinity icon" className="loadout__stats-icon" />
          <div className="loadout__value">
            {loadout?.stats?.affinity}
            %
          </div>
        </div>
        {loadout.stats?.elements.map((element) => {
          if (element) {
            return (
              <div key={element?.name} className="loadout__stats">
                <img src={getIconByKey(`element_${element?.name}` as keyof IIcons)} alt={`${element?.name} icon`} className="loadout__stats-icon" />
                <div className="loadout__value">{element?.value}</div>
              </div>
            );
          }
          return false;
        })}
        <div className="loadout__stats">
          <img src={getIconByKey('defense')} alt="defense icon" className="loadout__stats-icon" />
          <div className="loadout__value">{loadout.stats?.defense}</div>
        </div>
      </div>
      {isOnProfilePage
        && (
          <button type="button" className="loadout__delete" onClick={() => setDeleteLoadoutModalShown(true)}>
            <FiTrash2 className="loadout__delete-icon" />
          </button>
        )}
      {isOnProfilePage
        && (
          <button type="button" className="loadout__edit" onClick={handleEditLoadout}>
            <FaEdit className="loadout__edit-icon" />
          </button>
        )}
      <Modal
        modalXl={false}
        shown={deleteLoadoutModalShown}
        close={() => setDeleteLoadoutModalShown(false)}
      >
        <div className="profile__modal-content">
          <p className="profile__modal-text">
            Do you confirm deletion of loadout &quot;
            {loadout.name}
            &quot; ?
          </p>
          <div className="profile__modal-confirm">
            <button type="button" className="profile__modal__button-delete" onClick={handleDeleteLoadout}>Delete</button>
            <button type="button" className="profile__modal__button-cancel" onClick={() => setDeleteLoadoutModalShown(false)}>Cancel</button>
          </div>
        </div>
      </Modal>
    </li>
  );
}

export default Loadout;
