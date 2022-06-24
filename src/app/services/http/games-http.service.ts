import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Game } from 'src/app/interfaces/game.interface';
import { Jackpot } from 'src/app/interfaces/jackpot.interface';

@Injectable()
export class GamesHttpService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    const url = `${this.baseUrl}/games.php`;
    return this.http.get<Game[]>(url);
  }

  getJackpots(): Observable<Jackpot[]> {
    const url = `${this.baseUrl}/jackpots.php`;
    return this.http.get<Jackpot[]>(url);
  }
}
