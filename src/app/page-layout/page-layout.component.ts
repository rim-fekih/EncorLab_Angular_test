import { Card } from 'src/models/Card'

import { Component, OnInit, QueryList, ViewChildren } from '@angular/core'

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css'],
})
export class PageLayoutComponent implements OnInit {
  cards: Card[] = [];
  favorites: Card[] = [];
  constructor() {}

  ngOnInit(): void {}

  setState({ cards, favorites }: { cards: Card[]; favorites: Card[] }): void {
    this.cards = cards;
    this.favorites = favorites;
  }
}
