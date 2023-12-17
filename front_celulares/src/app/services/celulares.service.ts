import { Injectable } from '@angular/core';
import { Celulares } from '../models/celular';
import { celularesData } from 'src/assets/data';


@Injectable({
  providedIn: 'root'
})
export class CelularService {

  productList: Celulares[] = [];

  constructor() {
    this.productList = celularesData;
  }

  getProducts(): Celulares[]  {
    return this.productList;
  }

  getProductById(id: number) {
    return this.productList.find(product => product.id === id);
  }

}
