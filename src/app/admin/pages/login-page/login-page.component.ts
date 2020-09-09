import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  submitted = false

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })

    if(this.auth.isAuthenticated()){
      this.router.navigate(['/admin', 'items'])
    }
  }


  submit() {
    if(this.form.invalid || this.submitted){
      return
    }

    const user: User = this.form.value
    this.submitted = true

    this.auth.login(user).subscribe( () => {
      this.router.navigate(['/admin', 'items'])
    }, () => {
      this.submitted = false
    })
  }
}
