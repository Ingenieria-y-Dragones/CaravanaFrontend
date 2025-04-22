import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, JsonPipe} from '@angular/common';
import {HeaderComponent} from '../../components/header/header.component';
import {HttpClient} from '@angular/common/http';
import {StateService} from '../../components/state.service';


interface ProductoDto {
  id: number;
  tipo: string;
  nombre: string;
}

interface InventarioCiudadDto {
  id: number;
  producto: ProductoDto;
  cantidad: number;
}

interface InventarioCaravanaDto {
  id: number;
  producto: ProductoDto;
  cantidad: number;
}

interface ServicioOfrecidoDto {
  id: number;
  nombreServicio: string;
  precio: number;
}

@Component({
  selector: 'app-ciudad-vista',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './ciudad-vista.component.html',
  styleUrls: ['./ciudad-vista.component.css']
})
export class CiudadVistaComponent implements OnInit {
  ciudadNombre = 'Valdruna';
  productos: InventarioCiudadDto[] = [];
  servicios: ServicioOfrecidoDto[] = [];
  inventarioCaravana: InventarioCaravanaDto[] = [];
  estado: any = { dinero: 0, salud: 0 };
  panels = { products: true, services: true, inventory: true };

  constructor(
    private http: HttpClient,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.cargarEstadoCaravana();
  }

  cargarDatosIniciales() {
    this.http.get<InventarioCiudadDto[]>('http://localhost:8080/ciudad/1/inventario')
      .subscribe(data => this.productos = data);

    this.http.get<ServicioOfrecidoDto[]>('http://localhost:8080/ciudad/1/servicios')
      .subscribe(data => this.servicios = data);

    this.http.get<InventarioCaravanaDto[]>('http://localhost:8080/caravana/1/inventario')
      .subscribe(data => this.inventarioCaravana = data);
  }

  cargarEstadoCaravana() {
    this.http.get<any>('http://localhost:8080/caravana/1/estado-ciudad')
      .subscribe(data => {
        this.estado.dinero = data.dinero ?? 0;
        this.estado.salud = data.salud ?? 0;
        this.ciudadNombre = data.ciudadNombre ?? 'Valdruna';
      });
  }

  calcularPrecioCompra(producto: InventarioCiudadDto): number {
    return 100 / (1 + producto.cantidad); // Ajusta según tu lógica real
  }

  calcularPrecioVenta(producto: InventarioCaravanaDto): number {
    return 80 / (1 + producto.cantidad); // Ajusta según tu lógica real
  }

  comprarProducto(producto: InventarioCiudadDto) {
    const precio = this.calcularPrecioCompra(producto);

    if (this.estado.dinero < precio) {
      alert('No tienes suficiente dinero');
      return;
    }

    this.http.post<any>('http://localhost:8080/transaccion/compra/producto', {
      idCiudad: 1,
      idCaravana: 1,
      idProducto: producto.producto.id,
      cantidad: 1
    }).subscribe({
      next: (resultado) => {
        if (resultado.exito) {
          // Actualizar estado local
          this.estado.dinero = resultado.dineroRestante;
          producto.cantidad--;

          // Actualizar listas y notificar cambios
          this.actualizarDatosPostTransaccion();
        }
        alert(resultado.mensaje);
      },
      error: (err) => {
        console.error('Error en compra:', err);
        alert('Error al procesar la compra');
      }
    });
  }

  venderProducto(producto: InventarioCaravanaDto) {
    const precio = this.calcularPrecioVenta(producto);

    this.http.post<any>('http://localhost:8080/transaccion/venta/producto', {
      idCiudad: 1,
      idCaravana: 1,
      idProducto: producto.producto.id,
      cantidad: 1
    }).subscribe({
      next: (resultado) => {
        if (resultado.exito) {
          // Actualizar estado local
          this.estado.dinero = resultado.dineroRestante;
          producto.cantidad--;

          // Actualizar listas y notificar cambios
          this.actualizarDatosPostTransaccion();
        }
        alert(resultado.mensaje);
      },
      error: (err) => {
        console.error('Error en venta:', err);
        alert('Error al procesar la venta');
      }
    });
  }

  comprarServicio(servicio: ServicioOfrecidoDto) {
    if (this.estado.dinero < servicio.precio) {
      alert('No tienes suficiente dinero');
      return;
    }

    this.http.post<any>('http://localhost:8080/transaccion/compra/servicio', {
      idCiudad: 1,
      idCaravana: 1,
      idServicio: servicio.id
    }).subscribe({
      next: (resultado) => {
        if (resultado.exito) {
          this.estado.dinero = resultado.dineroRestante;
          this.estado.salud = resultado.saludActual;
          this.stateService.notificarCambioEstado();
        }
        alert(resultado.mensaje);
      },
      error: (err) => {
        console.error('Error en compra de servicio:', err);
        alert('Error al procesar la compra del servicio');
      }
    });
  }

  private actualizarDatosPostTransaccion() {
    // Recargar datos del backend
    this.cargarDatosIniciales();

    // Notificar a otros componentes
    this.stateService.notificarCambioEstado();
  }

  toggle(panel: 'products' | 'services' | 'inventory') {
    this.panels[panel] = !this.panels[panel];
  }
}
