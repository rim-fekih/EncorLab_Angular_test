import { TEXT_GENERATOR } from 'src/constants/constants'

import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() id = '1';
  @Input() photo = '';
  @Input() author = 'author';
  @Input() text = TEXT_GENERATOR.generateSentences(8);
  @Input() isFavorite = false;
  constructor() {}

  ngOnInit(): void {}

  onClickFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
