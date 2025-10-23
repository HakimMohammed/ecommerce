package org.example.inventoryservice.web;

import lombok.RequiredArgsConstructor;
import org.example.inventoryservice.entities.Product;
import org.example.inventoryservice.mappers.PagedResponseMapper;
import org.example.inventoryservice.records.PagedResponse;
import org.example.inventoryservice.services.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductRestController {
    private final ProductService productService;
    private final PagedResponseMapper pagedResponseMapper;

    @GetMapping("/products")
    public ResponseEntity<PagedResponse<Product>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword
    ) {
        Page<Product> products;

        if (keyword == null || keyword.isBlank()) {
            products = productService.getAllProducts(page, size);
        } else {
            products = productService.getAllProducts(page, size, keyword);
        }

        return ResponseEntity.ok(pagedResponseMapper.toPagedResponse(products));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/products")
    public void saveProduct(@RequestBody Product product) {
        productService.saveProduct(product);
    }

    @PutMapping("/products/{id}")
    public void updateProduct(@PathVariable String id, @RequestBody Product product) {
        productService.updateProduct(id, product);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }
}
