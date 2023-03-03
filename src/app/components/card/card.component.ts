import { Component, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card!: Card;
  @Input() cards: Card[] = [];
  @Input() selectedIndex: number = 0;
  @Input() focusedCard: number = 1;
  @Input() cardWidth: number = 162;
  @Input() cardMargin: number = 20;
}
