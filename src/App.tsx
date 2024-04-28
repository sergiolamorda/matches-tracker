import { Router } from './Router';

import { MatchesWidgetsContextProvider } from './sections/matches-widgets/MatchesWidgetsContext';
import { MatchContextProvider } from './sections/match-details/MatchContext';

import { createLocaleStorageMatchWidgetRepository } from './modules/matches-widgets/infrastructure/LocalStorageMatchWidgetRepository';
import { createAcbApiMatchRepository } from './modules/matches/infrastructure/AcbApiMatchRepository';

const matchWidgetRepository = createLocaleStorageMatchWidgetRepository();
const matchRepository = createAcbApiMatchRepository();

function App() {
  return (
    <>
      <MatchesWidgetsContextProvider repository={matchWidgetRepository}>
        <MatchContextProvider repository={matchRepository}>
          <Router />
        </MatchContextProvider>
      </MatchesWidgetsContextProvider>
    </>
  )
}

export default App
