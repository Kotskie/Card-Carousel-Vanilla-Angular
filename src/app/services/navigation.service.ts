import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private home: String = "home";
  private carousel: String = "carousel";
  private pageNotFound: String = "pageNotFound";

  constructor(
    private router: Router, 
    private location: Location ) { }

    private navigateTo(path: String){
      this.router.navigate([`/${path}`]);
    }

    goToHome(){
      this.navigateTo(this.home);
    }

    goToCarousel(){
      this.navigateTo(this.carousel);
    }

    goToPageNotFound(){
      this.navigateTo(this.pageNotFound);
    }

    goBack(){
      this.location.back();
    }
}
