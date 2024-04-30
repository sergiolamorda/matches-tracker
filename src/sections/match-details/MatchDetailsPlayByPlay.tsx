import { ReactElement, useMemo } from "react";
import { Match } from "../../modules/matches/domain/Match";
import { Tabs } from "../../components/Tabs/Tabs";
import { Tab } from "../../components/Tabs/Tab";
import { TabsContextProvider } from "../../components/Tabs/TabsContext";
import { TabPanel } from "../../components/Tabs/TabPanel";
import { MatchDetailsPlayByPlayEvents } from "./MatchDetailsPlayByPlayEvents";
import { Button } from "../../components/Button/Button";

import styles from './MatchDetailsPlayByPlay.module.scss';
import { getPlayByPlayEvents } from "../../modules/matches/application/get/getPlayByPlayEvents";

export function MatchDetailsPlayByPlay({ match }: { match: Match }) {
  
  return (
    <TabsContextProvider defaultTab={1}>
      <div className={styles.matchDetailsPlayByPlay}>
        <div id="periods-filters" className={styles.matchDetailsPlayByPlay__filtersContainer}>
          <Tabs>
            <>
              {match.periods.map((period) => 
                <Tab key={`period-tab-${period.id}`} tab={period.id} label={`${period.id}P`} />
              )}
            </>
            <Tab tab={0} label="Todas las partes" />
          </Tabs>
        </div>
        <div className={styles.matchDetailsPlayByPlay__teamsContainer}>
          <div className={styles.matchDetailsPlayByPlay__teamContainer}>
            <img src={match.localTeam.logo} />
            <p>{match.localTeam.longName}</p>
          </div>
          <div className={styles.matchDetailsPlayByPlay__teamContainer}>
            <img src={match.visitorTeam.logo} />
            <p>{match.visitorTeam.longName}</p>
          </div>
        </div>
        <div className={styles.matchDetailsPlayByPlay__playsContainer}>
          {match.periods.map((period) => 
            <TabPanel key={`period-panel-${period.id}`} tab={period.id}>
              <MatchDetailsPlayByPlayEvents matchEvents={getPlayByPlayEvents(period.events)} match={match} />
            </TabPanel>
          )}
          <TabPanel tab={0}>
            <MatchDetailsPlayByPlayEvents matchEvents={getPlayByPlayEvents(match.periods.flatMap((period) => period.events))} match={match} />
          </TabPanel>
          <Button onClick={() => document.getElementById('periods-filters')?.scrollIntoView({ behavior: 'smooth' })} variant="secondary" size="medium" shape="rounded" shadow uppercase>
            Volver Arriba
          </Button>
        </div>
      </div>
    </TabsContextProvider>
  )
}