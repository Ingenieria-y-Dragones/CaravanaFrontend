import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import {environment} from '../../environments/environment';
import {CaravanaDto} from '../dto/caravana-dto';
import {JugadorDto} from '../dto/jugador-dto';
import {CiudadDto} from '../dto/ciudad-dto';
import {InventarioCaravanaDto} from '../dto/inventario-caravana-dto';

@Injectable({
  providedIn: 'root'
})
export class CaravanaService {

  private estadoActualizado = new Subject<void>();
  estadoActualizado$ = this.estadoActualizado.asObservable();

  private httpOptions = {
    headers: new HttpHeaders(
      {
        "Content-Type": "application/json"
      }
    )
  }

  constructor(
    private http: HttpClient
  ) { }

  recuperarCaravana(id: number): Observable<CaravanaDto> {
    return this.http.get<CaravanaDto>(`${environment.serverUrl}/caravana/${id}`);
  }

  recuperarCiudad(id: number): Observable<CiudadDto> {
    return this.http.get<CiudadDto>(`${environment.serverUrl}/caravana/${id}/ciudad`);
  }

  modificarCaravana(caravana: CaravanaDto): Observable<CaravanaDto> {
    return this.http.put<CaravanaDto>(
      `${environment.serverUrl}/caravana`,
      caravana,
      this.httpOptions
    )
  }

  listarJugadores(id: number): Observable<JugadorDto[]> {
    return this.http.get<JugadorDto[]>(`${environment.serverUrl}/caravana/${id}/jugadores`);
  }

  obtenerEstadoCiudad(id: number): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/caravana/${id}/estado-ciudad`);
  }

  obtenerInventarioCaravana(idCaravana: number): Observable<InventarioCaravanaDto[]> {
    return this.http.get<InventarioCaravanaDto[]>(
      `${environment.serverUrl}/caravana/${idCaravana}/inventario`
    );
  }

  comprarProducto(idCiudad: number, idCaravana: number, idProducto: number, cantidad: number): Observable<any> {
    return this.http.post(
      `${environment.serverUrl}/transaccion/compra/producto`,
      {
        idCiudad: idCiudad,
        idCaravana: idCaravana,
        idProducto: idProducto,
        cantidad: cantidad
      },
      this.httpOptions
    ).pipe(
      tap(() => this.notificarCambioEstado())
    );
  }

  comprarServicio(idCiudad: number, idCaravana: number, idServicio: number): Observable<any> {
    return this.http.post(
      `${environment.serverUrl}/transaccion/compra/servicio`,
      {
        idCiudad: idCiudad,
        idCaravana: idCaravana,
        idServicio: idServicio
      },
      this.httpOptions
    ).pipe(
      tap(() => this.notificarCambioEstado())
    );
  }

  venderProducto(idCiudad: number, idCaravana: number, idProducto: number, cantidad: number): Observable<any> {
    return this.http.post(
      `${environment.serverUrl}/transaccion/venta/producto`,
      {
        idCiudad: idCiudad,
        idCaravana: idCaravana,
        idProducto: idProducto,
        cantidad: cantidad
      },
      this.httpOptions
    ).pipe(
      tap(() => this.notificarCambioEstado())
    );
  }

  notificarCambioEstado(): void {
    this.estadoActualizado.next();
  }
}
