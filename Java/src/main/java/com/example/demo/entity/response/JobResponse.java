package com.example.demo.entity.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobResponse {
    private  Long idJob;
    private  String ten;
    private Timestamp ngayTao;
    private String tiLe;
}
