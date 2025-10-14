package org.example.customerservice.projections;

import org.example.customerservice.entities.Customer;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = Customer.class, name = "customerProjection")
public interface CustomerProjection {
    public String getId();
    public String getName();
    public String getEmail();
}
