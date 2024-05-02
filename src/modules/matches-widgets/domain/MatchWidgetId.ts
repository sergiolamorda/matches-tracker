export function isMatchWidgetIdValid(id: number): boolean {
  if (isNaN(id)) {
    return false;
  }

  if (id <= 0) {
    return false;
  }

  return true;
}

export function MatchWidgetIdNotValidError(id: number): Error {
  return new Error(`Id ${id} is not valid`);
}