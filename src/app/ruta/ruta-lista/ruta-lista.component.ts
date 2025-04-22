import {Component, Input} from '@angular/core';
import {RutaService} from '../ruta.service';
import {Router, RouterLink} from '@angular/router';
import {CaravanaDto} from '../../dto/caravana-dto';
import {CaravanaService} from '../../caravana/caravana.service';
import {RutaDestinoDto} from '../../dto/ruta-destino-dto';

@Component({
  selector: 'app-ruta-lista',
  imports: [
  ],
  templateUrl: './ruta-lista.component.html',
  styleUrl: './ruta-lista.component.css'
})
export class RutaListaComponent {
  @Input()
  parametroCaravana: CaravanaDto | undefined;

  @Input()
  parametroRutas: RutaDestinoDto[] | undefined;

  @Input()
  selectedRuta: RutaDestinoDto | undefined;

  constructor(
    private rutaService: RutaService,
    private caravanaService: CaravanaService,
    private router: Router
  ) { }

  @Input()
  set id(id: number) {
    this.caravanaService.recuperarCaravana(id).subscribe(caravana => this.parametroCaravana = caravana);
    this.rutaService.listarRutasDesdeCiudadDeCaravana(id).subscribe(
      listaRutasDesdeCiudadDeCaravana => this.parametroRutas = listaRutasDesdeCiudadDeCaravana
    );
  }

  seleccionarRuta(rutaSeleccionada: RutaDestinoDto) {
    this.selectedRuta = rutaSeleccionada;
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

  viajar(rutaDestinoDto: RutaDestinoDto) {
    // Verificamos que parametroCaravana no sea undefined antes de continuar
    if (!this.parametroCaravana) {
      console.error('Error: La caravana no está definida');
      alert('No se puede viajar en este momento. La caravana no está cargada correctamente.');
      return;
    }
    const porcentaje = rutaDestinoDto.ciudadDestino.impuesto / 100;
    const descuento = this.parametroCaravana.dinero * porcentaje;
    this.parametroCaravana.dinero -= descuento;

    if (!this.parametroCaravana.tieneGuardias) {
      this.parametroCaravana.puntosVida = this.parametroCaravana.puntosVida - rutaDestinoDto.ruta.danio;
    }

    this.parametroCaravana.tiempoTranscurrido += rutaDestinoDto.ruta.distancia / this.parametroCaravana.velocidad;
    this.parametroCaravana['ciudad'] = rutaDestinoDto.ciudadDestino;

    this.caravanaService.modificarCaravana(this.parametroCaravana).subscribe({
      next: (respuesta) => {
        // Actualizamos el modelo local con la respuesta del servidor
        this.parametroCaravana = respuesta;
        // Navegamos después de que se confirme la actualización
        this.router.navigate([`/caravana/vista/${respuesta.id}`]);
      },
      error: (error) => {
        console.error('Error al actualizar la caravana:', error);
        alert('Hubo un error al viajar. Por favor, inténtalo de nuevo.');
      }
    });
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
