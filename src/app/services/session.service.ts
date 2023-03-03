import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

    private sessionStorage: Storage = localStorage;
  constructor() { }

  private set(key: string, value: any, expirationTime: number = 60 * 60) {
    const now = new Date();
    const item = {
        value: value,
        expiration: now.getTime() + expirationTime * 1000
    };
    this.sessionStorage.setItem(key, JSON.stringify(item));
  }

  private get(key: string): any {
    const itemString = this.sessionStorage.getItem(key);
    if (itemString !== null) {
      const item = JSON.parse(itemString);
      if (item && item.expiration && item.expiration > new Date().getTime()) {
        return item.value;
      } else {
        this.remove(key);
      }
    }
    return null;
  }

  private remove(key: string) {
    this.sessionStorage.removeItem(key);
  }

  private clear() {
    this.sessionStorage.clear();
  }

  setAuthenticatedSession(){
    this.set('authenticated', true);
  }

  removeAuthenticatedSession(){
    this.remove('authenticated');
    this.clear();
  }

  getAuthenticatedSession(): boolean{
    const authenticatedSessionValue = this.get('authenticated');
    return authenticatedSessionValue == null ? false : authenticatedSessionValue;
  }

}
