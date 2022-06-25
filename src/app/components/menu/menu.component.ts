import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Categories } from 'src/app/constants/categories.constant';

interface MenuItem {
  name: string;
  params: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  readonly menuItems: MenuItem[] = [
    { name: 'Top Games', params: Categories.TOP },
    { name: 'New Games', params: Categories.NEW },
    { name: 'Slots', params: Categories.SLOTS },
    { name: 'Jackpots', params: Categories.JACKPOTS },
    { name: 'Live', params: Categories.LIVE },
    { name: 'Blackjack', params: Categories.BLACKJACK },
    { name: 'Roulette', params: Categories.ROULETTE },
    { name: 'Table', params: Categories.TABLE },
    { name: 'Poker', params: Categories.POKER },
    { name: 'Other', params: Categories.OTHER },
  ];

  menuOpenState = false;
  paramsCategories: string = '';
  menuTitle: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.handleParams(params['categories']);
    });
  }

  changeParams(params: string): void {
    const queryParams: Params = { categories: params };

    this.getMenuTitle(params);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
    this.menuOpenState = false;
  }

  openMenu(): void {
    this.menuOpenState = !this.menuOpenState;
  }

  private handleParams(params: string): void {
    this.paramsCategories = params;
    if (!this.paramsCategories) {
      this.paramsCategories = this.menuItems[0].params;
      this.menuTitle = this.menuItems[0].name;
    }
    this.getMenuTitle(params);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  private getMenuTitle(params: string): void {
    const menuItem = this.menuItems.find((item) => item.params === params);
    this.menuTitle = menuItem ? menuItem.name : this.menuItems[0].name;
  }
}
