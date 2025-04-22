import {Component, Input} from '@angular/core';
import {RutaDto} from '../../dto/ruta-dto';
import {RutaService} from '../ruta.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-ruta-editar',
  imports: [
    FormsModule
  ],
  templateUrl: './ruta-editar.component.html',
  styleUrl: './ruta-editar.component.css'
})
export class RutaEditarComponent {
  @Input()
  ruta: RutaDto | undefined

  constructor(
    private rutaService: RutaService,
    private router: Router
  ) { }

  @Input()
  set id(id: number) {
    this.rutaService.recuperarRuta(id).subscribe(ruta => this.ruta = ruta);
  }

  onSubmit() {
    //console.log("enviando", this.ruta);
    if (this.ruta) {
      this.rutaService.modificarRuta(this.ruta)
        .subscribe(
          nuevaRuta => {
            console.log("Ruta editada", nuevaRuta);
            this.router.navigate(['/ruta/lista']);
          }
        )
    }
  }
}
