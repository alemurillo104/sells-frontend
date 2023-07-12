import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './features/landing/components/landing/landing.component';
import { LayoutComponent } from './features/landing/components/layout/layout.component';
import { LandingModule } from "./features/landing/landing.module";

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        LayoutComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        // LandingModule
    ]
})
export class AppModule { }
