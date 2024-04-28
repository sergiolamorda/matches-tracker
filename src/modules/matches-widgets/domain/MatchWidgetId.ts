
export function isMatchWidgetIdValid(id: number): boolean {
  return true;
}

export function MatchWidgetIdNotValidError(id: number): Error {
  return new Error(`Id ${id} is not valid`);
}