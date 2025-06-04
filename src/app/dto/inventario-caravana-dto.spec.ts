import { InventarioCaravanaDto, ProductoDto } from './inventario-caravana-dto';

describe('InventarioCaravanaDto', () => {
  it('should create an instance', () => {
    const producto: ProductoDto = { id: 1, tipo: 'alimento', nombre: 'Pan' };
    const inventario: InventarioCaravanaDto = { id: 1, producto, cantidad: 20 };
    expect(inventario).toBeTruthy();
  });
});

