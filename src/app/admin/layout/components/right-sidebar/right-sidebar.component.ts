import { Router } from '@angular/router';
import { TokenService } from './../../../../shared/token.service';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  constructor(
      private layoutService: LayoutService,
      private token: TokenService,
      private auth: AuthStateService,
      private router: Router
    ) {
  }

  ngOnInit() {}

  toggleSetting(){
    this.layoutService.toggleSettings();
  }

  showSearch(){
    this.layoutService.showSearch();
  }
  
  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    localStorage.removeItem('UserType');
    localStorage.removeItem('Username');
  }
}
