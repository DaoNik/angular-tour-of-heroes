import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { FenceCasePipe } from './fence-case.pipe';
import { HeroFormModule } from './hero-form/hero-form.module';
import { FocusComponent } from './focus/focus.component';
import { BookModule } from './book/book.module';
import { HelloDirective } from './directives/hello.directive';
import { TextModificatorDirective } from './directives/text-modificator.directive';
import { TextModificatorHostDirective } from './directives/text-modificator-host.directive';
import { RainbowTextDirective } from './directives/rainbow-text.directive';
import { FormComponentComponent } from './form-component/form-component.component';
import { BasicInterceptorInterceptor } from './basic-interceptor.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import {HeroService} from "./hero.service";
import {HOSTNAME_PROVIDERS} from "./hostname.providers";

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    FenceCasePipe,
    FocusComponent,
    HelloDirective,
    TextModificatorDirective,
    TextModificatorHostDirective,
    RainbowTextDirective,
    FormComponentComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
    HeroFormModule,
    BookModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: BasicInterceptorInterceptor
    },
    HeroService,
    HOSTNAME_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
