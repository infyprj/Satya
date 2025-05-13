import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService, IProduct } from '../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  status: string = "";
  errorMsg: string = "";
  showDiv: boolean = false;
  products: IProduct[] = [];
  selectedProduct: IProduct | null = null;
  categories = [
    { id: 1, name: 'Sofa' },
    { id: 2, name: 'Table' },
    { id: 3, name: 'Bed' },
    { id: 4, name: 'Chair' }
  ];

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this._productService.getAllProducts().subscribe(
      products => {
        this.products = products;
      },
      error => {
        this.errorMsg = error;
      }
    );
  }

  onProductSelect(event: any) {
    const productId = parseInt(event.target.value);
    if (productId) {
      this._productService.getProductById(productId).subscribe(
        product => {
          this.selectedProduct = product;
        },
        error => {
          this.errorMsg = error;
        }
      );
    } else {
      this.selectedProduct = null;
    }
  }

  submitUpdateProductForm(form: NgForm) {
    if (!this.selectedProduct) return;

    const updatedProduct: IProduct = {
      productId: this.selectedProduct.productId,
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      categoryId: form.value.categoryId,
      modelUrl: form.value.modelUrl,
      thumbnailUrl: form.value.thumbnailUrl,
      quantity: form.value.quantity
    };

    this._productService.updateProduct(updatedProduct).subscribe(
      response => {
        this.showDiv = true;
        if (response.success) {
          this.status = "Product updated successfully!";
          this.loadProducts(); // Refresh the product list
        } else {
          this.status = "Failed to update product. Please try again.";
        }
      },
      error => {
        this.errorMsg = error;
        this.showDiv = true;
        this.status = "An error occurred while updating the product.";
      },
      () => console.log("Update product method executed successfully")
    );
  }
}
