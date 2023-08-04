import { ChangeEvent, useId } from 'react';
import './styles.scss';

interface FieldProps {
  disabled: boolean
  value: string;
  type?: string;
  placeholder: string;
  onChange: (value: string) => void;
  children?: React.ReactNode;
}

function Field({
  disabled,
  value,
  type,
  placeholder,
  onChange,
  children,
}: FieldProps) {
  const inputId = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <div className={value.length > 0 ? 'field field--has-content' : 'field'}>
      <input
        // React - state
        value={value}
        onChange={handleChange}
        // base infos
        id={inputId}
        type={type}
        className="field-input"
        placeholder={placeholder}
        disabled={disabled}
      />

      <label
        htmlFor={inputId}
        className="field-label"
      >
        {placeholder}
      </label>
      {children}
    </div>
  );
}

Field.defaultProps = {
  type: 'text',
  children: undefined,
};

export default Field;
