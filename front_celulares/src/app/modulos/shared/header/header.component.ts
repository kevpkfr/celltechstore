import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  status = false;
  isLogged = true;

  constructor(
    public cartService: CartService,
    private tokenService: TokenService,
    ){}

    ngOnInit(): void {
      this.isLogged = this.tokenService.isLogged() ? true : this.isLogged = false;
    }

    addToggle() {
      this.status = !this.status;
    }

    logOut(): void {
      this.tokenService.logOut();
    }

}
