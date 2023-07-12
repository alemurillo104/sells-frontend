import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { AlgoComponent } from './components/algo/algo.component';


@NgModule({
  declarations: [
    NavComponent,
    AlgoComponent,
  ],
  exports:[
    // NavComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
