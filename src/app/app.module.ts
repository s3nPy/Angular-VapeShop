import { CounterComponent } from './shared/components/counter/counter.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { FilterComponent } from './shared/components/filter/filter.component';
import { ItemPreviewComponent } from './shared/components/item-preview/item-preview.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { BasketPageComponent } from './pages/basket-page/basket-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CatalogPageComponent,
    HomePageComponent,
    NotFoundPageComponent,
    AboutPageComponent,
    FilterComponent,
    ItemPreviewComponent,
    ItemPageComponent,
    BasketPageComponent,
    CounterComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
