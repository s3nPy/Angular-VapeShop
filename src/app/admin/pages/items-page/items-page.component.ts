import { AlertService } from './../../../shared/services/alert.service';
import { Item } from './../../../shared/interfaces';
import { ItemsService } from './../../../shared/services/items.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.scss']
})
export class ItemsPageComponent implements OnInit {

  items: Item[]
  search: string = ''

  constructor(
    private itemsService: ItemsService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.itemsService.getAll().subscribe(items => this.items = items)
  }

  remove(id: string) {
    this.itemsService.removeItem(id).subscribe( () => {
      this.items = this.items.filter(item => item.id !== id)
      this.alertService.success('Товар успешно удален')
    })
  }

}
