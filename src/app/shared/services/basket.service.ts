import { Alert } from './../interfaces';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BasketItem } from '../interfaces';




@Injectable()
export class BasketService {

  get basket(): BasketItem[] {
    const basketItems: BasketItem[] = JSON.parse(localStorage.getItem('basketItems')) || []
    return basketItems
  }

  set basket(items: BasketItem[]) {
    localStorage.setItem('basketItems', JSON.stringify(items))
  }

  private basketIncludes(item: BasketItem) {
    return this.basket.some((bItem: BasketItem) => bItem.id === item.id)
  }

  addItem(item: BasketItem): Observable<Alert> {
    if(this.basketIncludes(item)) {
      return of({text: 'Данный товар уже добавлен!', type: 'danger'})
    }

    this.basket = [...this.basket, item]
    return of({text: 'Товар успешно добавлен в корзину!', type: 'success'})
  }

  removeById(id: string): void {
    this.basket = this.basket.filter( item => item.id !== id)
  }

  clear(): void {
    this.basket = []
  }
}
