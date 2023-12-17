import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Celulares } from 'src/app/models/celular';
import { CelularService } from 'src/app/services/celulares.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Celulares | undefined;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private productService: CelularService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = Number(params['id']);
      this.product = this.productService.getProductById(productId);
      window.scrollTo(0, 0);
    });
  }

  onRegresar() {
    this.router.navigateByUrl('/pages/products');
    window.scrollTo(0, 0);
  }
}
