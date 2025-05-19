// Service to handle product-related API calls
export interface Product {
  productId: number
  name: string
  description: string
  price: number
  categoryId: number
  modelUrl: string
  thumbnailUrl: string
  quantity: number
}

export async function getProductById(id: number): Promise<Product> {
  try {
    // Replace with your actual API endpoint for getting a product by ID
    const response = await fetch(`https://localhost:7195/api/Product/${id}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    throw error
  }
}

export async function updateProduct(product: Product): Promise<boolean> {
  try {
    const response = await fetch("https://localhost:7195/api/Product/UpdateProduct", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })

    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error updating product:", error)
    throw error
  }
}
