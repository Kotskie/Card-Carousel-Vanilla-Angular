import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Card } from "../models/card";
import { Uris } from "../uris/uris";
import { ICardRepo } from "./iCardRepo";

@Injectable({
  providedIn: 'root'
})
export class CardRepository implements ICardRepo {
  
  private http!: HttpClient;

  constructor(private uris: Uris){}

  private getAll(url: string): Observable<Card[]>{
    return this.http.get<Card[]>(url);
  }

  private get(url: string): Observable<Card>{
    return this.http.get<Card>(url);
  }

  private put(url: string, body: {}): Observable<Card>{
    return this.http.put<Card>(url, body);
  }

  private post(url: string, body: {}): Observable<Card>{
    return this.http.post<Card>(url, body);
  }

  private delete(id: string): Observable<any>{
    return this.http.delete<any>(id);
  }

  getAllCards(): Observable<Card[]>{
    // const url = this.uris.getAllCards();
    return this.uris.getAllCards();
  }

  getCardDetails(id: number): Observable<Card>{
    // const url = this.uris.getCardDetails(id);
    return this.uris.getCardDetails(id);
  }
}
