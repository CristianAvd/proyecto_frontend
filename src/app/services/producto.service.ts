import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { Producto } from '../facturas/models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndPoint: string = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlEndPoint);
  }

  obtenerProductosByNombre(nombre: string): Observable<Producto[]> {
    let params = new HttpParams();
    params = params.set('nombre', nombre);
    return this.http.get<Producto[]>(this.urlEndPoint+'/byNombre', {params: params});
  }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlEndPoint+"/categorias");
  }

  buscarProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.urlEndPoint+"/"+id);
  }

  getProductosPorCategoria(id: number): Observable<Producto[]> {
    let params = new HttpParams();
    params = params.set('id', id.toString());
    return this.http.get<Producto[]>(this.urlEndPoint+'/productosCategoria', {params: params});
  }

}
