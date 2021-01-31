import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './layout/components/admin/admin.component';
import { OverlayMenuComponent } from './layout/components/overlay-menu/overlay-menu.component';
import { RightSidebarComponent } from './layout/components/right-sidebar/right-sidebar.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LeftSidebarComponent } from './layout/components/left-sidebar/left-sidebar.component';
import { SettingsComponent } from './layout/components/settings/settings.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [AdminComponent, OverlayMenuComponent, RightSidebarComponent, LeftSidebarComponent, SettingsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    NgxSpinnerModule,
    NgxUiLoaderModule
  ]
})
export class AdminModule { }
