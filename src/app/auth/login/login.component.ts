import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  constructor(private auth: AuthService, private router: Router) { }
  email: string = '';
  password: string = '';
  loginError:boolean = false;
  userVacio:boolean = false;
  passVacio:boolean = false;
  

  // handleLogin()
  // {
    
  //   if(this.email === '')
  //   {
  //     this.userVacio = true;
  //     this.loginError = false;
  //     return ;
  //   }
  //   if(this.password === '')
  //   {
  //     this.userVacio = false;
  //     this.passVacio = true;
  //     this.loginError = false;
  //     return ;
  //   }
  //   this.passVacio = false;
  //   this.auth.login(this.email, this.password).subscribe(resp=>{
  //     let response = resp;
  //     console.log(response);
  //     if (resp.status !== 200)
  //     {
  //       this.loginError = true;
  //     }
  //     else 
  //     {
  //       localStorage.setItem("token", resp.token);
  //       // redirigir al dashboard
  //       localStorage.setItem('token', response.token);
  //       this.router.navigate(['/dashboard']);
  //     }
  //   });
    
  // }
  // handleLogin() {

  //   console.log('email',this.email);
  //   console.log('pasw',this.password);
    
  //   this.userVacio = this.email === '';
  //   this.passVacio = this.password === '';
  //   this.loginError = false;

  //   if (this.userVacio || this.passVacio) {
  //     return;
  //   }

  //   this.auth.login(this.email, this.password).subscribe(resp => {
  //     if (resp.status !== 200) {
  //       this.loginError = true;
  //     } else {
  //       localStorage.setItem("token", resp.token);
  //       this.router.navigate(['/dashboard']);
  //     }
  //   }, error => {
  //     this.loginError = true;
  //   });
  // }


  handleLogin() {
    console.log('email', this.email);
    console.log('password', this.password);

    this.userVacio = this.email === '';
    this.passVacio = this.password === '';
    this.loginError = false;

    if (this.userVacio || this.passVacio) {
      return;
    }

    this.auth.login(this.email, this.password).subscribe(resp => {
      console.log('Response:', resp);
      if (resp && resp.token) {
        localStorage.setItem("token", resp.token);
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError = true;
      }
    }, error => {
      console.error('Error:', error);
      this.loginError = true;
    });
  }


}
