package com.example.demo.service;

import com.example.demo.entity.customizeResponse.Message;
import com.example.demo.entity.customizeResponse.ReponsePage;
import com.example.demo.entity.request.StatusRequest;
import com.example.demo.entity.response.StatusResponse;

import java.util.List;

public interface StatusService {


    ReponsePage searchPageSort(String key, int page, int size, String sort, String sortOrder) ;
    ReponsePage add(StatusRequest statusRequest);
    ReponsePage update(Long id ,StatusRequest statusRequest);
    ReponsePage delete(Long id);
    List<StatusResponse> getAll();


}

