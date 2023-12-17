import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Celulares } from 'src/app/models/celular';
import { Producto } from 'src/app/models/producto';
import { CartService } from 'src/app/services/cart.service';
import { CelularService } from 'src/app/services/celulares.service';
import { ProductosService } from 'src/app/services/productos.service';
import { celularesData } from 'src/assets/data';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  productList: Celulares[] = celularesData;
  index = 0;
  productos: Producto[] = [];
  listaVacia: string | undefined;

constructor(
  private productService: CelularService,
  private router: Router,
  private cartService: CartService,
  private productoService: ProductosService,

) {}
//Carusel
selectIndex(i: number) {
  this.index = i;
}
onPreviousClick() {
  const previous = this.index - 1;
  this.selectIndex(previous < 0 ? 2 : previous);
}
onNextClick() {
  const next = this.index + 1;
  this.selectIndex(next > 2 ? 0 : next);
}
//fin carusel
//tab
activeTab = 'celulares';

selectTab(tabName: string) {
  this.activeTab = tabName;
}

//productos
ngOnInit(): void {
  this.productList = this.productService.getProducts();
  this.cargarProductos();
}

openProductDetails(product: Celulares) {
  this.router.navigate(['/app/pages/', product.id]);

}

addToCart(product: Celulares) {
  this.cartService.addToCart(product);
}

cargarProductos(): void {
  this.productoService.lista().subscribe(
    (data: Producto[]) => {
      this.productos = data;
      this.listaVacia = undefined;
    },
    (error) => {
      this.listaVacia = 'No tienes Productos Nuevos';
      console.error(error);
    }
  );
}

}

