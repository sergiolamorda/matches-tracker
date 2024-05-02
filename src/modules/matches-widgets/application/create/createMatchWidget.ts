import { MatchWidgetRepository } from "../../domain/MatchWidgetRepository";
import { MatchWidget } from "../../domain/MatchWidget";

export async function createMatchWidget(repository: MatchWidgetRepository, matchWidget: MatchWidget): Promise<void|Error> {
  await repository.save(matchWidget);  
}