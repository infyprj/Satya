import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export interface IProduct {
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
  private baseUrl = 'https://localhost:7195/api/Product';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/GetAllProducts`)
      .pipe(catchError(this.errorHandler));
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/GetProductById?id=${id}`)
      .pipe(catchError(this.errorHandler));
  }

  addProduct(product: IProduct): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/AddProduct`, product)
      .pipe(catchError(this.errorHandler));
  }

  updateProduct(product: IProduct): Observable<{ success: boolean }> {
    return this.http.put<{ success: boolean }>(`${this.baseUrl}/UpdateProduct`, product)
      .pipe(catchError(this.errorHandler));
  }

  deleteProduct(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.baseUrl}/DeleteProduct?id=${id}`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
