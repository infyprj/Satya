import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  @ViewChild('productForm') productForm!: NgForm;
  
  product: Product = {
    productId: 0,
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
    modelUrl: '',
    thumbnailUrl: '',
    quantity: 0
  };
  
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // Get the product ID from the route parameters
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadProductData(id);
      }
    });
  }

  loadProductData(id: number): void {
    this.isLoading = true;
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load product data. Please try again.';
        console.error('Error loading product:', error);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    this.productService.updateProduct(this.product).subscribe({
      next: (result) => {
        this.isLoading = false;
        if (result) {
          this.successMessage = 'Product updated successfully!';
          // Navigate back to products list after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 2000);
        } else {
          this.errorMessage = 'Update failed. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred while updating the product. Please try again.';
        console.error('Error updating product:', error);
      }
    });
  }

  // Helper method to prevent non-numeric input in number fields
  onNumberInput(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
