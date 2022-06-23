import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MenuComponent } from './components/menu/menu.component';
import { GamesContainerComponent } from './containers/games-container/games-container.component';
import { GamesHttpService } from './services/http/games-http.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    GamesContainerComponent,
    MenuComponent,
    GamesContainerComponent,
    LoadingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [GamesHttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
