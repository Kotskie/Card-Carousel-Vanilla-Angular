import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class Settings{
    baseUrl: string = "http://localhost:8080";
}