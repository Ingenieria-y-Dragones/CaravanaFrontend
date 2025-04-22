import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CiudadDto} from '../dto/ciudad-dto';
import {environment} from '../../environments/environment';
import {InventarioCiudadDto} from '../dto/inventario-ciudad-dto';
import {ServicioOfrecidoDto} from '../dto/servicio-ofrecido-dto';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los datos de una ciudad por su ID
   */
  obtenerCiudad(id: number): Observable<CiudadDto> {
    return this.http.get<CiudadDto>(`${environment.serverUrl}/ciudad/${id}`);
  }

  /**
   * Obtiene el listado de productos disponibles en una ciudad
   */
  obtenerProductosCiudad(idCiudad: number): Observable<InventarioCiudadDto[]> {
    return this.http.get<InventarioCiudadDto[]>(
      `${environment.serverUrl}/ciudad/${idCiudad}/productos`
    );
  }

  /**
   * Obtiene el listado de servicios ofrecidos en una ciudad
   */
  obtenerServiciosCiudad(idCiudad: number): Observable<ServicioOfrecidoDto[]> {
    return this.http.get<ServicioOfrecidoDto[]>(
      `${environment.serverUrl}/ciudad/${idCiudad}/servicios`
    );
  }

  /**
   * Obtiene el estado actual de una ciudad
   */
  obtenerEstadoCiudad(idCiudad: number): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/ciudad/${idCiudad}/estado`);
  }

  /**
   * Actualiza los datos de una ciudad
   */
  actualizarCiudad(ciudad: CiudadDto): Observable<CiudadDto> {
    return this.http.put<CiudadDto>(
      `${environment.serverUrl}/ciudad`,
      ciudad,
      this.httpOptions
    );
  }
}
