import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Card } from "../models/card";
import { Uris } from "../uris/uris";
import { ICardRepo } from "./iCardRepo";

@Injectable({
  providedIn: 'root'
})
export class CardRepository implements ICardRepo {
  
  private http!: HttpClient;
  private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

  constructor(private uris: Uris){}

  private getAll(url: string): Observable<Card[]>{
    const httpOptions = {
      headers: this.headers
    };
    return this.http.get<Card[]>(url, httpOptions);
  }

  private get(url: string): Observable<Card>{
    const httpOptions = {
      headers: this.headers
    };
    return this.http.get<Card>(url, httpOptions);
  }

  private put(url: string, body: {}): Observable<Card>{
    const httpOptions = {
      headers: this.headers
    };
    return this.http.put<Card>(url, body, httpOptions);
  }

  private post(url: string, body: {}): Observable<Card>{
    const httpOptions = {
      headers: this.headers
    };
    return this.http.post<Card>(url, body, httpOptions);
  }

  private delete(id: string): Observable<any>{
    const httpOptions = {
      headers: this.headers
    };
    return this.http.delete<any>(id, httpOptions);
  }

  getAllCards(): Observable<Card[]>{
    return this.uris.getAllCards();
    // return this.getAll(url);
  }

  getCardDetails(id: number): Observable<Card>{
    return this.uris.getCardDetails(id);
    // return this.get(url);
  }
}
