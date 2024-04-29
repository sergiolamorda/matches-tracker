import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MatchDetailsHeader } from './MatchDetailsHeader';
import { MatchDetailsPlayByPlay } from './MatchDetailsPlayByPlay';
import { useMatchContext } from './MatchContext';
import { Match } from '../../modules/matches/domain/Match';
import styles from './MatchDetails.module.scss';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { TabsContextProvider } from '../../components/Tabs/TabsContext';
import { Tabs } from '../../components/Tabs/Tabs';
import { Tab } from '../../components/Tabs/Tab';
import { TabPanel } from '../../components/Tabs/TabPanel';

export function MatchDetails() {
  const { matchId } = useParams() as { matchId: string };
  const { getMatch } = useMatchContext();
  const [match, setMatch] = useState<Match>();
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState();

  if (!matchId === undefined) {
    return;
  }

  useEffect(() => {
    setLoading(true);
    const matchIdNumber = Number(matchId);

    getMatch(matchIdNumber).then((match) => {
      if (!match) {
        setLoading(false);
        return
      }

      console.log(match);
      setMatch(match);
      setLoading(false);
    })
  }, [matchId])
  
  return (    
    <>
      {loading && (
        <p>Loading...</p>
      )}
      {!loading && match && (
        <div className={styles.matchDetails}>
          <MatchDetailsHeader match={match} />
          <Section>
            <Container>
              <TabsContextProvider defaultTab={1}>
                <>
                  <Tabs>
                    <Tab tab={1} label="Play-By-Play" />
                    <Tab tab={2} label="Jugadores" />
                    <Tab tab={3} label="Diferencia" />
                  </Tabs>
                  <TabPanel tab={1}>
                    <MatchDetailsPlayByPlay match={match} />
                  </TabPanel>
                  <TabPanel tab={2}>
                    <p>Hola 2</p>
                  </TabPanel>
                  <TabPanel tab={3}>
                    <p>Hola 3</p>
                  </TabPanel>
                </>
              </TabsContextProvider>
            </Container>
          </Section>
        </div>
      )}
    </>
  )
}