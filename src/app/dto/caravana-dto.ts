import {CiudadDto} from './ciudad-dto';

export class CaravanaDto {
  constructor(
    public id: number,
    public nombre: string,
    public velocidad: number,
    public capacidadMaximaCarga: number,
    public dinero: number,
    public puntosVida: number,
    public tieneGuardias: boolean,
    public tiempoTranscurrido: number,
    public ciudad: CiudadDto
  ){ }
}
