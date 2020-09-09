import { Item } from './../../../shared/interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchItems'
})
export class SearchItemsPipe implements PipeTransform {

  transform(items: Item[], search: string): Item[] {
    if(!search.trim()){
      return items
    }

    const searchFields = (item: Item): string => (item.name + ' ' + item.type).toLowerCase()
    return items.filter(
        i => search.toLowerCase().split(' ').some( s => s.trim() && searchFields(i).includes(s.trim()))
    )
  }

}
