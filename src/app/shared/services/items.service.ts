import { environment } from './../../../environments/environment.prod';
import { Item, FbCreateResponse } from './../interfaces';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class ItemsService {


  constructor(private http: HttpClient) {}

  addItem(item: Item): Observable<FbCreateResponse> {
    return this.http.post(`${environment.fbDatabaseUrl}/items.json`, item)
      .pipe(map((response: {name: string}): FbCreateResponse => {
        return {
          item,
          id: response.name
        }
      }))
  }

  getAll(): Observable<Item[]> {
    return this.http.get(`${environment.fbDatabaseUrl}/items.json`)
      .pipe(
        map((response: {[key: string]: Item} | null) => {
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

  getById(id: string): Observable<Item> {
    return this.http.get(`${environment.fbDatabaseUrl}/items/${id}.json`)
      .pipe(map((item: Item) => {
        return {...item, id}
      }))
  }

  removeItem(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.fbDatabaseUrl}/items/${id}.json`)
  }

  updateItem(item: Item): Observable<any> {
    return this.http.patch(`${environment.fbDatabaseUrl}/items/${item.id}.json`, item)
  }
}
