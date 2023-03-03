import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardRepoFactory } from '../factory/cardRepoFactory';
import { Card } from '../models/card';
import { ICardRepo } from '../repo/iCardRepo';

@Injectable({
  providedIn: 'root'
})
export class CardService  {

  private readonly repo: ICardRepo;

  constructor(private repoFactory: CardRepoFactory) {
    this.repo = repoFactory.create();
  }

  getAllCards(): Observable<Card[]>{
    return this.repo.getAllCards();
  }

  getCardDetails(id: number): Observable<Card>{
    return this.repo.getCardDetails(id);
  }
}
