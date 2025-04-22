import {CiudadDto} from './ciudad-dto';

export class RutaDto {
  constructor(
    public id: number,
    public nombre: string,
    public distancia: number,
    public danio: number,
    public peligro: string,
    public ciudadOrigen: CiudadDto,
    public ciudadDestino: CiudadDto
  ){ }
}
