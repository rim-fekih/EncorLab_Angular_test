import {
  API_URL,
  MAX_CARDS_PER_PAGE,
  NUMBER_OF_CARDS,
  TEXT_GENERATOR,
} from 'src/constants/constants';
import { ApiResponse } from 'src/models/Api';
import { Card } from 'src/models/Card';

import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  cards: Card[] = [];
  favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
  currentId = 0;
  cardsPerPage = MAX_CARDS_PER_PAGE;
  searchText = '';
  @Input() shouldDisplayFavoritesOnly = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCards();
  }

  toggleFavorite(id: number) {
    if (this.favorites.includes(id)) {
      this.favorites = this.favorites.filter((idCard) => idCard !== id);
    } else {
      this.favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    if (this.shouldDisplayFavoritesOnly) {
      this.cards = this.cards.filter((card) => card.id !== id);
    }
  }

  fetchCards() {
    if (!this.shouldDisplayFavoritesOnly) {
      for (var i = 0; i < this.cardsPerPage; i++) {
        this.fetchNextCard(this.currentId);
        this.currentId++;
      }
    } else if (this.cards.length === 0) {
      for (const id of this.favorites) {
        this.fetchNextCard(id);
      }
    }
  }

  async fetchNextCard(id: number) {
    if (id > NUMBER_OF_CARDS) {
      return;
    }

    try {
      await this.http
        .get<ApiResponse>(`${API_URL}/${id}/info`)
        .subscribe((card) => {
          const photo = `${API_URL}/${id}/500/500.jpg`;
          this.cards.push({
            id,
            author: card.author,
            text: TEXT_GENERATOR.generateParagraphs(1),
            photo,
            isFavorite: false,
          });
        });
    } catch (err) {
      console.error('Could not load cards ', err);
    }
  }
}
