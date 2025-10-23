package org.example.customerservice.services;

import org.example.customerservice.entities.Customer;
import org.springframework.data.domain.Page;

public interface CustomerService {

    Page<Customer> getAllCustomers(int page, int size, String keyword);

    Page<Customer> getAllCustomers(int page, int size);

    Customer getCustomerById(String id);

    void saveCustomer(Customer customer);

    void deleteCustomer(String id);

    void updateCustomer(String id, Customer customer);
}
