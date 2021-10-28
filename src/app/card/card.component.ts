import { TEXT_GENERATOR } from 'src/constants/constants';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() id = 1;
  @Input() photo = '';
  @Input() author = 'author';
  @Input() text = TEXT_GENERATOR.generateSentences(8);
  @Input() toggleFavorite: (id: number) => void = () => {};
  isFavorite = false;
  constructor() {}

  ngOnInit(): void {
    this.isFavorite = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    ).includes(this.id);
  }

  onClickFavorite() {
    this.toggleFavorite(this.id);
    this.isFavorite = !this.isFavorite;
  }
}
