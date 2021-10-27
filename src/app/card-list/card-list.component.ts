import { API_URL, TEXT_GENERATOR } from 'src/constants/constants'
import { ApiResponse } from 'src/models/Api'
import { Card } from 'src/models/Card'

import { HttpClient } from '@angular/common/http'
import { Route } from '@angular/compiler/src/core'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  cards: Card[] = [];
  favorites: Card[] = [];
  currentId = 0;
  cardsPerPage = 12;
  searchText = '';
  shouldDisplayFavorites = false;
  @Output() onUpdate = new EventEmitter<{
    cards: Card[];
    favorites: Card[];
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadPage();
  }

  ngDoCheck(): void {
    this.favorites = this.cards.filter((card) => card.isFavorite);
    this.onUpdate.emit({ cards: this.cards, favorites: this.favorites });
  }

  loadPage() {
    if (this.shouldDisplayFavorites === false) {
      let counter = this.cardsPerPage;
      while (counter--) {
        this.fetchNextCard();
      }
    } else {
      this.cards = this.favorites;
    }
  }

  async fetchNextCard() {
    try {
      await this.http
        .get<ApiResponse>(`${API_URL}/${this.currentId}/info`)
        .subscribe((card) => {
          this.cards.push({
            id: String(this.currentId),
            author: card.author,
            text: TEXT_GENERATOR.generateSentences(8),
            photo: `${API_URL}/${this.currentId++}/500/500.jpg`,
            isFavorite: false,
          });
        });
    } catch (err) {
      console.error('Could not load cards ', err);
    }
  }
}
