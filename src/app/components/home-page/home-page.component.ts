import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  public sort: string = '';
  public games: Array<Game> = [];
  private routerSub?: Subscription;
  private gameSub?: Subscription;
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routerSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort: string, search?: string) {
    this.gameSub = this.httpService
      .getGamesList(sort, search)
      .subscribe((res: APIResponse<Game>) => {
        console.log(res);
        this.games = res.results;
      });
  }

  navigateToDetailsPage(id: string) {
    this.router.navigate(['details', id]);
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
