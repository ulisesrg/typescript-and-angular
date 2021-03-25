import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from '../interfaces/team.model';

export const TeamsTableHeaders = ['name', 'country', 'teams'];

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamsDb: AngularFireList<Team>;

  constructor(private db: AngularFireDatabase) {
    this.teamsDb = this.db.list('/teams', (ref) => ref.orderByChild('name'));
  }

  getTeams(): Observable<Team[]> {
    return this.teamsDb.snapshotChanges().pipe(
      map((changes) => {
        return changes.map(
          (c) =>
            ({
              $key: c.payload.key,
              ...c.payload.val(),
            } as Team)
        );
      })
    );
  }

  addTeam(team: Team): any {
    return this.teamsDb.push(team);
  }

  deleteTeam(id: string): any {
    this.db.list('/teams').remove(id);
  }

  editTeam(newTeamData: any): any {
    const $key = newTeamData.$key;
    delete newTeamData.$key;
    this.db.list('/teams').update($key, newTeamData);
  }
}
