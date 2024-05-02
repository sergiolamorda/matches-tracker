import { Link } from 'react-router-dom';
import styles from './MatchWidget.module.scss';
import { Card } from '../../components/Card/Card';
import type { MatchWidget } from '../../modules/matches-widgets/domain/MatchWidget';

export function MatchWidget({ matchWidget }: { matchWidget: MatchWidget }) {

  return (
    <Link to={`/matches/${matchWidget.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
      <Card isLink={true}>
        <div className={styles.matchWidget}>
          <span>{matchWidget.localName}</span>
          {matchWidget.localLogo && <img src={matchWidget.localLogo} alt={matchWidget.localName} />}
          <span>VS</span>
          {matchWidget.visitorLogo && <img src={matchWidget.visitorLogo} alt={matchWidget.visitorName} />}
          <span>{matchWidget.visitorName}</span>
        </div>
      </Card>
    </Link>
  )
}