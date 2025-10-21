package org.example.customerservice.repositories;

import org.example.customerservice.entities.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

//@RepositoryRestResource(path = "customers")
public interface CustomerRepository extends JpaRepository<Customer, String> {
    @Query("""
                SELECT c FROM Customer c
                WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
                   OR LOWER(c.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    Page<Customer> findAllByKeyword(String keyword, Pageable pageable);
}
