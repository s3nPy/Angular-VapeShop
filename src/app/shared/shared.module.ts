import { OrdersService } from './services/orders.service';
import { BasketService } from './services/basket.service';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';
import { ItemsService } from './services/items.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    AlertComponent
  ],
  providers: [
    ItemsService,
    AlertService,
    BasketService,
    OrdersService
  ]
})
export class SharedModule {}
