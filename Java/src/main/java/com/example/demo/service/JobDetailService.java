package com.example.demo.service;

import com.example.demo.entity.customizeResponse.ReponsePage;
import com.example.demo.entity.request.JobDetailRequest;
import com.example.demo.entity.request.JobRequest;

public interface JobDetailService {


    ReponsePage searchPageSort(Long idJob,String key, int page, int size, String sort, String sortOrder) ;
    ReponsePage add(JobDetailRequest jobDetailRequest);
    ReponsePage update(Long id ,JobDetailRequest jobDetailRequest);
    ReponsePage delete(Long id);

}

