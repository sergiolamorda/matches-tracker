
export function MatchWidgetAlredyExistsError(): Error {
  return new Error('Match widget already exists');
}