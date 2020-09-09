import { AlertService } from './../../shared/services/alert.service';
import { OrdersService } from './../../shared/services/orders.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Item } from 'src/app/shared/interfaces';
import { BasketItem, Order } from './../../shared/interfaces';
import { ItemsService } from './../../shared/services/items.service';
import { BasketService } from './../../shared/services/basket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss']
})
export class BasketPageComponent implements OnInit {

  form: FormGroup
  basket: BasketItem[]
  total: number = 0

  constructor(
    private basketService: BasketService,
    private itemService: ItemsService,
    private ordersService: OrdersService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', [
        Validators.required,
        // phone number patern
      ])
    })

    this.basket = this.basketService.basket
    this.basket.forEach((basketItem: BasketItem, i: number) => {
      this.itemService.getById(basketItem.id).subscribe((item: Item) => {
        this.basket[i].item = item
        this.total += this.basket[i].amount * item.cost
      })
    })
  }

  clear() {
    this.basket = []
    this.basketService.clear()
  }

  removeItem(id: string) {
    this.basket = this.basket.filter(basketItem => {
      const isMatch = basketItem.id === id
      if(isMatch) {
        this.total -= basketItem.amount * basketItem.item.cost
      }
      return !isMatch
    })

    this.basketService.removeById(id)
  }


  submitOrder() {
    const order: Order = {
      ...this.form.value,
      items: this.basket.map( item => ({id: item.id, amount: item.amount}) )
    }

    this.ordersService.add(order).subscribe(() => {
      this.alertService.success('Спасибо за заказ! Мы обработает его в течении суток и свяжемся с вами!')
      this.basketService.clear()
    })
  }
}
