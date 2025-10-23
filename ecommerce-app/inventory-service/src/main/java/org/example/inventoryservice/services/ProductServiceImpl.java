package org.example.inventoryservice.services;

import org.example.inventoryservice.entities.Product;
import org.example.inventoryservice.repositories.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Page<Product> getAllProducts(int page, int size, String keyword) {
        return productRepository.findAllByKeyword(keyword, PageRequest.of(page, size));
    }

    @Override
    public Page<Product> getAllProducts(int page, int size) {
        return productRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public Product getProductById(String id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    @Override
    public void updateProduct(String id, Product product) {
        Product exisitngProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        exisitngProduct.setName(product.getName());
        exisitngProduct.setPrice(product.getPrice());
        exisitngProduct.setQuantity(product.getQuantity());

        productRepository.save(exisitngProduct);
    }
}
