import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from './../../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from './../../../layout/services/layout.service';
import { Component, OnInit } from '@angular/core';
declare var jQuery:any;
@Component({
  selector: 'app-customers-management',
  templateUrl: './customers-management.component.html',
  styleUrls: ['./customers-management.component.scss']
})
export class CustomersManagementComponent implements OnInit {
  customers: any;
  customerStatusForm: FormGroup;
  addCustomerForm: FormGroup;
  updateCustomerForm: FormGroup;
  formData = new FormData;
  constructor(
    private layoutService: LayoutService,
    private toast: ToastrService,
    public spinner: NgxUiLoaderService,
    public api: ApiService
  ) { }

  ngOnInit() {
    this.initialize();
    this.getAppUsers();
  }
  initialize() {
    this.customerStatusForm = new FormGroup({
      status: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required])
    })
    this.addCustomerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      type: new FormControl('appUser'),
    })
    this.updateCustomerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      id: new FormControl(''),
    })
  }
  getAppUsers() {
    this.spinner.start();
    this.api.get('getAppUser').subscribe((data) => {
      console.log(data);
      this.spinner.stop();
      if (data.error) {
        this.toast.error(data.msg);
      } else {
        this.customers = data.data;
      }
    })
  }
  toggleRightBar(){
    this.layoutService.toggleRightBar();
  }
  openModal(status, id) {
    this.customerStatusForm.patchValue({
      status: status,
      id: id
    })
    jQuery("#addWarehouseModal").modal("start");
  }
  updateUserStatus() {
    this.spinner.start();
    this.api.post('updateUserStatus', this.customerStatusForm.value).subscribe((data) => {
      this.spinner.stop();
      if (data.error) {
        this.toast.error(data.msg);
        jQuery("#addWarehouseModal").modal("start");
      } else {
        this.customerStatusForm.reset();
        this.toast.success(data.msg);
        jQuery("#addWarehouseModal").modal("hide");
        this.getAppUsers();
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
    Object.keys(this.addCustomerForm.controls).forEach(key => {
      let val = this.addCustomerForm.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('addNewUser', this.formData).subscribe((data) => {
      this.spinner.stop();
      this.formData = new FormData;
      this.addCustomerForm.reset();
      jQuery("#insertWarehouseModal").modal("hide");
      if(!data.error) {
        this.toast.success('User added Successfully');
        this.customers = null;
        this.getAppUsers();
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
        this.customers = null;
        this.getAppUsers();
      } else {
        this.toast.error(data.msg)
      }
    })
  }
  openUpdateModal(user) {
    this.updateCustomerForm.patchValue({
      name: user.name,
      phone: user.userdetail.phone,
      address: user.userdetail.address,
      id: user.userdetail.id,
    })
    jQuery("#updateWarehouseModal").modal("start");
  }
  updateUser() {
    this.spinner.start();
    Object.keys(this.updateCustomerForm.controls).forEach(key => {
      let val = this.updateCustomerForm.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('updateUser', this.formData).subscribe((data) => {
      console.log(data);
      this.spinner.stop();
      this.formData = new FormData;
      this.updateCustomerForm.reset();
      jQuery("#updateWarehouseModal").modal("hide");
      if(!data.error) {
        this.toast.success('User updated Successfully');
        this.customers = null;
        this.getAppUsers();
      } else {
        this.toast.error(data.msg)
      }
    });
  }
}