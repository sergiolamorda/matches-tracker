import { MatchWidgetRepository } from "../../domain/MatchWidgetRepository";
import { MatchWidget } from "../../domain/MatchWidget";
import { MatchWidgetAlredyExistsError } from "../../domain/MatchWidgetAlredyExistsError";

export async function createMatchWidget(repository: MatchWidgetRepository, matchWidget: MatchWidget): Promise<void|Error> {
  const allMatchesWidgets = await repository.getAll();

  if (allMatchesWidgets.find((widget) => widget.id === matchWidget.id)) {
    return Promise.resolve(MatchWidgetAlredyExistsError());
  }

  await repository.save(matchWidget);  
}