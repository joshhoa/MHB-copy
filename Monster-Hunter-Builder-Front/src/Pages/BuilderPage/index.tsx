import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { closeBuilderPopUp } from '../../store/reducers/builder';
import { closeLoadoutPopUp } from '../../store/reducers/loadout';
import WeaponTypeModal from '../../components/WeaponTypeModal';
import WeaponSelectionModal from '../../components/WeaponSelectionModal';
import ArmorSelectionModal from '../../components/ArmorSelectionModal';
import PopUpMessage from '../../components/PopUpMessage';
import ItemsSection from './ItemsSection';
import StatsSection from './StatsSection';
import BuilderSaveLoadoutModal from './BuilderSaveLoadoutModal';
import BuilderEditLoadoutModal from './BuilderEditLoadoutModal';
import './styles.scss';

function BuilderPage() {
  const dispatch = useAppDispatch();

  const [weaponTypeModalShown, setWeaponTypeModalShown] = useState(false);
  const [weaponSelectionModalShown, setWeaponSelectionModalShown] = useState(false);
  const [armorSelectionModalShown, setArmorSelectionModalShown] = useState(false);
  const [editLoadoutModalShown, setEditLoadoutModalShown] = useState(false);
  const [saveLoadoutModalShown, setSaveLoadoutModalShown] = useState(false);
  const [errorLoadout, setErrorLoadout] = useState<string>('');

  const loadoutPopUp = useAppSelector((state) => state.loadout.popUp);
  const builderPopUp = useAppSelector((state) => state.builder.popUp);

  // auto hide information popup after 2s shown
  useEffect(() => {
    setTimeout(() => {
      dispatch(closeLoadoutPopUp());
      dispatch(closeBuilderPopUp());
    }, 2000);
  }, [dispatch, loadoutPopUp.shown, builderPopUp.shown]);

  return (
    <main className="builder-main main">

      <PopUpMessage
        shown={loadoutPopUp.shown}
        message={loadoutPopUp.message}
        type={loadoutPopUp.type}
        close={() => dispatch(closeLoadoutPopUp())}
      />
      <PopUpMessage
        shown={builderPopUp.shown}
        message={builderPopUp.message}
        type={builderPopUp.type}
        close={() => dispatch(closeBuilderPopUp())}
      />

      {/* //? BUILDER ITEMS SELECTED */}
      <ItemsSection
        setArmorSelectionModalShown={setArmorSelectionModalShown}
        setWeaponSelectionModalShown={setWeaponSelectionModalShown}
        setWeaponTypeModalShown={setWeaponTypeModalShown}
      />

      {/* //? BUILDER SELECTION MODALS */}
      <section className="section-modal">
        <p className="section-modal__description">Choose an item</p>
        <WeaponTypeModal
          weaponTypeModalShown={weaponTypeModalShown}
          setWeaponTypeModalShown={setWeaponTypeModalShown}
          showSelectionModal={() => setWeaponSelectionModalShown(!weaponSelectionModalShown)}
        />
        <WeaponSelectionModal
          weaponSelectionModalShown={weaponSelectionModalShown}
          setWeaponSelectionModalShown={setWeaponSelectionModalShown}
          setWeaponTypeModalShown={setWeaponTypeModalShown}
        />
        <ArmorSelectionModal
          armorSelectionModalShown={armorSelectionModalShown}
          setArmorSelectionModalShown={setArmorSelectionModalShown}
        />
      </section>

      {/* //? STATS */}
      <StatsSection
        setErrorLoadout={setErrorLoadout}
        setSaveLoadoutModalShown={setSaveLoadoutModalShown}
        setEditLoadoutModalShown={setEditLoadoutModalShown}
      />

      {/* //? ACTION MODALS */}
      <BuilderSaveLoadoutModal
        shown={saveLoadoutModalShown}
        setShowSaveLoadoutModal={setSaveLoadoutModalShown}
        errorLoadout={errorLoadout}
        setErrorLoadout={setErrorLoadout}
      />
      <BuilderEditLoadoutModal
        shown={editLoadoutModalShown}
        setEditLoadoutModalShown={setEditLoadoutModalShown}
        errorLoadout={errorLoadout}
        setErrorLoadout={setErrorLoadout}
      />
    </main>
  );
}

export default BuilderPage;
