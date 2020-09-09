import { AlertService } from './../../../shared/services/alert.service';
import { map, } from 'rxjs/operators';
import { Item, Features } from './../../../shared/interfaces';
import { CustomValidators } from './../../shared/custom.validators';
import { ItemsService } from './../../../shared/services/items.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  form: FormGroup
  submitted = false

  constructor(
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    const buildFeatures = (features: Features): FormArray => {
      const initialValue = Object
        .keys(features)
        .map(key => new FormGroup({
          'name': new FormControl(key),
          'value': new FormControl(features[key], Validators.required)
        }))
      return new FormArray(initialValue)
    }

    const buildForm = (item: Item): FormGroup => {
      return new FormGroup({
        name: new FormControl(item.name, Validators.required),
        description: new FormControl(item.description, Validators.required),
        url: new FormControl(item.url, [
          Validators.required,
          CustomValidators.imageUrl
        ]),
        type: new FormControl({value: item.type, disabled: true}, [Validators.required]),
        features: buildFeatures(item.features),
        cost: new FormControl(item.cost, Validators.required),
        amount: new FormControl(item.amount, Validators.required)
      })
    }

    this.route.params
      .pipe(map((params: Params) => params['id']))
      .subscribe( (id: string) => {
        this.itemsService.getById(id).subscribe( item => {
          this.form = buildForm(item)
        })
      })
  }

  get features(): FormArray {
    return this.form.get('features') as FormArray
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
      amount: +this.form.value.amount
    }

    this.submitted = true

    this.route.params.subscribe( (params: Params) => {
      item.id = params['id']
      this.itemsService.updateItem(item).subscribe( () => {
        this.submitted = false
        this.alertService.success('Товар изменен')
      }, () => {
        this.submitted = false
        this.alertService.danger('Ошибка при изменении товара')
      })
    } )

    // this.itemsService.addItem(item).subscribe( (response: FbCreateResponse) => {
    //   console.log(response)
    // } )
  }

}
