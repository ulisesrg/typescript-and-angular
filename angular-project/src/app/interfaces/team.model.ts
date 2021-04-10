import { Countries } from './countries.enum';
import { Player } from './player.model';

export interface Team {
  $key?: string;
  name: string;
  country: Countries;
  players: Player[] | null;
}
