import styles from './PieChart.module.scss';

export function PieChart({
  percentage,
  thickness = 10,
  color = 'orange',
  animate = true,
  width = 150,
  label,
}: {
  percentage: number,
  thickness?: number,
  color?: string,
  animate?: boolean,
  width?: number,
  label?: string,
}) {
  return (
    <div 
      className={styles.pie}
      data-animate={animate}
      style={{
        '--percentage': `${percentage}`,
        '--thickness': `${thickness}px`,
        '--color': color,
        '--width': `${width}px`,
      } as React.CSSProperties}
    >
      {label && <div>{label}</div>}
      {!label && <div>
        {percentage ? 
          (
            `${percentage.toFixed(0)}%`
          ): `0%`
        }
      </div>}
    </div>
  )
}