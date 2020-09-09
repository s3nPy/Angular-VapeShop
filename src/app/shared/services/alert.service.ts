import { Alert } from './../interfaces';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class AlertService {

  public message$: Subject<Alert> = new Subject<Alert>()

  alert(alert: Alert){
    this.message$.next(alert)
  }

  success(text: string) {
    this.alert({text, type: 'success'})
  }

  warning(text: string) {
    this.alert({text, type: 'warning'})
  }

  danger(text: string) {
    this.alert({text, type: 'danger'})
  }

}
