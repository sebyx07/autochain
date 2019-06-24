import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListCarsComponent } from './list-cars/list-cars.component';
import { FooterComponent } from './footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CarComponent } from './car/car.component';
import { HomeComponent } from './home/home.component';
import {routing} from './app.routes';
import {GalleriaModule} from 'primeng/galleria';
import {ButtonModule} from 'primeng/button';
import {LandingComponent} from './landing/landing.component';
import {Section1LandingComponent} from './landing/section1-landing/section1-landing.component';
import {Section2LandingComponent} from './landing/section2-landing/section2-landing.component';
import {Section3LandingComponent} from './landing/section3-landing/section3-landing.component';
import {NavLandingComponent} from './landing/nav-landing/nav-landing.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CustomInterceptor} from "./services/custom-interceptor.service";
import { HomeNavComponent } from './home-nav/home-nav.component';
import {AuthenticationService} from "./services/authentication.service";
import {GrowlModule} from "primeng/growl";
import {DropdownModule, FileUploadModule, ProgressSpinnerModule, SelectButtonModule} from 'primeng/primeng';
import {SliderModule} from "primeng/slider";
import {MessageService} from 'primeng/components/common/messageservice';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { AbonamenteComponent } from './abonamente/abonamente.component';
import { NewCarComponent } from './new-car/new-car.component';
import {CarsService} from './services/cars.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    ListCarsComponent,
    FooterComponent,
    CarComponent,
    HomeComponent,
    LandingComponent,
    NavLandingComponent,
    Section1LandingComponent,
    Section2LandingComponent,
    Section3LandingComponent,
    HomeNavComponent,
    AboutComponent,
    FaqComponent,
    AbonamenteComponent,
    NewCarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    routing,
    GalleriaModule,
    ButtonModule,
    GrowlModule,
    DropdownModule,
    SliderModule,
    SelectButtonModule,
    ProgressSpinnerModule,
    NgbCollapseModule.forRoot(),
    FileUploadModule
  ],
  providers: [
    AuthenticationService,
    CarsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor ,
      multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
