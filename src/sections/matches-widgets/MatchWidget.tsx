import { Link } from 'react-router-dom';
import styles from './MatchWidget.module.scss';
import { Card } from '../../components/Card/Card';
import type { MatchWidget } from '../../modules/matches-widgets/domain/MatchWidget';

export function MatchWidget({ matchWidget }: { matchWidget: MatchWidget }) {

  return (
    <Link to={`/matches/${matchWidget.id}`}>
      <Card>
        <div className={styles.container}>
          {matchWidget.id}
        </div>
      </Card>
    </Link>
  )
}