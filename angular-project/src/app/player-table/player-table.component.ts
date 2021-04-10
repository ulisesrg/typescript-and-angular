import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Player } from '../interfaces/player.model';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements OnInit {
  public players$ = new Observable<Player[]>();
  public selectedPlayer!: Player | null;
  public showModal = false;

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.players$ = this.playerService.getPlayers();
  }

  newPlayer(): void {
    this.showModal = true;
    this.selectedPlayer = null;
    setTimeout(() => {
      window.location.replace('#open-modal');
    }, 0);
  }

  editPlayer(player: Player): void {
    this.selectedPlayer = { ...player };
    this.showModal = true;
    setTimeout(() => {
      window.location.replace('#open-modal');
    }, 0);
  }

  deletePlayer(player: Player): void {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        const modifiedPlayers = teams[0].players
          ? teams[0].players.filter((p: any) => p.key !== player.$key)
          : teams[0].players;
        const formattedTeam = {
          ...teams[0],
          players: [...(modifiedPlayers ? modifiedPlayers : [])],
        };
        this.playerService.deletePlayer(player.$key as string);
        this.teamService.editTeam(formattedTeam);
      });
  }

  closeDialog(): void {
    this.showModal = false;
  }
}
