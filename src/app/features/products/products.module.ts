import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateProductFormComponent } from './components/create-product-form/create-product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemDetailsFormComponent } from './components/item-details-form/item-details-form.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ProductListComponent,
    CreateProductFormComponent,
    ItemDetailsFormComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProductsModule { }
