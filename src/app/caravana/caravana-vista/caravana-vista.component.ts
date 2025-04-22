import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {CaravanaDto} from '../../dto/caravana-dto';
import {CaravanaService} from '../caravana.service';
import {JugadorDto} from '../../dto/jugador-dto';
import {CiudadDto} from '../../dto/ciudad-dto';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-caravana-vista',
  imports: [],
  templateUrl: './caravana-vista.component.html',
  styleUrl: './caravana-vista.component.css'
})
export class CaravanaVistaComponent {
  @Input()
  parametroCaravana: CaravanaDto | undefined;

  @Input()
  parametroJugadores: JugadorDto[] | undefined;

  @Input()
  parametroCiudad: CiudadDto | undefined;
  http: any;
  apiUrl: any;

  constructor(
    private caravanaService: CaravanaService,
    private router: Router
  ) { }

  @Input()
  set id(id: number) {
    this.caravanaService.recuperarCaravana(id).subscribe(caravana => this.parametroCaravana = caravana);
    this.caravanaService.listarJugadores(id).subscribe(jugadores => this.parametroJugadores = jugadores);
    this.caravanaService.recuperarCiudad(id).subscribe(ciudad => this.parametroCiudad = ciudad);
  }

  rutas() {
    if (!this.parametroCaravana) {
      console.error('Error: La caravana no está definida');
      alert('No se puede viajar en este momento. La caravana no está cargada correctamente.');
      return;
    }
    this.router.navigate([`/ruta/lista/${this.parametroCaravana.id}`]);
  }

  mapa() {
    if (!this.parametroCaravana) {
      console.error('Error: La caravana no está definida');
      alert('No se puede comerciar en este momento. La caravana no está cargada correctamente.');
      return;
    }
    this.router.navigate([`/caravana/vista/${this.parametroCaravana.id}`]);
  }

  back() {
    if (!this.parametroCaravana) {
      console.error('Error: La caravana no está definida');
      alert('No se puede comerciar en este momento. La caravana no está cargada correctamente.');
      return;
    }
    this.router.navigate([``]);
  }

  getEstadoCiudadCaravana(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/estado-ciudad`);
  }

  comerciar() {
    if (!this.parametroCaravana) {
      console.error('Error: La caravana no está definida');
      alert('No se puede comerciar en este momento. La caravana no está cargada correctamente.');
      return;
    }
    this.router.navigate([`/ciudad/vista/${this.parametroCaravana.ciudad.id}`]);
  }
}
