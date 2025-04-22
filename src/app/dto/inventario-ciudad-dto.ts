import { ProductoDto } from "./inventario-caravana-dto";

export interface InventarioCiudadDto {
  id: number;
  producto: ProductoDto; // <-- Objeto anidado
  cantidad: number;
  precio: number;
  factorDemanda: number;
  factorOferta: number;
}
