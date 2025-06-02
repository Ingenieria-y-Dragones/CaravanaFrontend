import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginDto} from '../dto/login-dto';
import {map, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {JwtAuthenticationResponse} from '../dto/jwt-authentication-response';

const JWT_TOKEN = 'jwt-token';
const EMAIL = 'user-email';
const ROLE = 'user-role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginDto: LoginDto): Observable<JwtAuthenticationResponse> {
    return this.http
      .post<JwtAuthenticationResponse>(
        `${environment.serverUrl}/auth/login`,
        loginDto
      )
      .pipe(
        map((jwt) => {
          // Importante: https://stackoverflow.com/questions/27067251/where-to-store-jwt-in-browser-how-to-protect-against-csrf
          sessionStorage.setItem(JWT_TOKEN, jwt.token);
          sessionStorage.setItem(EMAIL, jwt.correo);
          sessionStorage.setItem(ROLE, jwt.rol);
          return jwt;
        })
      );
  }

  logout() {
    sessionStorage.removeItem(JWT_TOKEN);
    sessionStorage.removeItem(EMAIL);
    sessionStorage.removeItem(ROLE);
  }

  isAuthenticated() {
    return sessionStorage.getItem(JWT_TOKEN) != null;
  }

  token() {
    return sessionStorage.getItem(JWT_TOKEN);
  }

  role() {
    return sessionStorage.getItem(ROLE);
  }
}
