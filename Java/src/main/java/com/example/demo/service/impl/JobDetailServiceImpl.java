package com.example.demo.service.impl;


import com.example.demo.config.DetailMapper;
import com.example.demo.entity.JobDetailEntity;
import com.example.demo.entity.JobEntity;
import com.example.demo.entity.StatusEntity;
import com.example.demo.entity.customizeResponse.ReponsePage;
import com.example.demo.entity.request.JobDetailRequest;
import com.example.demo.entity.request.StatusRequest;
import com.example.demo.entity.response.JobDetailResponse;
import com.example.demo.entity.response.JobResponse;
import com.example.demo.entity.response.StatusResponse;
import com.example.demo.repository.JobDetailRepository;
import com.example.demo.repository.JobRepository;
import com.example.demo.repository.StatusRepository;
import com.example.demo.service.JobDetailService;
import com.example.demo.service.StatusService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class JobDetailServiceImpl implements JobDetailService {

    @Autowired
    private JobDetailRepository jobDetailRepository;
    @Autowired
    private StatusRepository statusRepository;
    @Autowired
    private JobRepository jobRepository;


    @Autowired
    ModelMapper mapper;


    @Override
    public ReponsePage add(JobDetailRequest jobDetailRequest) {
        System.out.println(jobDetailRequest);
        JobDetailEntity jobDetail = new JobDetailEntity();
        JobEntity job = jobRepository.findById(jobDetailRequest.getJob()).get();
        StatusEntity status = statusRepository.findById(jobDetailRequest.getStatus()).get();
        jobDetail.setNgayTao(new Timestamp(new Date().getTime()));
        jobDetail.setIdJobDetail(null);
        jobDetail.setJob(job);
        jobDetail.setStatus(status);
        jobDetail.setTen(jobDetailRequest.getTen());
        JobDetailResponse jobResponse = DetailMapper.mapEntitytoResponse(jobDetailRepository.save(jobDetail));
        double TotalPage = Math.ceil(jobDetailRepository.findAll(jobDetailRequest.getJob()).size()/5.0);
        return new ReponsePage(TotalPage,jobResponse,"Thêm thành công",null);
    }

    @Override
    public ReponsePage update(Long id, JobDetailRequest jobDetailRequest) {
        StatusEntity statusEntity = statusRepository.findById(jobDetailRequest.getStatus()).get();
        JobEntity job = jobRepository.findById(jobDetailRequest.getJob()).get();
        JobDetailEntity jobDetail = jobDetailRepository.findById(id).get();
        jobDetail.setTen(jobDetailRequest.getTen());
        jobDetail.setJob(job);
        jobDetail.setStatus(statusEntity);
        System.out.println(jobDetail);
        JobDetailResponse jobResponse = DetailMapper.mapEntitytoResponse(jobDetailRepository.save(jobDetail));

        return new ReponsePage(null,jobResponse,"Sửa thành công",null);
    }

    @Override
    public ReponsePage delete(Long id) {
        JobDetailEntity jobDetail = jobDetailRepository.findById(id).get();
        jobDetailRepository.deleteJD(id);
        double TotalPage = Math.ceil(jobDetailRepository.findAll(jobDetail.getJob().getIdJob()).size()/5.0);
        return new ReponsePage(TotalPage,null,"Xóa thành công",null);
    }

    @Override
    public ReponsePage searchPageSort(Long idJob,String key, int page, int size, String sort, String sortOrder) {
        System.out.println(sortOrder);
        Pageable pageable = PageRequest.of(page, size, Sort.by(SortOrder(sort, sortOrder)));
        Page<JobDetailEntity> Page = jobDetailRepository.searchPage(idJob ,key, pageable);
        List<JobDetailEntity> List = Page.stream().collect(Collectors.toList());
        List<JobDetailResponse> responseList = new ArrayList<>();
        for (JobDetailEntity job: List ) {
            JobDetailResponse jobResponse = new JobDetailResponse();
            jobResponse.setJob(job.getJob().getIdJob());
            jobResponse.setIdJobDetail(job.getIdJobDetail());
            jobResponse.setStatus(job.getStatus().getTen());
            jobResponse.setNgayTao(job.getNgayTao());
            jobResponse.setTen(job.getTen());
            jobResponse.setIdStatus(job.getStatus().getIdStatus());
            responseList.add(jobResponse);
        }

        return new ReponsePage(null,responseList,"Get thành công",Page.getTotalElements() );

    }

    public List<Sort.Order> SortOrder(String sort, String sortDirection) {
        List<Sort.Order> sorts = new ArrayList<>();
        Sort.Direction direction ;
            if (sortDirection != null) {
                direction = Sort.Direction.fromString(sortDirection);
            } else {
                direction = Sort.Direction.DESC;
            }
            sorts.add(new Sort.Order(direction, sort));
        return sorts;
    }
}
