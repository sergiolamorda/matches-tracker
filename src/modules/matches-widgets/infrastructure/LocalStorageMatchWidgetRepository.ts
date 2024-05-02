import { MatchWidget } from "../domain/MatchWidget";
import { MatchWidgetRepository } from "../domain/MatchWidgetRepository";

export function createLocaleStorageMatchWidgetRepository(): MatchWidgetRepository {
  return {
    getAll,
    save
  }
}

async function getAll(): Promise<MatchWidget[]> {
  const matchWidgets = localStorage.getItem('matchWidget');

  if (matchWidgets) {
    return Promise.resolve(JSON.parse(matchWidgets))
  }

  return Promise.resolve([])
}

async function save(matchWidget: MatchWidget): Promise<void> {
  const currentMatchWidget = localStorage.getItem('matchWidget');

  if (!currentMatchWidget) {
    localStorage.setItem('matchWidget', JSON.stringify([matchWidget]));
    return Promise.resolve()
  }

  const matchWidgets = JSON.parse(currentMatchWidget);

  matchWidgets.push(matchWidget);

  localStorage.setItem('matchWidget', JSON.stringify(matchWidgets));

  return Promise.resolve()
}