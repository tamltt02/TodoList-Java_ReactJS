package com.example.demo.entity.customizeResponse;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
public String message ;
public double TotalPage;

    public Message(String message) {
        this.message = message;
    }
}
