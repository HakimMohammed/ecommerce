package org.example.customerservice.services;

import org.example.customerservice.entities.Customer;
import org.example.customerservice.repositories.CustomerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public Page<Customer> getAllCustomers(int page, int size, String keyword) {
        return customerRepository.findAllByKeyword(keyword, PageRequest.of(page, size));
    }

    @Override
    public Page<Customer> getAllCustomers(int page, int size) {
        return customerRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public Customer getCustomerById(String id) {
        return customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    @Override
    public void saveCustomer(Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public void deleteCustomer(String id) {
        customerRepository.deleteById(id);
    }

    @Override
    public void updateCustomer(Customer customer) {
        Customer existingCustomer = customerRepository.findById(customer.getId()).orElseThrow(() -> new RuntimeException("Customer not found"));
        existingCustomer.setEmail(customer.getEmail());
        existingCustomer.setName(customer.getName());
        customerRepository.save(existingCustomer);
    }
}
