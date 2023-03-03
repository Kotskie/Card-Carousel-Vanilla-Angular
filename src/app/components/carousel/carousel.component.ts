import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Card } from 'src/app/models/card';
import { retry } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @HostBinding('style.--card-width')
  cardWidth: number = 162;

  @HostBinding('style.--card-margin')
  cardMargin: number = 20;

  cards: Card[] = [];
  private isLoadingCards: boolean = false;

  focusedCard: number = 2;
  visibleCards: number = 5;
  containerWidth: number = 0;
  
  readonly Math = Math;

  constructor(
    private navigation: NavigationService,
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.getAllCards();
  
    if (this.visibleCards === 5 && this.cards.length > this.focusedCard) {
      this.focusedCard = 2;
    } else if (this.visibleCards === 3 && this.cards.length > this.focusedCard) {
      this.focusedCard = 1;
    } else {
      this.focusedCard = 0;
    }

    this.containerWidth = this.visibleCards * (this.cardWidth + this.cardMargin) - this.cardMargin + 342;
    this.adjustVisibleCards(window.innerWidth);

    this.centerFocusedCard();
  }

  getAllCards(){
    this.isLoadingCards = true;
    this.cardService.getAllCards().subscribe({
      next: cards => {
        this.cards = cards;
        this.isLoadingCards = false;
      }, 
      error: err => {
        console.log(err);
        this.isLoadingCards = false;
      }
    })
  }
  
  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.containerWidth = width;    
    this.adjustVisibleCards(this.containerWidth);
    this.centerFocusedCard();
  }
  
  focusNext(event: Event) {
    event.stopPropagation();
    this.focusedCard = (this.focusedCard + 1) % this.cards.length;
    this.centerFocusedCard();
  }

  focusPrevious(event: Event) {
    event.stopPropagation();
    this.focusedCard = (this.focusedCard - 1 + this.cards.length) % this.cards.length;
    this.centerFocusedCard();
  }

  private centerFocusedCard() {
    const cardWidthWithMargin = this.cardWidth + this.cardMargin;
    const halfVisibleCards = Math.floor(this.visibleCards / 2);

    let center = (this.focusedCard * cardWidthWithMargin) + (cardWidthWithMargin / 2);

    if (this.focusedCard === 0) {
      center += (this.cardMargin / 2);
    } else if (this.focusedCard === this.cards.length - 1) {
      center -= (this.cardMargin / 2);
    }

    if (this.cards[this.focusedCard].id === this.focusedCard) {
      center -= (342 + this.cardWidth) / 2;
    }

    let offset;
    if (window.innerWidth < 1024 && this.visibleCards === 3) {
      offset = center - (this.containerWidth / 2) + (halfVisibleCards * cardWidthWithMargin) - (cardWidthWithMargin / 2);
    } else {
      offset = center - (this.containerWidth / 2) + (halfVisibleCards * cardWidthWithMargin);
    }
  }

  private adjustVisibleCards(width: number) {
    if (width >= 1024) {
      this.visibleCards = 5;
    } else if (width >= 768) {
      this.visibleCards = 3;
    } else {
      this.visibleCards = 1;
    }
    this.centerFocusedCard();
  }

  shouldDisplayCard(index: number): boolean {
    if (this.visibleCards === 1) {
      return this.focusedCard === index;
    } else if (this.visibleCards === 3) {
      const isLeftOfFocused = index < this.focusedCard && this.focusedCard - index <= 1;
      const isRightOfFocused = index > this.focusedCard && index - this.focusedCard <= 1;
      return this.focusedCard === index || isLeftOfFocused || isRightOfFocused;
    } else {
      const isLeftOfFocused = index < this.focusedCard && this.focusedCard - index <= 2;
      const isRightOfFocused = index > this.focusedCard && index - this.focusedCard <= 2;
      const isBeforeFocused = index < this.focusedCard && this.focusedCard - index > 2;
      const isAfterFocused = index > this.focusedCard && index - this.focusedCard > 2;
      const isOnLeftEdge = this.focusedCard < 2 && index < 5;
      const isOnRightEdge = this.cards.length - this.focusedCard <= 3 && index >= this.cards.length - 5;
  
      if (isOnLeftEdge || isOnRightEdge) {
        return true;
      } else if (this.focusedCard === index || isLeftOfFocused || isRightOfFocused) {
        return true;
      } else if (isBeforeFocused && this.focusedCard < 2) {
        return index < 5;
      } else if (isAfterFocused && this.cards.length - this.focusedCard <= 3) {
        return index >= this.cards.length - 5;
      } else {
        return false;
      }
    }
  }
  
  translateCardsLogic(): number{
    if (window.innerWidth >= 1024) {
        if(this.focusedCard == 0){
          return (342 + this.cardMargin * 2);
        }else if(this.focusedCard == 1){
          return (162 + this.cardMargin * 2);
        }else if(this.focusedCard == this.cards.length - 2){
          return (-(162 + this.cardMargin * 2));
        }else if(this.focusedCard == this.cards.length - 1){
          return (-(342 + this.cardMargin * 2));
        }
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      if(this.focusedCard == 0){
        return (342 / (this.cards.length - this.visibleCards) + this.cardMargin);
      }else if(this.focusedCard == 1){
        return (this.cardWidth / (this.cards.length - this.visibleCards) - this.cardMargin * 2);
      }else if(this.focusedCard == this.cards.length - 2){
        return (this.cardWidth / (this.cards.length - this.visibleCards) - this.cardMargin * 2);
      }else if(this.focusedCard == this.cards.length - 1){
        return (342 / (this.cards.length - this.visibleCards) - (this.cardWidth + this.cardMargin));      
      }
    } else {
      return 0;
    }
    return 0;
  }
}
