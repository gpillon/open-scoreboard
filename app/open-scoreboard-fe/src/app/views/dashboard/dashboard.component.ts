import {Component, OnInit} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ReadGameDto} from 'src/app/api/models/read-game-dto';
import {GameService} from 'src/app/api/services/game.service';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //TODO: Refactor con Resolver
  game: Observable<ReadGameDto> =
    this.gameService.gameControllerFindAll({limit: 1}).pipe(map(g => g[0]))

  constructor(
    private gameService: GameService
  ) {
  }

  ngOnInit(): void {

  }

}
