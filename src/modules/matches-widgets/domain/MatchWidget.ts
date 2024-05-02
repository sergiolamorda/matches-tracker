import { isMatchWidgetIdValid, MatchWidgetIdNotValidError } from "./MatchWidgetId";

export interface MatchWidget {
  id: number;
  localLogo: string;
  localName: string;
  visitorLogo: string;
  visitorName: string;
}

export function ensureMatchIsValid({ id }: MatchWidget): void {
  if (!isMatchWidgetIdValid) {
    throw MatchWidgetIdNotValidError(id);
  }
}