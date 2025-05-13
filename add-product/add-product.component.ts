import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService, IProduct } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  status: string = "";
  errorMsg: string = "";
  showDiv: boolean = false;
  categories = [
    { id: 1, name: 'Sofa' },
    { id: 2, name: 'Table' },
    { id: 3, name: 'Bed' },
    { id: 4, name: 'Chair' }
  ];

  constructor(private _productService: ProductService) { }

  submitAddProductForm(form: NgForm) {
    const newProduct: IProduct = {
      productId: 0, // API will assign the actual ID
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      categoryId: form.value.categoryId,
      modelUrl: form.value.modelUrl,
      thumbnailUrl: form.value.thumbnailUrl,
      quantity: form.value.quantity
    };

    this._productService.addProduct(newProduct).subscribe(
      response => {
        this.showDiv = true;
        if (response) {
          this.status = "Product added successfully!";
          form.resetForm();
        } else {
          this.status = "Failed to add product. Please try again.";
        }
      },
      error => {
        this.errorMsg = error;
        this.showDiv = true;
        this.status = "An error occurred while adding the product.";
      },
      () => console.log("Add product method executed successfully")
    );
  }

  ngOnInit() {
  }
}
