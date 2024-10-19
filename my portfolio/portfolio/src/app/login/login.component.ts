import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  constructor(private _AuthService:AuthService,private _Router: Router){}

  error = null;
//, Validators.email
  logIn = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });



  login() {
    if (this.logIn.valid) {
      console.log('Form is valid, attempting to log in...');
      // console.log(this.logIn.value);

      this._AuthService.logIn(this.logIn.value).subscribe(
        (response) => {
          console.log('Login response:', response);
          if (response.message == 'Logged') {
            this._Router.navigate(['/dashboard']);
            console.log(response.message);

          }
        },
        (error) => {
          console.log('Login error:', error);
          this.error = error.error.msg;
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }



  ngOnInit(): void {  }

}
