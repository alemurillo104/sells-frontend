import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeSectionComponent } from './components/home-section/home-section.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    NavComponent,
    LandingComponent,
    LayoutComponent,
    HomeSectionComponent,
    AboutSectionComponent,
    ContactSectionComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule,
    AuthModule,
  ]
})
export class LandingModule { }
