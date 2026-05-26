package com.example.demo.models;

import com.example.demo.validators.ContactNumberConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

import java.util.List;
@Data
@Builder
public class UserProductsModel {
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String contactNumber;
    private List<ProductModel> products;
}
