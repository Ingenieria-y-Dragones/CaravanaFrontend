import {Component, Input} from '@angular/core';
import {LoginDto} from '../../dto/login-dto';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {JugadorDto} from '../../dto/jugador-dto';
import {LoginService} from '../login.service';
import {CaravanaDto} from '../../dto/caravana-dto';

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

  @Input()
  parametroCaravana: CaravanaDto | undefined;

  constructor(private auth: AuthService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.auth.logout();
  }

  login() {
    if (!this.loginDto.correo || !this.loginDto.contrasenia) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Primero hacer login para obtener el JWT
    this.auth.login(this.loginDto).subscribe({
      next: jwt => {
        console.log('Login exitoso:', jwt);

        // Ahora que tenemos el JWT, buscar el jugador
        this.loginService.recuperarCaravana(this.loginDto.correo).subscribe({
          next: caravana => {
            console.log('Caravana encontrada:', caravana);
            this.parametroCaravana = caravana;

            if (caravana?.id) {
              this.router.navigate([`/caravana/vista/${caravana.id}`]);
            } else {
              console.error('Jugador no tiene ID válido');
            }
          },
          error: err => {
            console.error("Error buscando jugador:", err);
          }
        });
      },
      error: err => {
        console.error("Login failed:", err);
      }
    });
  }
}
