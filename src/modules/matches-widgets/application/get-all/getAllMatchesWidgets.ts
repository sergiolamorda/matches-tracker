import { MatchWidget } from "../../domain/MatchWidget";
import { MatchWidgetRepository } from "../../domain/MatchWidgetRepository";

export async function getAllMatchesWidgets(repository: MatchWidgetRepository): Promise<MatchWidget[]> {
  return repository.getAll();
}