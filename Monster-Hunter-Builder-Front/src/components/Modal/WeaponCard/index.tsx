/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// enable div to be clicked

import '../items.scss';
import './styles.scss';
import { useState } from 'react';
import cn from 'classnames';
import { MdFileDownloadDone } from 'react-icons/md';
import getIconByKey from '../../../utils/icons';
import { IWeapon } from '../../../@types/weapon';
import { useAppDispatch } from '../../../hooks/redux';
import { setBuilderWeapon } from '../../../store/reducers/builder';
import { setSharpnessWidth } from '../../../utils/weapon';
import { IIcons } from '../../../@types/icons';

interface WeaponCardProps {
  weapon: IWeapon
  showModal: (shown: boolean) => void
  isSelected: boolean
}
function WeaponCard({ weapon, showModal, isSelected }: WeaponCardProps) {
  const dispatch = useAppDispatch();

  // when click on a weapon, shows extra information
  const [showExtra, setShowExtra] = useState(false);

  function handleSetWeapon(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.stopPropagation();
    dispatch(setBuilderWeapon(weapon));
    showModal(false);
  }

  // Set dynamic classnames
  const containerClassnames = cn('item-card', {
    'item-card__selected': isSelected,
  });

  return (
    <div className={containerClassnames} onClick={() => setShowExtra(!showExtra)}>
      <div className="item-card__header">
        <div className="item-card__header-identity">
          <img src={getIconByKey(weapon.icon as keyof IIcons)} className="item__icon" alt="icon" />
          <div className="item-card__header-title">{weapon.name}</div>
        </div>
        <div className="item-card__header-decorations">
          <img src={getIconByKey('decoration_1')} alt="decoration icon" />
          <img src={getIconByKey('decoration_1')} alt="decoration icon" />
          <img src={getIconByKey('decoration_1')} alt="decoration icon" />
        </div>
      </div>
      <div className="item-card__content">
        <div className="item-stats__weapon">
          <div className="item-stats__neutral">
            <img src={getIconByKey('attack')} alt="attack icon" />
            <div className="item-stats__value">{weapon.attack}</div>
          </div>
          <div className="item-stats__elements">
            {weapon.elements?.map((element) => (
              <div key={element?.name} className="item-stats__elements-one">
                <img src={getIconByKey(`element_${element?.name}` as keyof IIcons)} alt={element?.name} />
                <div>{element?.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="item-stats__other">
          <div className="item-stats">
            <img src={getIconByKey('affinity')} alt="affinity icon" />
            <div className="item-stats__value">{`${weapon.affinity}%`}</div>
          </div>
          <div className="item-stats">
            <img src={getIconByKey('defense')} alt="defense icon" />
            <div className="item-stats__value">{weapon.defense_bonus}</div>
          </div>
        </div>
      </div>
      <div className="item-card__footer">
        <div className="sharpness">

          {/* // Then set the width of the sharpness */}
          <div className="sharpness-red" style={{ width: `${setSharpnessWidth(weapon.sharpness.red)}%` }} />
          <div className="sharpness-orange" style={{ width: `${setSharpnessWidth(weapon.sharpness.orange)}%` }} />

          <div className="sharpness-yellow" style={{ width: `${setSharpnessWidth(weapon.sharpness.yellow)}%` }} />

          <div className="sharpness-green" style={{ width: `${setSharpnessWidth(weapon.sharpness.green)}%` }} />

          <div className="sharpness-blue" style={{ width: `${setSharpnessWidth(weapon.sharpness.blue)}%` }} />

          <div className="sharpness-white" style={{ width: `${setSharpnessWidth(weapon.sharpness.white)}%` }} />

          <div className="sharpness-purple" style={{ width: `${setSharpnessWidth(weapon.sharpness.purple)}%` }} />

        </div>
        {!isSelected
          && (
          <button type="button" className="item-card__button-add" onClick={handleSetWeapon}>
            Set
            {' '}
            <MdFileDownloadDone />
          </button>
          )}
      </div>
      {showExtra && !isSelected
        && (
        <div className="item-card__extra">
          {/* eslint-disable-next-line max-len */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis blanditiis mollitia repellendus exercitationem! Eos, est. Odit fugit, illum a autem sapiente impedit adipisci reprehenderit ducimus sunt animi!
        </div>
        )}
    </div>
  );
}

export default WeaponCard;
