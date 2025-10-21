package org.example.customerservice.web;

import lombok.RequiredArgsConstructor;
import org.example.customerservice.entities.Customer;
import org.example.customerservice.mappers.PagedResponseMapper;
import org.example.customerservice.records.PagedResponse;
import org.example.customerservice.services.CustomerService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CustomerRestController {
    private final CustomerService customerService;
    private final PagedResponseMapper pagedResponseMapper;

    @GetMapping("/customers")
    public ResponseEntity<PagedResponse<Customer>> getCustomers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword
    ) {
        Page<Customer> customers;

        if (keyword == null || keyword.isBlank()) {
            customers = customerService.getAllCustomers(page, size);
        } else {
            customers = customerService.getAllCustomers(page, size, keyword);
        }

        return ResponseEntity.ok(pagedResponseMapper.toPagedResponse(customers));
    }


}
