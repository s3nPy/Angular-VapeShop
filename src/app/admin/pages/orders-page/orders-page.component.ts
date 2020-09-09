import { Order } from './../../../shared/interfaces';
import { OrdersService } from './../../../shared/services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  orders: Order[]

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.ordersService.getAll().subscribe(orders => {
      this.orders = orders
    })
  }
}
