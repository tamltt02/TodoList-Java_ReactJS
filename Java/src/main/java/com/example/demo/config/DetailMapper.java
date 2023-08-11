package com.example.demo.config;

import com.example.demo.entity.JobDetailEntity;
import com.example.demo.entity.JobEntity;
import com.example.demo.entity.response.JobDetailResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class DetailMapper {

    public  static JobDetailResponse mapEntitytoResponse(JobDetailEntity jobDetail){
        JobDetailResponse jobDetailResponse =  JobDetailResponse.builder()
                .ten(jobDetail.getTen())
                .idJobDetail(jobDetail.getIdJobDetail())
                .job(jobDetail.getIdJobDetail())
                .ngayTao(jobDetail.getNgayTao())
                .status(jobDetail.getTen())
                .idStatus(jobDetail.getStatus().getIdStatus())
                .build();

        return jobDetailResponse;
    }
}
