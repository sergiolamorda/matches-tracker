
import styles from './Input.module.scss';

export function Input({
  type = 'text',
  value,
  id,
  onChange,
  placeholder,
  label,
  error,
  size,
  fullWidth = true,
  name,
  autoComplete,
  ...props
}: {
  type?: 'text' | 'password' | 'number' | 'email';
  value?: string;
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string|null;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  autoComplete?: string;
  name?: string;
}) {
  return (
    <div className={styles.inputWrapper} data-size={size} data-full-width={fullWidth}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        autoComplete={autoComplete}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}