import styles from './Button.module.scss';

export function Button(
  { children, onClick, variant = 'primary', size = 'medium', shape = 'rounded', shadow = false, uppercase = false, disabled = false }: {
    children: React.ReactNode, 
    onClick: () => void,
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark' | 'disabled', 
    size?: 'large' | 'medium' | 'small', 
    shape?: 'block' | 'rounded' | 'circle', 
    shadow?: boolean, 
    uppercase?: boolean,
    disabled?: boolean
  }) {
  return (
    <button className={styles.button} onClick={onClick} data-variant={variant} data-size={size} data-shape={shape} data-shadow={shadow} data-uppercase={uppercase} disabled={disabled}>
      {children}
    </button>
  )
}
