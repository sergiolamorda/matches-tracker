import styles from './Button.module.scss';

export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false, 
  type = 'button',
  fullwidth = false,
}: {
  children: React.ReactNode, 
  onClick?: () => void,
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark' | 'disabled', 
  size?: 'large' | 'medium' | 'small', 
  disabled?: boolean,
  type?: 'button' | 'submit' | 'reset',
  fullwidth?: boolean,
}) {
  return (
    <button 
      type={type}
      className={styles.button} 
      onClick={onClick} 
      data-variant={variant} 
      data-size={size}
      disabled={disabled} 
      data-full-width={fullwidth}
    >
      {children}
    </button>
  )
}
