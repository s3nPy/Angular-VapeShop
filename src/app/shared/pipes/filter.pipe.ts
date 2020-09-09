import { Utility } from './../utility';
import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../interfaces';

@Pipe({
  name:'filter'
})
export class FilterPipe implements PipeTransform{
  transform(items: Item[], filter: Partial<Item>): Item[] {
    return Utility.filter(items, filter)
  }
}
