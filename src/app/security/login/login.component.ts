import { Component } from '@angular/core';
import {LoginDto} from '../../dto/login-dto';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginDto: LoginDto = new LoginDto("", "");

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.logout();
  }

  login() {
    this.auth.login(this.loginDto)
      .subscribe({
        next: jwt => {
          console.log(jwt);
          this.router.navigate(["caravana/vista/1"]);
        },
        error: err => { console.error("Login failed:", err) }
      });
  }
}
