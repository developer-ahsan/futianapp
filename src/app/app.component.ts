import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthStateService } from './shared/auth-state.service';
import { TokenService } from './shared/token.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Futian';
  isSignedIn: boolean;
  constructor(
    private auth: AuthStateService,
    private authService: AuthService,
    public router: Router,
    public token: TokenService,
  ) {
  }

  ngOnInit() {
    this.auth.userAuthState.subscribe(val => {
        this.isSignedIn = val;
        if(this.isSignedIn) {
          if(this.authService.getCurrentUserType() == 'super_admin') {
            this.router.navigate(['dashboard'])
          } else if(this.authService.getCurrentUserType() == 'warehouse') {
            this.router.navigate(['/dashboard/home'])
          }
        } else {
          this.router.navigate(['login'])
        }
    });
  }
}
