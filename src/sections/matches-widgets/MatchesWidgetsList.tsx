import { useMatchesWidgetsContext } from "./MatchesWidgetsContext";

import { Section } from "../layout/Section";
import { MatchWidget } from "./MatchWidget";

import styles from './MatchesWidgetsList.module.scss';

export function MatchesWidgetsList() {
  const { matchesWidgets } = useMatchesWidgetsContext();

  return (
    <Section>
      <>
        <h1>Mis partidos</h1>
        <section className={styles.container}>
          {matchesWidgets.map((matchWidget) => (
            <MatchWidget key={`match-widget-${matchWidget}`} matchWidget={matchWidget} />
          ))}
        </section>
      </>
    </Section>
  )
}