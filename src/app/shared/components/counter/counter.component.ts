import { Component, OnInit, Input, Provider, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

interface Constraints {
  min?: number
  max?: number
}

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CounterComponent),
  multi: true
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class CounterComponent implements ControlValueAccessor {

  @Input() value = 1
  @Input() constraints: Constraints = {}

  private onChange = (value: any) => {}

  constructor() { }

  changeValue(delta: number) {
    this.value = this.constraints.max < this.value + delta ? this.constraints.max :
                 this.constraints.min > this.value + delta ? this.constraints.min :
                 this.value + delta

    this.onChange(this.value)
  }

  writeValue(value: number): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    // throw new Error("Method not implemented.");
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }



}
