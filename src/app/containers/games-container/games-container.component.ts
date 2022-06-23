import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Categories } from 'src/app/constants/categories.constant';
import { Game } from 'src/app/interfaces/game.interface';
import { GamesHttpService } from 'src/app/services/http/games-http.service';

@Component({
  selector: 'app-games-container',
  templateUrl: './games-container.component.html',
  styleUrls: ['./games-container.component.scss'],
})
export class GamesContainerComponent implements OnInit {
  private paramsCategories: string = Categories.TOP;
  private listGames: Game[] = [];

  isLoading: boolean = false;
  games: Game[] = [];

  constructor(
    private route: ActivatedRoute,
    private gameHttpService: GamesHttpService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.handleParams(params['categories']);
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.gameHttpService
      .getGames()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data) => {
        this.listGames = [...data];
        setTimeout(() => {
          this.filterGamesCategories();
        });
      });
  }

  private handleParams(params: string): void {
    if (params) {
      this.paramsCategories = params;
      this.filterGamesCategories();
    }
  }

  private filterGamesCategories(): void {
    this.games = this.listGames.filter((item) =>
      item.categories.includes(this.paramsCategories)
    );
  }
}
