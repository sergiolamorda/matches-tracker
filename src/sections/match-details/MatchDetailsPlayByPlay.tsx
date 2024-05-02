import Skeleton from "react-loading-skeleton";

import { Match } from "../../modules/matches/domain/Match";
import { Tabs } from "../../components/Tabs/Tabs";
import { Tab } from "../../components/Tabs/Tab";
import { TabsContextProvider } from "../../components/Tabs/TabsContext";
import { TabPanel } from "../../components/Tabs/TabPanel";
import { MatchDetailsPlayByPlayEvents } from "./MatchDetailsPlayByPlayEvents";
import { Button } from "../../components/Button/Button";

import styles from './MatchDetailsPlayByPlay.module.scss';
import { getPlayByPlayEvents } from "../../modules/matches/application/get/getPlayByPlayEvents";

export function MatchDetailsPlayByPlay({ match }: { match: Match|undefined }) {
  
  return (
    <TabsContextProvider defaultTab={1}>
      <div className={styles.matchDetailsPlayByPlay}>
        <div id="periods-filters" className={styles.matchDetailsPlayByPlay__filtersContainer}>
          <Tabs>
            <>
              {match ? 
                (
                  match.periods.map((period) => 
                    <Tab key={`period-tab-${period.id}`} tab={period.id} label={`${period.id}P`} />
                  )
                ) : (
                  Array.from({ length: 4 }, (_, i) => i + 1).map((period) =>
                    <Skeleton key={`period-tab-${period}`} width={50} height={30} />
                  )
                )            
              }          
            </>
            <Tab tab={0} label="Todas las partes" />
          </Tabs>
        </div>
        <div className={styles.matchDetailsPlayByPlay__teamsContainer}>
          <div className={styles.matchDetailsPlayByPlay__teamContainer}>
            {
              match ? (
                <>
                  <img src={match.localTeam.logo} />
                  <p>{match.localTeam.longName}</p>
                </>
              ): (
                <>
                  <Skeleton width={50} height={50} />
                  <Skeleton width={100} height={20} />
                </>
              )
            }            
          </div>
          <div className={styles.matchDetailsPlayByPlay__teamContainer}>
            {
              match ? (
                <>
                  <img src={match.visitorTeam.logo} />
                  <p>{match.visitorTeam.longName}</p>
                </>
              ) : (
                <>
                  <Skeleton width={50} height={50} />
                  <Skeleton width={100} height={20} />
                </>
              )
            }            
          </div>
        </div>
        {<div className={styles.matchDetailsPlayByPlay__playsContainer}>
          {match ?
            (
              match.periods.map((period) => 
                <TabPanel key={`period-panel-${period.id}`} tab={period.id}>
                  <MatchDetailsPlayByPlayEvents matchEvents={getPlayByPlayEvents(period.events)} />
                </TabPanel>
              )
            ): (
              Array.from({ length: 4 }, (_, i) => i + 1).map((period) =>
                <TabPanel key={`period-panel-${period}`} tab={period}>
                  <MatchDetailsPlayByPlayEvents matchEvents={Array.from({ length: 10 }, () => undefined)} />
                </TabPanel>
              )
            )
          }

          {match && (
            <>
              <TabPanel tab={0}>
                <MatchDetailsPlayByPlayEvents matchEvents={getPlayByPlayEvents(match.periods.flatMap((period) => period.events))} />
              </TabPanel>
              <Button onClick={() => document.getElementById('periods-filters')?.scrollIntoView({ behavior: 'smooth' })} variant="secondary" size="medium">
                Volver Arriba
              </Button>
            </>
          )}
        </div>}
      </div>
    </TabsContextProvider>
  )
}