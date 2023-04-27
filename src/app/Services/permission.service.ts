import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private service:AuthenticationService) { }

  canActivate():boolean {
    return this.service.isLogged();
  }
}
