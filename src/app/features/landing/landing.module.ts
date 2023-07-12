import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeSectionComponent } from './components/home-section/home-section.component';
import { LandingComponent } from './pages/landing/landing.component';


@NgModule({
  declarations: [
    NavComponent,
    LandingComponent,
    LayoutComponent,
    HomeSectionComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
