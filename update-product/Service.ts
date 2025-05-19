import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  modelUrl: string;
  thumbnailUrl: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7195/api';

  constructor(private http: HttpClient) { }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/Product/${id}`);
  }

  updateProduct(product: Product): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/Product/UpdateProduct`, product);
  }
}
