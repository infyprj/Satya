import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    // Get the product ID from the route parameters
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProductData();
    });
  }

  initForm(): void {
    this.productForm = this.fb.group({
      productId: [0, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      categoryId: [0, Validators.required],
      modelUrl: ['', Validators.required],
      thumbnailUrl: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  loadProductData(): void {
    this.isLoading = true;
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
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
    const updatedProduct: Product = this.productForm.value;
    
    this.productService.updateProduct(updatedProduct).subscribe({
      next: (result) => {
        this.isLoading = false;
        if (result) {
          // Navigate back to products list after successful update
          this.router.navigate(['/products']);
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
}
