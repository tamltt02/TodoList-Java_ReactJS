package com.example.demo.service.impl;


import com.example.demo.entity.JobDetailEntity;
import com.example.demo.entity.JobEntity;
import com.example.demo.entity.StatusEntity;
import com.example.demo.entity.customizeResponse.ReponsePage;
import com.example.demo.entity.request.JobDetailRequest;
import com.example.demo.entity.request.JobRequest;
import com.example.demo.entity.request.StatusRequest;
import com.example.demo.entity.response.JobDetailResponse;
import com.example.demo.entity.response.JobResponse;
import com.example.demo.entity.response.StatusResponse;
import com.example.demo.repository.JobRepository;
import com.example.demo.repository.StatusRepository;
import com.example.demo.service.JobService;
import com.example.demo.service.StatusService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    ModelMapper mapper;



    @Override
    public ReponsePage add(JobRequest jobRequest) {
        JobEntity jobDetail = mapper.map(jobRequest, JobEntity.class);
        jobDetail.setNgayTao(new Timestamp(new Date().getTime()));
        JobResponse jobResponse = mapper.map(jobRepository.save(jobDetail),JobResponse.class);
        double TotalPage = Math.ceil(jobRepository.findAll().size()/5.0);
        return new ReponsePage(TotalPage,jobResponse,"Thêm thành công",null);
    }

    @Override
    public ReponsePage update(Long id, JobRequest jobRequest) {
        JobEntity jobDetail = jobRepository.findById(id).get();
        jobDetail.setTen(jobRequest.getTen());
        System.out.println(jobDetail);
        JobResponse jobResponse = mapper.map(jobRepository.save(jobDetail),JobResponse.class);
        return new ReponsePage(null,jobResponse,"Sửa thành công",null);
    }

    @Override
    public ReponsePage delete(Long id) {
        JobEntity jobDetail = jobRepository.findById(id).get();
        jobRepository.delete(jobDetail);
        double TotalPage = Math.ceil(jobRepository.findAll().size()/5.0);
        return new ReponsePage(TotalPage,null,"Xóa thành công",null);
    }

    @Override
    public ReponsePage searchPageSort(String key, int page, int size, String sort, String sortOrder) {
        System.out.println(sortOrder);
        Pageable pageable = PageRequest.of(page, size, Sort.by(SortOrder(sort, sortOrder)));
        Page<JobEntity> Page = jobRepository.searchPage(key, pageable);
        List<JobResponse> ListJob = Page.stream()
                .map( status -> mapper.map(status, JobResponse.class))
                .collect(Collectors.toList());
        List<JobResponse> ListJobNew = new ArrayList<>();

        for (JobResponse job: ListJob) {
                job.setTiLe(getTile(job.getIdJob()));
                ListJobNew.add(job);
        }
        return new ReponsePage(null,ListJobNew,"Get thành công",Page.getTotalElements() );

    }

    public List<Sort.Order> SortOrder(String sort, String sortDirection) {
        System.out.println(sortDirection);
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


    public String getTile (Long idJob){
        List<JobDetailEntity> findJob = jobRepository.findJobDone(idJob);
        List<JobDetailEntity> findAllJob = jobRepository.findJobDetailAll(idJob);
        String tiLe = findJob.size() + "/"+ findAllJob.size();
        return tiLe;
    }
}
