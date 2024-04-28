import { isMatchWidgetIdValid, MatchWidgetIdNotValidError } from "./MatchWidgetId";

export interface MatchWidget {
  id: number;
}

export function ensureMatchIsValid({ id }: MatchWidget): void {
  if (!isMatchWidgetIdValid) {
    throw MatchWidgetIdNotValidError(id);
  }
}