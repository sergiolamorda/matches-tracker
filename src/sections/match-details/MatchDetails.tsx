import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MatchDetailsHeader } from './MatchDetailsHeader';
import { MatchDetailsPlayByPlay } from './MatchDetailsPlayByPlay';
import { MatchDetailsPlayerStats } from './MatchDetailsPlayerStats';
import { MatchDetailsMostPointsDifference } from './MatchDetailsMostPointsDifference'; 
import { useMatchContext } from './MatchContext';
import { Match } from '../../modules/matches/domain/Match';
import styles from './MatchDetails.module.scss';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { TabsContextProvider } from '../../components/Tabs/TabsContext';
import { Tabs } from '../../components/Tabs/Tabs';
import { Tab } from '../../components/Tabs/Tab';
import { TabPanel } from '../../components/Tabs/TabPanel';

import { SkeletonTheme } from "react-loading-skeleton";

export function MatchDetails() {
  const { matchId } = useParams() as { matchId: string };
  const { getMatch } = useMatchContext();
  const [match, setMatch] = useState<Match>();
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    const matchIdNumber = Number(matchId);

    getMatch(matchIdNumber).then((match) => {
      if (!match) {
        setLoading(false);
        return
      }

      setMatch(match);
      setLoading(false);
    })
  }, [matchId])
  
  return (    
    <>
      {!loading && !match ? 
        (
          <Section>
            <Container>
              <p>No se encontró el partido, <Link to="/">volver al inicio</Link></p>
            </Container>
          </Section>
        ):
        (
          <div className={styles.matchDetails}>
            <MatchDetailsHeader match={match} />
            <Section>
              <Container>
                <SkeletonTheme baseColor="#f3f3f3" highlightColor="#f6f6f6">
                  <TabsContextProvider defaultTab={1}>
                    <>
                      <Tabs>
                        <Tab tab={1} label="Play-By-Play" />
                        <Tab tab={2} label="Jugadores" />
                        <Tab tab={3} label="Diferencia de puntos" />
                      </Tabs>
                      <TabPanel tab={1}>
                        <MatchDetailsPlayByPlay match={match} />
                      </TabPanel>
                      <TabPanel tab={2}>
                        {match ? (
                          <MatchDetailsPlayerStats match={match} />
                        ) : (
                          <p></p>
                        )}
                      </TabPanel>
                      <TabPanel tab={3}>
                        {match ? (
                          <MatchDetailsMostPointsDifference match={match} />
                        ) : (
                          <p></p>
                        
                        )}
                      </TabPanel>
                    </>
                  </TabsContextProvider>
                </SkeletonTheme>
              </Container>
            </Section>
          </div>
        )
      }
    </>
  )
}