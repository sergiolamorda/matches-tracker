import { Match } from '../../modules/matches/domain/Match';
import { TabsContextProvider } from '../../components/Tabs/TabsContext';
import { Tabs } from '../../components/Tabs/Tabs';
import { Tab } from '../../components/Tabs/Tab';
import { TabPanel } from '../../components/Tabs/TabPanel';
import { MatchDetailsPlayerStatsPoints } from './MatchDetailsPlayerStatsPoints';
import { MatchDetailsPlayerStatsRebound } from './MatchDetailsPlayerStatsRebound';
import { MatchDetailsPlayerStatsAssists } from './MatchDetailsPlayerStatsAssists';

import styles from './MatchDetailsPlayerStats.module.scss';

export function MatchDetailsPlayerStats({ match }: { match: Match}) {
  return (
    <TabsContextProvider defaultTab={0}>
      <div className={styles.matchDetailsPlayerStats}>
        <div className={styles.matchDetailsPlayerStats__filtersContainer}>
          <Tabs>
            <Tab tab={0} label="Puntos" />
            <Tab tab={1} label="Rebotes" />
            <Tab tab={2} label="Asistencias" />
          </Tabs>
        </div>
        <div className={styles.matchDetailsPlayerStats__teamsContainer}>
          <div className={styles.matchDetailsPlayerStats__teamContainer}>
            <img src={match.localTeam.logo} />
            <p>{match.localTeam.longName}</p>
          </div>
          <div className={styles.matchDetailsPlayerStats__teamContainer}>
            <img src={match.visitorTeam.logo} />
            <p>{match.visitorTeam.longName}</p>
          </div>
        </div>
        <div className={styles.matchDetailsPlayerStats__statsContainer}>
          <TabPanel tab={0}>
            <MatchDetailsPlayerStatsPoints match={match} />
          </TabPanel>
          <TabPanel tab={1}>
            <MatchDetailsPlayerStatsRebound match={match} />
          </TabPanel>
          <TabPanel tab={2}>
            <MatchDetailsPlayerStatsAssists match={match} />
          </TabPanel>
        </div>
      </div>
    </TabsContextProvider>
  )
}