import { MatchWidget } from "../domain/MatchWidget";
import { MatchWidgetRepository } from "../domain/MatchWidgetRepository";

export function createLocaleStorageMatchWidgetRepository(): MatchWidgetRepository {
  return {
    getAll,
    save
  }
}

async function getAll(): Promise<MatchWidget[]> {
  return Promise.resolve([])
}

async function save(matchWidget: MatchWidget): Promise<void> {
  return Promise.resolve()
}