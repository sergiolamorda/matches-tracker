import { MatchWidget } from "../domain/MatchWidget";
import { MatchWidgetRepository } from "../domain/MatchWidgetRepository";

export function createLocaleStorageMatchWidgetRepository(): MatchWidgetRepository {
  return {
    getAll
  }
}

async function getAll(): Promise<MatchWidget[]> {
  return Promise.resolve([])
}