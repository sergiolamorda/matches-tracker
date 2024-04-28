import { MatchWidget } from './MatchWidget';

export interface MatchWidgetRepository {
  getAll: () => Promise<MatchWidget[]>;
}