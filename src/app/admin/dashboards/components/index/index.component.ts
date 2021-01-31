import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { LayoutService } from '../../../layout/services/layout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
    public authService: AuthService,
    private toast: ToastrService
    ) { }

  ngOnInit() {
  }

  toggleRightBar(){
    this.layoutService.toggleRightBar();
  }

}
