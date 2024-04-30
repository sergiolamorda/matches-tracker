import { MatchWidget } from './MatchWidget';

export interface MatchWidgetRepository {
  getAll: () => Promise<MatchWidget[]>;
  save: (matchWidget: MatchWidget) => Promise<void>;
}