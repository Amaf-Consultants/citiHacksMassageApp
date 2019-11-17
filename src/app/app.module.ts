import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserService } from './services/user-service';
import { CitiHacksService } from './services/citi-hacks.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [UserService, CitiHacksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
