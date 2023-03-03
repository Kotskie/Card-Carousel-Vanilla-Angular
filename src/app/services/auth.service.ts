import { Injectable } from '@angular/core';
import { NavigationService } from './navigation.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: boolean = false;

  constructor(
    private session: SessionService,
    private navigate: NavigationService) { }

  login(username: string, password: string) {
    this.isLoggedIn = username === 'user' && password === 'password';
    if (this.isLoggedIn) {
      this.session.setAuthenticatedSession();
      this.navigate.goToHome();
    }
  }
  
  oneClickLogin() {
    this.session.setAuthenticatedSession();
    this.navigate.goToHome();
  }
  
  isAuthenticated(): boolean {
    return this.isLoggedIn = this.session.getAuthenticatedSession();
  }

  logout(){
    this.session.removeAuthenticatedSession();
  }
}
