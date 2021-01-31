import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LayoutService } from './../../../../layout/services/layout.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
declare var jQuery: any;
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  addProductForm: FormGroup;
  formData = new FormData;
  products: any;
  delID: any;
  bulkProductForm: any;
  productId = '';
  arrayIndex: any;
  
  constructor(
    private layoutService: LayoutService,
    private spinner: NgxUiLoaderService,
    public api: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.initialize();
    this.getProducts();
  }
  initialize() {
    this.addProductForm = new FormGroup({
      image: new FormControl(''),
      item_no: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      rmb: new FormControl('', [Validators.required]),
      cbm: new FormControl('', [Validators.required]),
      qty: new FormControl('', [Validators.required])
    });
    this.bulkProductForm = new FormGroup({
      excel: new FormControl('', [Validators.required]),
    });
  }
  toggleRightBar(){
    this.layoutService.toggleRightBar();
  }
  getProducts() {
    this.products = null;
    this.spinner.start();
    this.api.get('getProducts').subscribe((data) => {
      this.spinner.stop();
      if(!data.error) {
        this.products = data.products;
      } else {
        this.toast.error(data.msg)
      }
    });
  }
  onFileChange(event, value) {
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
  uploadProducts() {
    this.spinner.start();
    this.api.post('addBulkProducts', this.formData).subscribe(data => {
      this.formData = new FormData;
      this.bulkProductForm.reset();
      this.spinner.stop();
      this.products = null;
      this.getProducts();
      jQuery("#addProductFile").modal("hide");
      if(data.error) {
          this.toast.error(data.msg);
      }
    })
  }
  delProduct(id, index) {
    this.delID = id;
    this.arrayIndex = index;
    jQuery("#delproduct").modal("show");
  }
  deleteProduct() {
    this.spinner.start();
    this.api.get('delProduct/'+this.delID).subscribe((data) => {
      this.spinner.stop();
      if(!data.error) {
        jQuery("#delproduct").modal("hide");
        this.getProducts();
      } else {
        this.toast.error(data.msg);
      }
    })
  }
  addProduct() {
    this.spinner.start();
    Object.keys(this.addProductForm.controls).forEach(key => {
      let val = this.addProductForm.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('addProduct', this.formData).subscribe((data) => {
      this.spinner.stop();
      this.formData = new FormData;
      this.addProductForm.reset();
      jQuery("#addProduct").modal("hide");
      if(!data.error) {
        this.toast.success(data.msg);
        if(!data.exist) {
          this.getProducts();
        }
      } else {
        this.toast.error(data.msg);
      }
    });
  }
  getProductById(index) {
    this.productId = this.products[index].id;
      this.addProductForm.patchValue({
        item_no: this.products[index].item_no,
        name: this.products[index].name,
        description: this.products[index].description,
        rmb: this.products[index].rmb,
        cbm: this.products[index].cbm,
        qty: this.products[index].qty
      });
      jQuery("#updateProduct").modal("show");
  }
  updateProduct() {
    this.spinner.start();
    Object.keys(this.addProductForm.controls).forEach(key => {
      let val = this.addProductForm.get(key).value;
      this.formData.append(key, val);
    });
    this.api.post('updateProduct/'+this.productId, this.formData).subscribe(data => {
      this.spinner.stop();
      this.addProductForm.reset();
      this.formData = new FormData;
      if(!data.error) {
        this.toast.success('Updated Successfully');
      } else {
        this.toast.success(data.msg);
      }
      jQuery("#updateProduct").modal("hide");
      this.getProducts();
    });
  }
}
