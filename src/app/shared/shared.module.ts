import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    CarouselComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CarouselComponent,
    CardComponent,
  ]
})
export class SharedModule { }
