import { AlertService } from './../../services/alert.service';
import { Alert } from './../../interfaces';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 3000

  alert: Alert = {
    text: '',
    type: 'warning'
  }

  sub: Subscription

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.sub = this.alertService.message$.subscribe( (alert: Alert) => {
      this.alert = alert
      setTimeout(this.clear.bind(this), this.delay)
    })
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }

  clear() {
    this.alert.text = ''
  }

}
