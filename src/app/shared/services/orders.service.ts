import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Order } from '../interfaces';

@Injectable()
export class OrdersService {

  constructor(
    private http: HttpClient
  ) { }

  add(order: Order): Observable<Order> {
    return this.http.post(`${environment.fbDatabaseUrl}/orders.json`, order)
      .pipe(map((response: {[key: string]: string}) => {
        return {
          ...order,
          id: response.name
        }
      }))
  }

  getAll(): Observable<Order[]> {
    return this.http.get(`${environment.fbDatabaseUrl}/orders.json`)
      .pipe(
        map((response: {[key: string]: Order} | null) => {
          if(!response){
            return []
          }

          return Object
            .keys(response)
            .map( id => {
            return {...response[id], id}
          })
      }))
  }
}
