
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CarComponent} from './car/car.component';
import {ModuleWithProviders} from '@angular/core';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeNavComponent} from './home-nav/home-nav.component';
import {AbonamenteComponent} from './abonamente/abonamente.component';
import {FaqComponent} from './faq/faq.component';
import {AboutComponent} from './about/about.component';
import {NewCarComponent} from './new-car/new-car.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeNavComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'car/:id',
        component: CarComponent
      },
      {
        path: 'abonamente',
        component: AbonamenteComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      }
      ,
      {
        path: 'contact',
        component: AboutComponent
      },
      {
        path: 'new-car',
        component: NewCarComponent
      }
    ]
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
