import { Component } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  order: Order[] = [];
  listaVacia: string | undefined;


  constructor(
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes(): void {
    this.orderService.getOrders().subscribe(
      (data: Order[]) => {
        this.order = data;
        this.fetchUserNames();
        this.listaVacia = undefined;
      },
      (error: any) => {
        this.listaVacia = 'No tienes Ordenes disponibles';
        console.error(error);
      }
    );
  }

  fetchUserNames(): void {
    this.order.forEach(order => {
      this.orderService.getUserById(order.userId).subscribe(
        (userData: any) => {
          order.userName = userData.nombreUsuario; // Asegúrate de que la propiedad sea la correcta
        },
        (error: any) => {
          console.error(`Error obteniendo información del usuario ${order.userId}`, error);
        }
      );
    });
  }
}
