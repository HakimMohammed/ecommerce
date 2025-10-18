package org.example.billingservice.repositories;

import org.example.billingservice.entities.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "bills")
public interface BillRepository extends JpaRepository<Bill, String> {
}
