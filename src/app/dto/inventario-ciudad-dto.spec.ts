import { InventarioCiudadDto } from './inventario-ciudad-dto';
import { ProductoDto } from './inventario-caravana-dto';

describe('InventarioCiudadDto', () => {
  it('should create an instance', () => {
    const producto: ProductoDto = { id: 1, tipo: 'bebida', nombre: 'Agua' };
    const inventario: InventarioCiudadDto = {
      id: 2,
      producto,
      cantidad: 50,
      precio: 10,
      factorDemanda: 1.2,
      factorOferta: 0.8
    };
    expect(inventario).toBeTruthy();
  });
});

