import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { DashboardGuard } from "src/app/guards/dashboard.guard";
import { MainComponent } from "./main/main.component";
import { ProductsComponent } from "./products/products.component";
import { ProductNuevoComponent } from "./products/product-nuevo/product-nuevo.component";
import { ProductEditComponent } from "./products/product-edit/product-edit.component";
import { ProductDetalleComponent } from "./products/product-detalle/product-detalle.component";
import { OrderComponent } from "./order/order.component";
import { EditComponent } from "./order/edit/edit.component";
import { NuevaComponent } from "./order/nueva/nueva.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    children: [
      {path: '', component: MainComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'product-nuevo', component: ProductNuevoComponent},
      {path: 'product-editar/:id', component: ProductEditComponent},
      {path: 'product-detalle/:id', component: ProductDetalleComponent},
      {path: 'order', component: OrderComponent},
      {path: 'order-nueva', component: NuevaComponent},
      {path: 'order-editar/:id', component: EditComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
