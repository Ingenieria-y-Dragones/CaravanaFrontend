import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Esto es importante para que sea un singleton global
})
export class StateService {
  private estadoActualizadoSource = new Subject<void>();
  estadoActualizado$ = this.estadoActualizadoSource.asObservable();

  notificarCambioEstado(): void {
    this.estadoActualizadoSource.next();
  }
}
