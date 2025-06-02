import { Routes } from '@angular/router';
import {CiudadVistaComponent} from './ciudad/ciudad-vista/ciudad-vista.component';
import {MenuVistaComponent} from './menu/menu-vista/menu-vista.component';
import {RutaListaComponent} from './ruta/ruta-lista/ruta-lista.component';
import {RutaVistaComponent} from './ruta/ruta-vista/ruta-vista.component';
import {RutaEditarComponent} from './ruta/ruta-editar/ruta-editar.component';
import {CaravanaVistaComponent} from './caravana/caravana-vista/caravana-vista.component';
import {LoginComponent} from './security/login/login.component';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  //{path: '', component: MenuVistaComponent},
  {path: 'ciudad/vista/:id', component: CiudadVistaComponent, canActivate: [authGuard]},
  {path: 'ruta/lista/:id', component: RutaListaComponent, canActivate: [authGuard]}, // Equivalente en Spring Boot: /ruta/lista
  {path: 'ruta/vista/:id', component: RutaVistaComponent, canActivate: [authGuard]}, // Equivalente en Spring Boot: /ruta/vista/{id}
  {path: 'ruta/editar/:id', component: RutaEditarComponent, canActivate: [authGuard] }, // Equivalente en Spring Boot: /ruta/editar/{id}
  {path: 'caravana/vista/:id', component: CaravanaVistaComponent, canActivate: [authGuard]}, // Equivalente en Spring Boot: /caravana/vista/{id}
  {path: '', pathMatch: 'full', redirectTo: 'login'} // Equivalente en Spring Boot: /ruta/lista
];
