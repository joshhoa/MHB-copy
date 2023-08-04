import { AiOutlineCloseCircle } from 'react-icons/ai';
import './styles.scss';
import cn from 'classnames';

interface PopUpProps {
  shown: boolean
  message: string
  type: 'error' | 'success' | 'neutral'
  close: () => void
}
function PopUpMessage({
  message, type, shown, close,
}: PopUpProps) {
  const popupClassnames = cn('popup', {
    'popup-active': shown,
    'popup-error': type === 'error',
    'popup-success': type === 'success',
    'popup-neutral': type === 'neutral',
  });

  return (
    <div className={popupClassnames}>
      {message}
      <button type="button" className="popup-close" onClick={close}><AiOutlineCloseCircle className="popup-close__icon" /></button>
    </div>
  );
}

export default PopUpMessage;
