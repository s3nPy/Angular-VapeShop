import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../interfaces';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  form: FormGroup

  @Output() choice = new EventEmitter<Partial<Item>>()
  @Input() title: string = 'group title'
  @Input() name: string = 'group'
  @Input() values: string[] = []

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [this.name]: new FormControl('')
    })
  }

  change() {
    this.choice.next(this.form.value)
  }

  reset() {
    this.form.reset()
  }

}
