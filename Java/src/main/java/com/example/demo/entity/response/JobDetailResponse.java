package com.example.demo.entity.response;

import com.example.demo.entity.JobEntity;
import com.example.demo.entity.StatusEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobDetailResponse {
    private  Long idJobDetail;
    private  String ten;
    private  Timestamp ngayTao;
    private  Long job;
    private  String status;
    private  Long idStatus;
}
