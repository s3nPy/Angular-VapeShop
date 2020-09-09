import { AbstractControl } from '@angular/forms';

interface validationError {
  [key: string]: any
}

type error = validationError | null

export class CustomValidators {
  static url(control: AbstractControl): error {
    const value: string = control.value
    if(!value){
      return null
    }

    const prefix = value.startsWith('http://') || value.startsWith('https://')
    const slashes = value.includes('/')

    if(!prefix || !slashes){
      return {'url': true}
    }

    return null
  }

  static imageUrl(control: AbstractControl): error {
    const value: string = control.value
    if(!value) {
      return null
    }

    const postfix = value.endsWith('.jpg') || value.endsWith('.jpeg') || value.endsWith('.png') || value.endsWith('.ico')
    if(!postfix || CustomValidators.url(control)){
      return {
        ...CustomValidators.url(control),
        'imageUrl': true
      }
    }

    return null
  }

  // static pgvg(control: AbstractControl): error {

  // }
}
