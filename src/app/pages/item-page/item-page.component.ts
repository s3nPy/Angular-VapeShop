import { Alert } from './../../shared/interfaces';
import { AlertService } from './../../shared/services/alert.service';
import { BasketService } from './../../shared/services/basket.service';
import { ItemsService } from './../../shared/services/items.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Item, BasketItem } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {
  item: Item
  amount: number = 1

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private basketService: BasketService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params: Params) => {
      this.itemsService.getById(params['id']).subscribe((item: Item) => {
        this.item = item
      })
    })
  }

  addToBasket() {
    const basketItem: BasketItem = {
      id: this.item.id,
      amount: this.amount
    }
    this.basketService.addItem(basketItem).subscribe( (alert: Alert) => {
      this.alertService.alert(alert)
    })
  }

}
