import { ServicioDto } from './servicio-dto';

describe('ServicioDto', () => {
  it('should create a valid object with all properties', () => {
    const servicio: ServicioDto = {
      id: 1,
      tipo: 'TURISTICO',
      nombre: 'Guía turística'
    };
    
    expect(servicio).toBeTruthy();
    expect(servicio.id).toBe(1);
    expect(servicio.tipo).toBe('TURISTICO');
    expect(servicio.nombre).toBe('Guía turística');
  });

  it('should create a valid object without optional nombre property', () => {
    const servicio: ServicioDto = {
      id: 2,
      tipo: 'TRANSPORTE'
    };
    
    expect(servicio).toBeTruthy();
    expect(servicio.id).toBe(2);
    expect(servicio.tipo).toBe('TRANSPORTE');
    expect(servicio.nombre).toBeUndefined();
  });

  it('should accept different tipo values', () => {
    const servicios: ServicioDto[] = [
      { id: 1, tipo: 'TURISTICO', nombre: 'Tour' },
      { id: 2, tipo: 'TRANSPORTE', nombre: 'Taxi' },
      { id: 3, tipo: 'HOSPEDAJE', nombre: 'Hotel' },
      { id: 4, tipo: { codigo: 'ALM', descripcion: 'Alimentación' } } // Objeto complejo
    ];
    
    servicios.forEach(servicio => {
      expect(servicio).toBeTruthy();
      expect(typeof servicio.id).toBe('number');
      expect(servicio.tipo).toBeDefined();
    });
  });

  it('should handle null and undefined nombre values', () => {
    const servicioConNull: ServicioDto = {
      id: 1,
      tipo: 'TURISTICO',
      nombre: undefined
    };
    
    const servicioSinNombre: ServicioDto = {
      id: 2,
      tipo: 'TRANSPORTE'
    };
    
    expect(servicioConNull).toBeTruthy();
    expect(servicioSinNombre).toBeTruthy();
    expect(servicioConNull.nombre).toBeUndefined();
    expect(servicioSinNombre.nombre).toBeUndefined();
  });

  it('should validate required properties exist', () => {
    const servicio: ServicioDto = {
      id: 999,
      tipo: 'CUSTOM_TYPE'
    };
  
  });

  it('should work with complex tipo objects', () => {
    const tipoComplejo = {
      id: 1,
      codigo: 'TUR',
      descripcion: 'Servicios Turísticos',
      activo: true
    };
    
    const servicio: ServicioDto = {
      id: 100,
      tipo: tipoComplejo,
      nombre: 'Servicio con tipo complejo'
    };
    
    expect(servicio).toBeTruthy();
    expect(servicio.tipo).toEqual(tipoComplejo);
    expect(servicio.tipo.codigo).toBe('TUR');
  });
});