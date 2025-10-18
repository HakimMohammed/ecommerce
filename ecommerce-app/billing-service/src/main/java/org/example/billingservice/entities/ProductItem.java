package org.example.billingservice.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private int quantity;
    private double price;
    private String productID;
    @ManyToOne
    private Bill bill;
    @Transient
    private Product product;
}
