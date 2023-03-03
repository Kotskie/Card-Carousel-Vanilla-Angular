import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavigationService } from './services/navigation.service';
import { AuthService } from './services/auth.service';
import { CardService } from './services/card.service';
import { SessionService } from './services/session.service';
import { ICardRepo } from './repo/iCardRepo';
import { CardRepository } from './repo/card.respository';
import { CardRepoFactory } from './factory/cardRepoFactory';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    HomeComponent,
    CardComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CardRepoFactory,
    NavigationService,
    AuthService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
