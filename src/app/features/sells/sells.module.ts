import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellsRoutingModule } from './sells-routing.module';
import { CreateSellFormComponent } from './components/create-sell-form/create-sell-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateSellFormComponent,
  ],
  imports: [
    CommonModule,
    SellsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SellsModule { }
