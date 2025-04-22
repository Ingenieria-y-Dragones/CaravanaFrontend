import { Routes } from '@angular/router';
import {CiudadVistaComponent} from './ciudad/ciudad-vista/ciudad-vista.component';
import {MenuVistaComponent} from './menu/menu-vista/menu-vista.component';
import {RutaListaComponent} from './ruta/ruta-lista/ruta-lista.component';
import {RutaVistaComponent} from './ruta/ruta-vista/ruta-vista.component';
import {RutaEditarComponent} from './ruta/ruta-editar/ruta-editar.component';
import {CaravanaVistaComponent} from './caravana/caravana-vista/caravana-vista.component';

export const routes: Routes = [
  {path: '', component: MenuVistaComponent},
  {path: 'ciudad/vista/:id', component: CiudadVistaComponent},
  {path: 'ruta/lista/:id', component: RutaListaComponent}, // Equivalente en Spring Boot: /ruta/lista
  {path: 'ruta/vista/:id', component: RutaVistaComponent}, // Equivalente en Spring Boot: /ruta/vista/{id}
  {path: 'ruta/editar/:id', component: RutaEditarComponent }, // Equivalente en Spring Boot: /ruta/editar/{id}
  {path: 'caravana/vista/:id', component: CaravanaVistaComponent}, // Equivalente en Spring Boot: /caravana/vista/{id}
  //{path: '', pathMatch: 'full', redirectTo: 'ruta/lista'} // Equivalente en Spring Boot: /ruta/lista
];
