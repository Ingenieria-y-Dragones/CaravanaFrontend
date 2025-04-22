export interface ProductoDto {
  id: number;
  tipo: string;
  nombre: string;
}

export interface InventarioCaravanaDto {
  id: number;
  producto: ProductoDto; // <-- Objeto anidado
  cantidad: number;
}
