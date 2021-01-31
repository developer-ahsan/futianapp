import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxSpinnerService } from 'ngx-spinner';
import { LayoutService } from './../../../../layout/services/layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
    private spinner: NgxUiLoaderService
  ) { }

  ngOnInit() {
  }
  toggleRightBar(){
    this.layoutService.toggleRightBar();
  }

}
