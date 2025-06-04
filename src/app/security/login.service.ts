import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RutaDto} from '../dto/ruta-dto';
import {environment} from '../../environments/environment';
import {JugadorDto} from '../dto/jugador-dto';
import {CaravanaDto} from '../dto/caravana-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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

  recuperarCaravana(email: string): Observable<CaravanaDto> {
    return this.http.get<CaravanaDto>(`${environment.serverUrl}/jugador/${email}`);
  }
}
