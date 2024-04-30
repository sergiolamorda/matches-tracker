import { useMatchesWidgetsContext } from "./MatchesWidgetsContext";

import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { MatchWidget } from "./MatchWidget";
import { AddMatchWidgetForm } from "./AddMatchWidgetForm";

import styles from './MatchesWidgetsList.module.scss';

export function MatchesWidgetsList() {
  const { matchesWidgets } = useMatchesWidgetsContext();

  return (
    <Section>
      <Container>
        <>
          <h1>Mis partidos</h1>
          <section className={styles.container}>
            {matchesWidgets.map((matchWidget) => (
              <MatchWidget key={`match-widget-${matchWidget.id}`} matchWidget={matchWidget} />
            ))}
            <AddMatchWidgetForm />

          </section>
        </>
      </Container>
    </Section>
  )
}