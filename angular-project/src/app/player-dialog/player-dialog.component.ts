import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Countries } from '../interfaces/countries.enum';
import { Player, SquadNumber } from '../interfaces/player.model';
import { Team } from '../interfaces/team.model';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss'],
})
export class PlayerDialogComponent implements OnInit {
  private team!: Team;
  public player?: Player;
  public countries = Object.keys(Countries).map((key) => ({
    label: key,
    // tslint marks it as incorrect:
    // key: Countries[key],

    // Other alternatives:
    key: key.indexOf,
    // key: (Countries as any)[key],
    // key: Countries as any[typeof key],
  }));

  public squadNumber = Object.keys(SquadNumber)
    .slice(Object.keys(SquadNumber).length / 2)
    .map((key) => ({
      label: key,
      key: key.indexOf,
    }));

  private newPlayer(playerFormValue: any): void {
    const key = this.playerService.addPlayer(playerFormValue).key;
    const playerFormValueKeyWithKey = {
      ...playerFormValue,
      key,
    };
    const formattedTeam = {
      ...this.team,
      players: [
        ...(this.team.players ? this.team.players : []),
        playerFormValueKeyWithKey,
      ],
    };
    this.teamService.editTeam(formattedTeam);
  }

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        if (teams.length > 0) {
          this.team = teams[0];
        }
      });
  }

  onSubmit(playerForm: NgForm): void {
    const playerFormValue = { ...playerForm.value };
    if (playerForm.valid) {
      playerFormValue.leftFooted =
        playerFormValue.leftFooted === '' ? false : playerFormValue.leftFooted;
    }
    this.newPlayer(playerFormValue);
    window.location.replace('#');
  }
}
