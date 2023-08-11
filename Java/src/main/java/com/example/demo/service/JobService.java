package com.example.demo.service;

import com.example.demo.entity.customizeResponse.ReponsePage;
import com.example.demo.entity.request.JobRequest;
import com.example.demo.entity.request.StatusRequest;

public interface JobService {


    ReponsePage searchPageSort(String key, int page, int size, String sort, String sortOrder) ;
    ReponsePage add(JobRequest jobRequest);
    ReponsePage update(Long id ,JobRequest jobRequest);
    ReponsePage delete(Long id);

}

