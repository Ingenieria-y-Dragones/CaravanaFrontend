import { ProductoDto } from './inventario-caravana-dto';

describe('ProductoDto', () => {
  it('should create an instance', () => {
    const producto: ProductoDto = { id: 1, tipo: 'herramienta', nombre: 'Martillo' };
    expect(producto).toBeTruthy();
  });
});

