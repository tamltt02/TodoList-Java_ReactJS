package com.example.demo.entity.customizeResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReponsePage {
    private Double totalPage;
    private Object content;
    public String message ;
    private Long TotalItem;
}
