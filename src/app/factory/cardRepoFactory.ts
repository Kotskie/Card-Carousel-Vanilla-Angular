// card-repo.factory.ts
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { CardRepository } from '../repo/card.respository';
import { ICardRepo } from '../repo/iCardRepo';
import { Uris } from '../uris/uris';

@Injectable()
export class CardRepoFactory{

    constructor(private uris: Uris){};

    create(): ICardRepo {
        return new CardRepository(this.uris);
    }
}

