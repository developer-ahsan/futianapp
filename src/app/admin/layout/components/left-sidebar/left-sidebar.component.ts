import { ApiService } from './../../../../services/api.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { LayoutService } from '../../services/layout.service';
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  public activeMenu:string = "";
  userType: any;
  userName: any;
  user: any;
  constructor(
    private layoutService: LayoutService,
    private authService: AuthService,
    public api: ApiService,
    public spinner: NgxUiLoaderService
    ) { }

  ngOnInit() {
    this.spinner.start();
    this.getUser();
  }
  getUser() {
    this.authService.profileUser().subscribe(data => {
      this.spinner.stop();
      console.log(data);
      this.user = data.success;
      this.authService.setCurrentUserName(data.success);
      this.authService.setCurrentUserType(data.success);
      this.userName = this.authService.getCurrentUserName();
      this.userType = this.authService.getCurrentUserType();
    })
  }
  openItem(item:string){
    if(this.activeMenu == item){
      this.activeMenu = "";
    } else {
      this.activeMenu = item;
    }
  }

  toggleSmallMenu(){
    this.layoutService.toggleLeftBar();
  }
}
