import styles from './Form.module.scss';

export function Form({
  children,
  onSubmit,
}: { 
  children: React.ReactNode | React.ReactNode[],
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void,
}) {

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {children}
    </form>
  );
}