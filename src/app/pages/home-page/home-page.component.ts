import { Item } from 'src/app/shared/interfaces';
import { ItemsService } from './../../shared/services/items.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  items: Item[]

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit(): void {
    this.itemsService.getAll().subscribe(items => {
      this.items = items
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
    })
  }

}
