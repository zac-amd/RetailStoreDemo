package com.retail.product.controller;

import com.retail.product.model.Product;
import com.retail.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository repository;
    private final RestTemplate restTemplate;

    @GetMapping
    public List<Product> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Product create(@RequestBody Product p) {
        return repository.save(p);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return repository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/price")
    public ResponseEntity<Map<String, Object>> getPrice(@PathVariable Long id) {
        Product p = repository.findById(id).orElse(null);
        if (p == null) return ResponseEntity.notFound().build();

        // Call pricing service (service name as defined in docker-compose)
        String pricingUrl = "http://pricing-service:8000/pricing/" + id + "?base_price=" + p.getBasePrice();
        Double finalPrice = restTemplate.getForObject(pricingUrl, Double.class);

        return ResponseEntity.ok(Map.of(
                "productId", p.getId(),
                "name", p.getName(),
                "basePrice", p.getBasePrice(),
                "finalPrice", finalPrice
        ));
    }
}
