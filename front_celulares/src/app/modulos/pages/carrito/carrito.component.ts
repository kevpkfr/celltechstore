import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Celulares } from 'src/app/models/celular';

import { CartService } from 'src/app/services/cart.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  cartItems: Celulares[] = [];
  isLogged = true;

  constructor(
    private cartService: CartService,
    private router: Router,
    private tokenService: TokenService,

    ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.isLogged = this.tokenService.isLogged() ? true : this.isLogged = false;
  }

  removeFromCart(product: Celulares) {
    this.cartService.removeFromCart(product);
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  onRegresar() {
    this.router.navigateByUrl('/pages/products');
    window.scrollTo(0, 0);
  }

}
