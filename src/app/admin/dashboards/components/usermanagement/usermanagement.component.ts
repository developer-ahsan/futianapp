import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from './../../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from './../../../layout/services/layout.service';
import { Component, OnInit } from '@angular/core';
declare var jQuery:any;

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent implements OnInit {
  warehouseUsers: any;
  warehouseForm: FormGroup;
  addWarehouseForm: FormGroup;
  updateWarehouseForm: FormGroup;
  formData = new FormData;
  constructor(
    private layoutService: LayoutService,
    private toast: ToastrService,
    public spinner: NgxUiLoaderService,
    public api: ApiService
  ) { }

  ngOnInit() {
    this.initialize();
    this.getWareHouseUsers();
  }
  initialize() {
    this.warehouseForm = new FormGroup({
      status: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required])
    })
    this.addWarehouseForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      warehouse: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      type: new FormControl('warehouse'),
    })
    this.updateWarehouseForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      warehouse: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      id: new FormControl(''),
    })
  }
  getWareHouseUsers() {
    this.spinner.start();
    this.api.get('getWarehouseUser').subscribe((data) => {
      console.log(data);
      this.spinner.stop();
      if (data.error) {
        this.toast.error(data.msg);
      } else {
        this.warehouseUsers = data.data;
      }
    })
  }
  toggleRightBar(){
    this.layoutService.toggleRightBar();
  }
  openModal(status, id) {
    this.warehouseForm.patchValue({
      status: status,
      id: id
    })
    jQuery("#addWarehouseModal").modal("show");
  }
  updateUserStatus() {
    this.spinner.start();
    this.api.post('updateUserStatus', this.warehouseForm.value).subscribe((data) => {
      this.spinner.stop();
      if (data.error) {
        this.toast.error(data.msg);
        jQuery("#addWarehouseModal").modal("show");
      } else {
        this.warehouseForm.reset();
        this.toast.success(data.msg);
        jQuery("#addWarehouseModal").modal("hide");
        this.getWareHouseUsers();
      }
    })
  }
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      console.log(event.target.files);
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
          console.log(event.target.files);
          this.formData.append('image', event.target.files[0]);
      };
    }
  }
  insertWarehouseUser() {
    this.spinner.start();
    Object.keys(this.addWarehouseForm.controls).forEach(key => {
      let val = this.addWarehouseForm.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('addNewUser', this.formData).subscribe((data) => {
      this.spinner.stop();
      this.formData = new FormData;
      this.addWarehouseForm.reset();
      jQuery("#insertWarehouseModal").modal("hide");
      if(!data.error) {
        this.toast.success('User added Successfully');
        this.warehouseUsers = null;
        this.getWareHouseUsers();
      } else {
        this.toast.error(data.msg)
      }
    });
  }
  deleteUser(id) {
    this.spinner.start();
    this.api.get('deleteUser/' + id).subscribe((data) => {
      console.log(data);
      this.spinner.stop();
      if(!data.error) {
        this.toast.success(data.msg);
        this.warehouseUsers = null;
        this.getWareHouseUsers();
      } else {
        this.toast.error(data.msg)
      }
    })
  }
  openUpdateModal(user) {
    this.updateWarehouseForm.patchValue({
      name: user.name,
      warehouse: user.userdetail.warehouse,
      phone: user.userdetail.phone,
      address: user.userdetail.address,
      id: user.userdetail.id,
    })
    jQuery("#updateWarehouseModal").modal("show");
  }
  updateUser() {
    this.spinner.start();
    Object.keys(this.updateWarehouseForm.controls).forEach(key => {
      let val = this.updateWarehouseForm.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('updateUser', this.formData).subscribe((data) => {
      this.spinner.stop();
      this.formData = new FormData;
      this.updateWarehouseForm.reset();
      jQuery("#updateWarehouseModal").modal("hide");
      if(!data.error) {
        this.toast.success('User updated Successfully');
        this.warehouseUsers = null;
        this.getWareHouseUsers();
      } else {
        this.toast.error(data.msg)
      }
    });
  }
}
