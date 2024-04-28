import { Link, useParams } from 'react-router-dom';

import { Section } from "../layout/Section";

export function MatchDetails() {
  const { matchId } = useParams() as { matchId: string };

  if (!matchId === undefined) {
    return;
  }

  
  return (
    <Section>
      <div>
        <Link to={`/`}>Atrás</Link>
        <h1>Detalles del partido</h1>
      </div>
      
    </Section>
  )
}