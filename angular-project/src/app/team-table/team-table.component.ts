import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamService, TeamsTableHeaders } from '../services/team.service';
import { Team } from '../interfaces/team.model';
import { take } from 'rxjs/operators';
import { Countries } from '../interfaces/countries.enum';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss'],
})
export class TeamTableComponent implements OnInit {
  public teams$ = new Observable<Team[]>();
  public tableHeaders = TeamsTableHeaders;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teams$ = this.teamService.getTeams();
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        if (teams.length === 0) {
          const team: Team = {
            name: 'MyAmazingTeam',
            country: Countries.Belgium,
            players: null,
          };
          this.teamService.addTeam(team);
        }
      });
  }
}
