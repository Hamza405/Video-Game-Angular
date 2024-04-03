import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { GaugeModule } from 'angular-gauge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HttpHeadersInterceptors } from './interceptors/http-headers.interceptors';
import { HttpErrorsInterceptors } from './interceptors/http-errors.interceptors';

@NgModule({
  declarations: [AppComponent, SearchBarComponent, HomePageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    GaugeModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptors,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptors,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
