import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authed-nav-bar',
  templateUrl: './authed-nav-bar.component.html',
  styleUrls: ['./authed-nav-bar.component.css']
})
export class AuthedNavBarComponent {
  constructor(private service:AuthenticationService, private router:Router) {}

  cerrarSesion() {
    this.service.cerrarSesion(() => {
      this.router.navigate(['/login']);
    });
  }
}
