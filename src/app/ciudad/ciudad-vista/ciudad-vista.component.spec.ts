import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { CiudadVistaComponent } from './ciudad-vista.component';
import { StateService } from '../../components/state.service';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute } from '@angular/router';

describe('CiudadVistaComponent', () => {
  let component: CiudadVistaComponent;
  let fixture: ComponentFixture<CiudadVistaComponent>;
  let httpMock: HttpTestingController;
  let stateService: jasmine.SpyObj<StateService>;

  // Mock data
  const mockProductos = [
    {
      id: 1,
      producto: { id: 1, tipo: 'Arma', nombre: 'Espada' },
      cantidad: 5
    },
    {
      id: 2,
      producto: { id: 2, tipo: 'Comida', nombre: 'Pan' },
      cantidad: 10
    }
  ];
  const mockServicios = [
    { id: 1, nombreServicio: 'Curación', precio: 50 },
    { id: 2, nombreServicio: 'Descanso', precio: 20 }
  ];
  const mockInventarioCaravana = [
    {
      id: 1,
      producto: { id: 3, tipo: 'Tesoro', nombre: 'Oro' },
      cantidad: 3
    }
  ];
  const mockEstado = {
    dinero: 100,
    salud: 80,
    ciudadNombre: 'Valdruna'
  };

  beforeEach(async () => {
    const stateServiceSpy = jasmine.createSpyObj('StateService', ['notificarCambioEstado']);

    await TestBed.configureTestingModule({
      imports: [
        CiudadVistaComponent,
        HttpClientTestingModule,
        HeaderComponent
      ],
      providers: [
        { provide: StateService, useValue: stateServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => '1' }), // Simula id=1 en la URL
            snapshot: {
              paramMap: {
                get: (key: string) => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CiudadVistaComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    stateService = TestBed.inject(StateService) as jasmine.SpyObj<StateService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.ciudadNombre).toBe('Valdruna');
    expect(component.productos).toEqual([]);
    expect(component.servicios).toEqual([]);
    expect(component.inventarioCaravana).toEqual([]);
    expect(component.estado).toEqual({ dinero: 0, salud: 0 });
    expect(component.panels).toEqual({ products: true, services: true, inventory: true });
  });

  describe('ngOnInit', () => {
    it('should call cargarDatosIniciales and cargarEstadoCaravana', () => {
      spyOn(component, 'cargarDatosIniciales');
      spyOn(component, 'cargarEstadoCaravana');
      component.ngOnInit();
      expect(component.cargarDatosIniciales).toHaveBeenCalled();
      expect(component.cargarEstadoCaravana).toHaveBeenCalled();
    });
  });

  describe('cargarDatosIniciales', () => {
    it('should load all initial data successfully', () => {
      component.cargarDatosIniciales();
      const reqProductos = httpMock.expectOne('http://localhost:8080/ciudad/1/inventario');
      const reqServicios = httpMock.expectOne('http://localhost:8080/ciudad/1/servicios');
      const reqInventario = httpMock.expectOne('http://localhost:8080/caravana/1/inventario');

      expect(reqProductos.request.method).toBe('GET');
      expect(reqServicios.request.method).toBe('GET');
      expect(reqInventario.request.method).toBe('GET');

      reqProductos.flush(mockProductos);
      reqServicios.flush(mockServicios);
      reqInventario.flush(mockInventarioCaravana);

      expect(component.productos).toEqual(mockProductos);
      expect(component.servicios).toEqual(mockServicios);
      expect(component.inventarioCaravana).toEqual(mockInventarioCaravana);
    });
  });

  describe('cargarEstadoCaravana', () => {
    it('should load caravan state successfully', () => {
      component.cargarEstadoCaravana();
      const req = httpMock.expectOne('http://localhost:8080/caravana/1/estado-ciudad');
      expect(req.request.method).toBe('GET');
      req.flush(mockEstado);
      expect(component.estado.dinero).toBe(100);
      expect(component.estado.salud).toBe(80);
      expect(component.ciudadNombre).toBe('Valdruna');
    });

    it('should handle null values with defaults', () => {
      component.cargarEstadoCaravana();
      const req = httpMock.expectOne('http://localhost:8080/caravana/1/estado-ciudad');
      req.flush({ dinero: null, salud: null, ciudadNombre: null });
      expect(component.estado.dinero).toBe(0);
      expect(component.estado.salud).toBe(0);
      expect(component.ciudadNombre).toBe('Valdruna');
    });
  });

  describe('calcularPrecioCompra', () => {
    it('should calculate purchase price correctly', () => {
      const producto = mockProductos[0];
      const precio = component.calcularPrecioCompra(producto);
      const precioEsperado = 100 / (1 + producto.cantidad);
      expect(precio).toBe(precioEsperado);
    });
  });

  describe('calcularPrecioVenta', () => {
    it('should calculate sale price correctly', () => {
      const producto = mockInventarioCaravana[0];
      const precio = component.calcularPrecioVenta(producto);
      const precioEsperado = 80 / (1 + producto.cantidad);
      expect(precio).toBe(precioEsperado);
    });
  });

  describe('comprarProducto', () => {
    beforeEach(() => {
      component.estado.dinero = 100;
      spyOn(window, 'alert');
      spyOn(component, 'cargarDatosIniciales');
    });

    it('should show alert when insufficient money', () => {
      component.estado.dinero = 10;
      const producto = mockProductos[0];
      component.comprarProducto(producto);
      expect(window.alert).toHaveBeenCalledWith('No tienes suficiente dinero');
    });

    it('should complete purchase successfully', () => {
      const producto = mockProductos[0];
      const mockResponse = {
        exito: true,
        mensaje: 'Compra exitosa',
        dineroRestante: 80
      };
      component.comprarProducto(producto);
      const req = httpMock.expectOne('http://localhost:8080/transaccion/compra/producto');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        idCiudad: 1,
        idCaravana: 1,
        idProducto: producto.producto.id,
        cantidad: 1
      });
      req.flush(mockResponse);
      expect(component.estado.dinero).toBe(80);
      expect(producto.cantidad).toBe(4);
      expect(component.cargarDatosIniciales).toHaveBeenCalled();
      expect(stateService.notificarCambioEstado).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Compra exitosa');
    });

    it('should handle purchase error', () => {
      const producto = mockProductos[0];
      spyOn(console, 'error');
      component.comprarProducto(producto);
      const req = httpMock.expectOne('http://localhost:8080/transaccion/compra/producto');
      req.error(new ErrorEvent('Network error'));
      expect(console.error).toHaveBeenCalledWith('Error en compra:', jasmine.any(Object));
      expect(window.alert).toHaveBeenCalledWith('Error al procesar la compra');
    });
  });

  describe('venderProducto', () => {
    beforeEach(() => {
      spyOn(window, 'alert');
      spyOn(component, 'cargarDatosIniciales');
    });

    it('should complete sale successfully', () => {
      const producto = mockInventarioCaravana[0];
      const mockResponse = {
        exito: true,
        mensaje: 'Venta exitosa',
        dineroRestante: 120
      };
      component.venderProducto(producto);
      const req = httpMock.expectOne('http://localhost:8080/transaccion/venta/producto');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        idCiudad: 1,
        idCaravana: 1,
        idProducto: producto.producto.id,
        cantidad: 1
      });
      req.flush(mockResponse);
      expect(component.estado.dinero).toBe(120);
      expect(producto.cantidad).toBe(2);
      expect(component.cargarDatosIniciales).toHaveBeenCalled();
      expect(stateService.notificarCambioEstado).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Venta exitosa');
    });

    it('should handle sale error', () => {
      const producto = mockInventarioCaravana[0];
      spyOn(console, 'error');
      component.venderProducto(producto);
      const req = httpMock.expectOne('http://localhost:8080/transaccion/venta/producto');
      req.error(new ErrorEvent('Network error'));
      expect(console.error).toHaveBeenCalledWith('Error en venta:', jasmine.any(Object));
      expect(window.alert).toHaveBeenCalledWith('Error al procesar la venta');
    });
  });

  describe('comprarServicio', () => {
    beforeEach(() => {
      component.estado.dinero = 100;
      spyOn(window, 'alert');
    });

    it('should show alert when insufficient money', () => {
      component.estado.dinero = 10;
      const servicio = mockServicios[0];
      component.comprarServicio(servicio);
      expect(window.alert).toHaveBeenCalledWith('No tienes suficiente dinero');
    });

    it('should complete service purchase successfully', () => {
      const servicio = mockServicios[0];
      const mockResponse = {
        exito: true,
        mensaje: 'Servicio adquirido',
        dineroRestante: 50,
        saludActual: 100
      };
      component.comprarServicio(servicio);
      const req = httpMock.expectOne('http://localhost:8080/transaccion/compra/servicio');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        idCiudad: 1,
        idCaravana: 1,
        idServicio: servicio.id
      });
      req.flush(mockResponse);
      expect(component.estado.dinero).toBe(50);
      expect(component.estado.salud).toBe(100);
      expect(stateService.notificarCambioEstado).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Servicio adquirido');
    });

    it('should handle service purchase error', () => {
      const servicio = mockServicios[0];
      spyOn(console, 'error');
      component.comprarServicio(servicio);
      const req = httpMock.expectOne('http://localhost:8080/transaccion/compra/servicio');
      req.error(new ErrorEvent('Network error'));
      expect(console.error).toHaveBeenCalledWith('Error en compra de servicio:', jasmine.any(Object));
      expect(window.alert).toHaveBeenCalledWith('Error al procesar la compra del servicio');
    });
  });

  describe('actualizarDatosPostTransaccion', () => {
    it('should reload data and notify state changes when called indirectly', () => {
      spyOn(component, 'cargarDatosIniciales');
      const producto = mockProductos[0];
      const mockResponse = {
        exito: true,
        mensaje: 'Compra exitosa',
        dineroRestante: 80
      };
      component.estado.dinero = 100;
      component.comprarProducto(producto);
      const req = httpMock.expectOne('http://localhost:8080/transaccion/compra/producto');
      req.flush(mockResponse);
      expect(component.cargarDatosIniciales).toHaveBeenCalled();
      expect(stateService.notificarCambioEstado).toHaveBeenCalled();
    });
  });

  describe('toggle', () => {
    it('should toggle products panel', () => {
      expect(component.panels.products).toBe(true);
      component.toggle('products');
      expect(component.panels.products).toBe(false);
      component.toggle('products');
      expect(component.panels.products).toBe(true);
    });

    it('should toggle services panel', () => {
      expect(component.panels.services).toBe(true);
      component.toggle('services');
      expect(component.panels.services).toBe(false);
    });

    it('should toggle inventory panel', () => {
      expect(component.panels.inventory).toBe(true);
      component.toggle('inventory');
      expect(component.panels.inventory).toBe(false);
    });
  });
});