import { Observable } from "rxjs";
import { Card } from "../models/card";

export interface ICardRepo{
    getAllCards(): Observable<Card[]>;
    getCardDetails(id: number): Observable<Card>;
}