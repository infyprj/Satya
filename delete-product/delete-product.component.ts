import { Component, OnInit } from '@angular/core';
import { ProductService, IProduct } from '../services/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  status: string = "";
  errorMsg: string = "";
  showDiv: boolean = false;
  products: IProduct[] = [];
  selectedProductId: number | null = null;
  confirmDelete: boolean = false;

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
    this.selectedProductId = productId || null;
    this.confirmDelete = false;
  }

  toggleConfirmDelete() {
    this.confirmDelete = !this.confirmDelete;
  }

  deleteProduct() {
    if (!this.selectedProductId) return;

    this._productService.deleteProduct(this.selectedProductId).subscribe(
      response => {
        this.showDiv = true;
        if (response.success) {
          this.status = "Product deleted successfully!";
          this.loadProducts(); // Refresh the product list
          this.selectedProductId = null;
          this.confirmDelete = false;
        } else {
          this.status = "Failed to delete product. Please try again.";
        }
      },
      error => {
        this.errorMsg = error;
        this.showDiv = true;
        this.status = "An error occurred while deleting the product.";
      },
      () => console.log("Delete product method executed successfully")
    );
  }
}
