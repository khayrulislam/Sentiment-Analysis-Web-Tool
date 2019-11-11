import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared-components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MainModule } from './main/main.module';
import { WebModule } from './web/web.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    //MainModule,
    WebModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
