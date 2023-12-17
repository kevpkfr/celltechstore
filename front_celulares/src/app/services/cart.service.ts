import { Injectable } from '@angular/core';
import { Celulares } from '../models/celular';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: Celulares[] = [];

  addToCart(product: Celulares ) {
    this.cartItems.push(product);
  }

  removeFromCart(product: Celulares) {
    const index = this.cartItems.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getCartItems(): Celulares[]  {
    return this.cartItems;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.precio, 0);
  }
}
