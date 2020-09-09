import { Utility } from './../../shared/utility';
import { FilterComponent } from './../../shared/components/filter/filter.component';
import { ItemsService } from './../../shared/services/items.service';
import { Item } from './../../shared/interfaces';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

interface FilterFields {
  title: string
  name: string
  values: any[]
}

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  items: Item[]
  filter: Partial<Item> = {}

  mainFilterFields: FilterFields
  featureFilterFields: FilterFields[] = []

  @ViewChildren('filter') filterComponents: QueryList<FilterComponent>

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit(): void {
    this.itemsService.getAll().subscribe( (items: Item[]) => {
      this.items = items

      this.mainFilterFields = {
        title: 'Тип товара',
        name: 'type',
        values: Utility.unique(Utility.gather(this.items, 'type'))
      }
    })
  }


  updateFeatureFilters(filter: Partial<Item>) {
    this.applyFilter(filter)
    this.filter.features = {}

    const filtered = Utility.filter(this.items, filter)
    const keys = Utility.unique(filtered.reduce((p, c) => [...p, ...Object.keys(c.features)], []))
    this.featureFilterFields = keys.map(key => {
      return {
        title: key,
        name: key,
        values: Utility.unique(Utility.gather(filtered, ['features', key]))
      }
    })
  }

  applyFilter(filter: Partial<Item>, nestIn: string = '') {
    if(nestIn){
      this.filter = {
        ...this.filter,
        [nestIn]: {
          ...this.filter[nestIn],
          ...filter
        }
      }
    } else {
      this.filter = {...this.filter, ...filter}
    }
  }

  resetFilters() {
    this.filterComponents.forEach( f => f.reset())
    this.filter = {}
    this.featureFilterFields = []
  }

}
