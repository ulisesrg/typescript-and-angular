import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() player?: Player | null;
  @Output() closaDialog: EventEmitter<boolean> = new EventEmitter();
  private team!: Team;
  public countries = Object.keys(Countries).map((key) => ({
    label: key,
    // tslint marks it as incorrect:
    // key: Countries[key],

    // Other alternatives:
    key: (Countries as any)[key],
    // key: Countries as any[typeof key],
  }));

  public squadNumber = Object.keys(SquadNumber)
    .slice(Object.keys(SquadNumber).length / 2)
    .map((key) => ({
      label: key,
      key: (SquadNumber as any)[key],
    }));

  private newPlayer(playerFormValue: any): void {
    const key = this.playerService.addPlayer(playerFormValue).key;
    const playerFormValueWithKey = {
      ...playerFormValue,
      key,
    };
    const formattedTeam = {
      ...this.team,
      players: [
        ...(this.team.players ? this.team.players : []),
        playerFormValueWithKey,
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

  private editPlayer(playerFormValue: Player): void {
    const playerFormValueWithKey = {
      ...playerFormValue,
      $key: this.player?.$key,
    };

    const playerFormValueWithFormattedKey = {
      ...playerFormValue,
      key: this.player?.$key,
    };

    delete playerFormValueWithFormattedKey.$key;

    const modifiedPlayers = this.team.players
      ? this.team.players.map((player: any) => {
          return player.key === this.player?.$key
            ? playerFormValueWithFormattedKey
            : player;
        })
      : this.team.players;

    const formattedTeam = {
      ...this.team,
      players: [
        ...(modifiedPlayers
          ? modifiedPlayers
          : [playerFormValueWithFormattedKey]),
      ],
    };
    this.playerService.editPlayer(playerFormValueWithKey);
    this.teamService.editTeam(formattedTeam);
  }

  onSubmit(playerForm: NgForm): void {
    const playerFormValue = { ...playerForm.value };
    if (playerForm.valid) {
      playerFormValue.leftFooted =
        !playerFormValue.leftFooted ? false : true;
    }
    if (this.player) {
      this.editPlayer(playerFormValue);
    } else {
      this.newPlayer(playerFormValue);
    }
    window.location.replace('#');
  }

  onClose(): void {
    this.closaDialog.emit(true);
  }
}
