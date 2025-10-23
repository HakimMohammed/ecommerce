package org.example.inventoryservice.services;

import org.example.inventoryservice.entities.Product;
import org.springframework.data.domain.Page;

public interface ProductService {
    Page<Product> getAllProducts(int page, int size, String keyword);
    Page<Product> getAllProducts(int page, int size);
    Product getProductById(String id);
    void saveProduct(Product product);
    void deleteProduct(String id);
    void updateProduct(String id, Product product);
}
