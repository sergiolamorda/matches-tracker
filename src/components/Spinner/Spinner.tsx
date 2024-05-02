import styles from './Spinner.module.scss';

export function Spinner({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  return (
    <span className={styles.spinner} data-size={size} />
  );
}