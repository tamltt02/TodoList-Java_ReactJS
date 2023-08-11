package com.example.demo.service.impl;


import com.example.demo.config.ModelMapperConfig;
import com.example.demo.entity.JobEntity;
import com.example.demo.entity.StatusEntity;
import com.example.demo.entity.customizeResponse.Message;
import com.example.demo.entity.customizeResponse.ReponsePage;
import com.example.demo.entity.request.JobRequest;
import com.example.demo.entity.request.StatusRequest;
import com.example.demo.entity.response.JobResponse;
import com.example.demo.entity.response.StatusResponse;
import com.example.demo.repository.StatusRepository;
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
public class StatusServiceImpl implements StatusService {

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    ModelMapper mapper;

    @Override
    public ReponsePage add(StatusRequest statusRequest) {
        StatusEntity statusEntity = mapper.map(statusRequest, StatusEntity.class);
        JobResponse jobResponse = mapper.map(statusRepository.save(statusEntity),JobResponse.class);
        double TotalPage = Math.ceil(statusRepository.findAll().size()/5.0);
        return new ReponsePage(TotalPage,jobResponse,"Thêm thành công",null);
    }

    @Override
    public ReponsePage update(Long id, StatusRequest statusRequest) {
        StatusEntity statusEntity = statusRepository.findById(id).get();
        statusEntity.setTen(statusRequest.getTen());
        System.out.println(statusEntity);
        StatusResponse statusResponse = mapper.map(statusRepository.save(statusEntity),StatusResponse.class);
        return new ReponsePage(null,statusResponse,"Sửa thành công",null);
    }

    @Override
    public ReponsePage delete(Long id) {
        StatusEntity statusEntity = statusRepository.findById(id).get();
        statusRepository.delete(statusEntity);
        double TotalPage = Math.ceil(statusRepository.findAll().size()/5.0);
        return new ReponsePage(TotalPage,null,"Xóa thành công",null);
    }

    @Override
    public List<StatusResponse> getAll() {
        List<StatusEntity> list = statusRepository.findAll();
        List<StatusResponse> ListStatus = list.stream()
                .map( status -> mapper.map(status, StatusResponse.class))
                .collect(Collectors.toList());
        return ListStatus;
    }


    @Override
    public ReponsePage searchPageSort(String key, int page, int size, String sort, String sortOrder) {
        System.out.println(sortOrder);
        Pageable pageable = PageRequest.of(page, size, Sort.by(SortOrder(sort, sortOrder)));
        Page<StatusEntity> Page = statusRepository.searchPage(key, pageable);
        List<StatusResponse> ListStatus = Page.stream()
                .map( status -> mapper.map(status, StatusResponse.class))
                .collect(Collectors.toList());
        double TotalPage = Math.ceil(statusRepository.findAll().size()/5.0);
        return new ReponsePage(null,ListStatus,"Get thành công",Page.getTotalElements() );

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
}
