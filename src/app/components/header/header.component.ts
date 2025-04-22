import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {CaravanaService} from '../../caravana/caravana.service';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  estado: any = {
    dinero: 0,
    salud: 0
  };
  tiempoRestante: string = '15:00';
  private estadoSub!: Subscription;
  private timerSub!: Subscription;
  private transaccionSub!: Subscription;
  private idCaravana = 1;

  constructor(private caravanaService: CaravanaService) {}

  ngOnInit(): void {
    this.loadEstado(); // Primera carga
    this.estadoSub = interval(10_000).subscribe(() => this.loadEstado()); // Actualiza cada 10s

    // Suscripción para actualización inmediata después de transacciones
    this.transaccionSub = this.caravanaService.estadoActualizado$.subscribe(() => {
      this.loadEstado();
    });
  }

  private loadEstado(): void {
    this.caravanaService.obtenerEstadoCiudad(this.idCaravana)
      .subscribe({
        next: (data: any) => {
          // Asignar explícitamente los campos para asegurar que se capturan correctamente
          this.estado = {
            dinero: data.dinero || 0,
            salud: data.salud || 0,
            ciudadNombre: data.ciudadNombre,
            velocidad: data.velocidad
          };

          console.log('Estado cargado:', this.estado); // Para diagnóstico

          if (data.tiempoMaximo != null && data.inicioJuego) {
            this.startCountdown(data.tiempoMaximo, data.inicioJuego);
          }
        },
        error: (error) => {
          console.error('Error al cargar estado:', error);
        }
      });
  }

  private startCountdown(tiempoMinutos: number, inicioStr: string) {
    const inicio = new Date(inicioStr).getTime();
    const fin = inicio + tiempoMinutos * 60_000;

    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }

    this.tiempoRestante = this.formatTime(fin - Date.now());

    this.timerSub = interval(1_000).subscribe(() => {
      const diff = fin - Date.now();
      this.tiempoRestante = this.formatTime(diff);
    });
  }

  private formatTime(ms: number): string {
    if (ms <= 0) { return '00:00'; }
    const m = Math.floor(ms / 60_000);
    const s = Math.floor((ms % 60_000) / 1_000);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  ngOnDestroy(): void {
    if (this.estadoSub) this.estadoSub.unsubscribe();
    if (this.timerSub) this.timerSub.unsubscribe();
    if (this.transaccionSub) this.transaccionSub.unsubscribe();
  }
}
