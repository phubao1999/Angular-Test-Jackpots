import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, interval, mergeMap, Subject, takeUntil, tap } from 'rxjs';
import { Categories } from 'src/app/constants/categories.constant';
import { Game } from 'src/app/interfaces/game.interface';
import { Jackpot } from 'src/app/interfaces/jackpot.interface';
import { GamesHttpService } from 'src/app/services/http/games-http.service';

@Component({
  selector: 'app-games-container',
  templateUrl: './games-container.component.html',
  styleUrls: ['./games-container.component.scss'],
})
export class GamesContainerComponent implements OnInit, OnDestroy {
  readonly newTag = Categories.NEW;
  readonly topTag = Categories.TOP;
  readonly slotsTag = Categories.SLOTS;

  isLoading: boolean = false;
  games: Game[] = [];
  paramsCategories: string = Categories.TOP;

  private listGames: Game[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private gameHttpService: GamesHttpService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.handleParams(params['categories']);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.getListGame();
    this.getJackpots();
  }

  private getListGame(): void {
    this.isLoading = true;
    this.gameHttpService
      .getGames()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data) => {
        this.listGames = [...data];
        setTimeout(() => {
          this.games = this.filterGamesCategories();
        });
      });
  }

  private getJackpots(): void {
    interval(4500)
      .pipe(
        tap(() => (this.isLoading = true)),
        mergeMap(() => this.gameHttpService.getJackpots()),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        this.mappingAmountToGame(res);
        this.isLoading = false;
      });
  }

  private handleParams(params: string): void {
    if (params) {
      this.paramsCategories = params;
      this.games = this.filterGamesCategories();
      setTimeout(() => {
        this.isLoading = true;
        this.gameHttpService
          .getJackpots()
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe((res) => {
            this.mappingAmountToGame(res);
          });
      });
    }
  }

  private filterGamesCategories(): Game[] {
    if (this.paramsCategories === Categories.OTHER) {
      return this.listGames.filter(
        (item) =>
          item.categories.includes(Categories.BALL) ||
          item.categories.includes(Categories.VIRTUAL) ||
          item.categories.includes(Categories.FUN)
      );
    }
    if (this.paramsCategories === Categories.JACKPOTS) {
      return this.listGames.filter((item) => item.amount);
    }
    return this.listGames.filter((item) =>
      item.categories.includes(this.paramsCategories)
    );
  }

  private mappingAmountToGame(res: Jackpot[]): void {
    this.games = this.games.map((item) => {
      const jackpotGame = res.find((data) => data.game === item.id);
      if (jackpotGame) {
        item.amount = jackpotGame.amount;
      }
      return item;
    });
  }
}
