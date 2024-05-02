import styles from './Card.module.scss';

export function Card({ 
  children,
  isLink,
}: { 
  children: React.ReactElement|React.ReactElement[],
  isLink?: boolean,
}) {
  
  return (
    <div 
      className={styles.card} 
      data-card-link={isLink}
    >
      {children}
    </div>
  )
}