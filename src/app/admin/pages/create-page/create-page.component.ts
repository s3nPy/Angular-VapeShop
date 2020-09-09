import { AlertService } from './../../../shared/services/alert.service';
import { ItemsService } from '../../../shared/services/items.service';
import { Item, FbCreateResponse, ItemType } from '../../../shared/interfaces';
import { CustomValidators } from '../../shared/custom.validators';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup
  submitted = false

  constructor(
    private itemsService: ItemsService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      url: new FormControl('', [
        Validators.required,
        CustomValidators.imageUrl
      ]),
      type: new FormControl('', [Validators.required]),
      features: new FormArray([]),
      cost: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    })
  }

  get features(): FormArray {
    return this.form.get('features') as FormArray
  }

  changeFeatures() {
    this.features.clear()

    const type = this.form.get('type').value
    const names = type === ItemType.Fluid ? ['volume', 'nicotine', 'pgvg'] :
                  type === ItemType.Vape ? ['capacity', 'power'] : [];

    for(let name of names) {
      this.features.push( new FormGroup({
        'name': new FormControl(name),
        'value': new FormControl('', Validators.required)
      }))
    }
  }

  reset() {
    this.form.reset('')
    this.features.clear()
  }

  submit() {
    const item: Item = {
      ...this.form.value,
      features: (<{name: string, value: string}[]>this.features.value).reduce((p, c) => {
        return {
          ...p,
          [c.name]: c.value
        }
      }, {}),
      cost: +this.form.value.cost,
      amount: +this.form.value.amount,
      date: new Date()
    }

    this.submitted = true

    this.itemsService.addItem(item).subscribe( () => {
      this.submitted = false
      this.reset()
      this.alertService.success('Товар добавлен')
    }, () => {
      this.submitted = false
      this.alertService.success('Ошибка при добавлении')
    })
  }
}


