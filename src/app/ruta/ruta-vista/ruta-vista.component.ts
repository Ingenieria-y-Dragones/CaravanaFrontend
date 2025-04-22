import {Component, Input} from '@angular/core';
import {RutaDto} from '../../dto/ruta-dto';
import {NgIf} from '@angular/common';
import {RutaService} from '../ruta.service';
import {Router} from '@angular/router';
import {RutaDestinoDto} from '../../dto/ruta-destino-dto';

@Component({
  selector: 'app-ruta-vista',
  imports: [

  ],
  templateUrl: './ruta-vista.component.html',
  styleUrl: './ruta-vista.component.css'
})
export class RutaVistaComponent {
  @Input()
  parametroRuta: RutaDto | undefined

  constructor(
    private rutaService: RutaService,
    private router: Router
  ) {
  }

  @Input()
  set id(id: number) {
    this.rutaService.recuperarRuta(id).subscribe(ruta => this.parametroRuta = ruta);
  }

  back() {
    this.router.navigate(['/ruta/lista']);
  }
}
