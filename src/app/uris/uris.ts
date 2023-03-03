import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Card } from "../models/card";
import { Settings } from "../settings/settings";

@Injectable({
    providedIn: 'root'
  })
export class Uris {

    constructor(private settings: Settings){}
    
    public getAllCards(): Observable<Card[]>{
        // return `${this.settings.baseUrl}/cards`;
        const cards = new BehaviorSubject<Card[]>([]);
        cards.next([
        {
            id: 1,
            title: 'Mobile internet',
            actionText: 'Start here >',
            // image: 'https://picsum.photos/id/1015/400/250'
            image: './assets/images/placeholderImage.png'
          },
          {
            id: 2,
            title: 'Home internet',
            actionText: 'Start here >',
            // image: 'https://picsum.photos/id/1015/400/250'
            image: './assets/images/placeholderImage.png'
          },
          {
            id: 3,
            title: 'Get a device',
            actionText: 'Start here >',
            // image: 'https://picsum.photos/id/1015/400/250'
            image: './assets/images/placeholderImage.png'
          },
          {
            id: 4,
            title: 'Add a phone-line',
            actionText: 'Start here >',
            // image: 'https://picsum.photos/id/1015/400/250'
            image: './assets/images/placeholderImage.png'
          },
          {
            id: 5,
            title: 'Upgrade',
            actionText: 'Start here >',
            // image: 'https://picsum.photos/id/1015/400/250'
            image: './assets/images/placeholderImage.png'
          },
          {
            id: 6,
            title: 'Add a Fibre Line',
            actionText: 'Start here >',
            // image: 'https://picsum.photos/id/1015/400/250'
            image: './assets/images/placeholderImage.png'
          },
          {
            id: 7,
            title: 'Customer',
            actionText: 'Start here >',
            // image: 'https://picsum.photos/id/1015/400/250'
            image: './assets/images/placeholderImage.png'
          }
      ]);
      return cards.asObservable();
    }

    public getCardDetails(id: number): Observable<Card>{
        // return `${this.settings.baseUrl}/cards/{id}`;
        const cardDetails = new BehaviorSubject<Card>(new Card());
        cardDetails.next(
        {
            id: 1,
            title: 'Card 1',
            actionText: 'Start here >',
            image: 'https://picsum.photos/id/1015/400/250'
        });
        return cardDetails.asObservable();
    }
}