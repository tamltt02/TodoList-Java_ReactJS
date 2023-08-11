package com.example.demo.controller;

import com.example.demo.entity.request.JobDetailRequest;
import com.example.demo.entity.request.JobRequest;
import com.example.demo.entity.request.StatusRequest;
import com.example.demo.service.JobDetailService;
import com.example.demo.service.JobService;
import com.example.demo.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;

@RestController
@CrossOrigin("*")
@RequestMapping("job-detail/")
public class JobDetailController {

    @Autowired
    JobDetailService jobDetailService;

//
//    @GetMapping("get")
//    public ResponseEntity<?> getCustomer() {
//        return customerService.getCustomer();
//    }
//
    @PostMapping("post")
    public ResponseEntity<?> postJobDetail(@RequestBody JobDetailRequest jobDetailRequest) {
        return new ResponseEntity(jobDetailService.add(jobDetailRequest), HttpStatus.OK);
    }

    @PutMapping("put/{id}")
    public ResponseEntity<?> putJobDetail(@PathVariable("id") Long id, @RequestBody JobDetailRequest jobDetailRequest) {
        return new ResponseEntity<>(jobDetailService.update(id, jobDetailRequest), HttpStatus.OK);

    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable("id") Long id) {
        return new ResponseEntity<>(jobDetailService.delete(id), HttpStatus.OK);
    }


    @GetMapping("pageSearchSortAll/{idJob}")
    public ResponseEntity<?> paginationSortCustomer(@PathVariable("idJob" ) Long idJob,
                                                    @PathParam("key") String key,
                                                    @PathParam("page") int page,
                                                    @PathParam("limit") int limit,
                                                    @RequestParam(defaultValue = "idStatus") String sort,
                                                    @RequestParam(defaultValue = "DESC") String sortOrder) {
        return new ResponseEntity<>(jobDetailService.searchPageSort(idJob,key,page,limit,sort,sortOrder),HttpStatus.OK);
    }


}
