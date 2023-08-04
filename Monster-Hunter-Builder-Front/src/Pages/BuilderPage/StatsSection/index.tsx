import { useEffect } from 'react';
import ArmorStats from '../../../components/ArmorStats';
import AttackStats from '../../../components/AttackStats';
import SkillStats from '../../../components/SkillStats';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getBuilderStats, resetBuilder } from '../../../store/reducers/builder';
import { changeLoadoutCredentialsField, setEditMode } from '../../../store/reducers/loadout';

interface StatsSectionProps {
  setErrorLoadout: (str: string) => void
  setSaveLoadoutModalShown: (bool: boolean) => void
  setEditLoadoutModalShown: (bool: boolean) => void
}

function StatsSection({
  setErrorLoadout, setSaveLoadoutModalShown, setEditLoadoutModalShown,
}: StatsSectionProps) {
  const dispatch = useAppDispatch();

  const weapon = useAppSelector((state) => state.builder.weapon);
  const arms = useAppSelector((state) => state.builder.arms);
  const head = useAppSelector((state) => state.builder.head);
  const chest = useAppSelector((state) => state.builder.chest);
  const legs = useAppSelector((state) => state.builder.legs);
  const waist = useAppSelector((state) => state.builder.waist);

  const loadoutEdit = useAppSelector((state) => state.loadout.edit);
  const handleResetBuilder = () => {
    dispatch(resetBuilder());
    dispatch(setEditMode({
      isEditMode: false,
      editLoadoutId: '',
      title: '',
      description: '',
    }));
  };

  const handleShowSaveModal = () => {
    setErrorLoadout('');
    setSaveLoadoutModalShown(true);
    // empty the fields
    dispatch(changeLoadoutCredentialsField({ value: '', field: 'title' }));
    dispatch(changeLoadoutCredentialsField({ value: '', field: 'description' }));
  };

  const handleShowEditLoadoutModal = () => {
    setEditLoadoutModalShown(true);
    // Auto set the fields with current value for title and description
    // It enables user to modify tiny parts instead of rewriting all the text
    dispatch(changeLoadoutCredentialsField({ value: loadoutEdit.title, field: 'title' }));
    dispatch(changeLoadoutCredentialsField({ value: loadoutEdit.description, field: 'description' }));
  };

  // Get stats from the API on every builder update
  useEffect(() => {
    dispatch(getBuilderStats());
  }, [dispatch, weapon, arms, head, chest, legs, waist]);

  return (
    <section className="section-stats">
      <AttackStats />
      <SkillStats />
      <ArmorStats />
      <button type="button" className="section-stats__button" onClick={handleResetBuilder}>Reset builder</button>
      <button type="button" className="section-stats__button" onClick={handleShowSaveModal}>Save as new loadout</button>

      {/* Displays an edit button when user is on edit mode */}
      {loadoutEdit.isEditMode
          && (
          <button type="button" className="section-stats__button" onClick={handleShowEditLoadoutModal}>
            Save edit on loadout
            {' '}
            <span className="section-stats__button-edit__code">{loadoutEdit.editLoadoutId}</span>
          </button>
          )}
    </section>
  );
}

export default StatsSection;
