package org.example.billingservice.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private Date billingDate;
    private String customerID;
    @OneToMany(mappedBy = "bill")
    private List<ProductItem> productItems;
    @Transient
    private Customer customer;
}
