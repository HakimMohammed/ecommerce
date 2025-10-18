package org.example.billingservice.entities;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Customer {
    private String id;
    private String name;
    private String email;
}
