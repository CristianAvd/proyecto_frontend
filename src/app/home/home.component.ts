import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Producto } from '../facturas/models/producto';
import { Categoria } from '../models/categoria';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productos: Producto[] = [];
  productosPorCategoria: Producto[] = [];
  categorias: Categoria[] = [];
  search: string = '';

  constructor(private productoService: ProductoService,  private router: Router) { }

  ngOnInit(): void {
    this.productoService.obtenerProductos()
        .subscribe(response => {
          this.productos = response;
        });
    this.productoService.obtenerCategorias()
        .subscribe(response => {
          this.categorias = response;
        });

  }

  buscarProductoByNombre(): void {
    this.productoService.obtenerProductosByNombre(this.search)
        .subscribe(response => {
          console.log(response);
          this.productos =[];
          this.productos = response;
        })
  }

  cargarProductos(): void {
    this.productos = [];
    this.productoService.obtenerProductos().subscribe(response => this.productos = response);
  }

  productosCategoria(id: number): void {
    this.productos = [];
    this.productoService.getProductosPorCategoria(id)
        .subscribe(response => {
          this.productos = response;
        });
  }

  logout(): void {
    this.router.navigate(['']);
    swal('Good bye','Ha cerrado sesión con éxito', 'success');
  }

}
