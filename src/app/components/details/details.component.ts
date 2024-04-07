import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId?: string;
  game?: Game;
  routerSub?: Subscription;
  gameSub?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.routerSub = this.activatedRoute.params.subscribe((params) => {
      this.gameId = params['game-id'];
      if (this.gameId) {
        this.getGameDetails(this.gameId);
      }
    });
  }

  getGameDetails(id: string) {
    this.gameSub = this.httpService.getGameDetails(id).subscribe((res) => {
      this.game = res;
      if (this.game) {
        setTimeout(() => {
          this.gameRating = this.game?.metacritic ?? 0;
        }, 1000);
      }
    });
  }

  getColor(value: number): string {
    if (value > 75) {
      return '$5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 25) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
