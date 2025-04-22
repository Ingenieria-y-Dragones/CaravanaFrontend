import {RutaDto} from './ruta-dto';
import {CiudadDto} from './ciudad-dto';

export class RutaDestinoDto {
  constructor(
    public ruta: RutaDto,
    public ciudadDestino: CiudadDto
  ){ }
}
