package com.example.demo.controller;

import com.example.demo.entity.request.JobRequest;
import com.example.demo.entity.request.StatusRequest;
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
@RequestMapping("job/")
public class JobController {

    @Autowired
    JobService jobService;

//
//    @GetMapping("get")
//    public ResponseEntity<?> getCustomer() {
//        return customerService.getCustomer();
//    }
//
    @PostMapping("post")
    public ResponseEntity<?> postCustomer(@RequestBody JobRequest jobRequest) {
        return new ResponseEntity(jobService.add(jobRequest), HttpStatus.OK);
    }

    @PutMapping("put/{id}")
    public ResponseEntity<?> putCustomer(@PathVariable("id") Long id, @RequestBody JobRequest jobRequest) {
        return new ResponseEntity<>(jobService.update(id, jobRequest), HttpStatus.OK);

    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable("id") Long id) {
        return new ResponseEntity<>(jobService.delete(id), HttpStatus.OK);
    }
//    @GetMapping("search")
//    public ResponseEntity<?> getCustomer(@RequestParam(value = "keyword",required = false) String keyword) {
//        if(keyword == null){
//            return new ResponseEntity(customerService.getCustomer(),HttpStatus.OK);
//        }
//        return new ResponseEntity( customerService.search(keyword),HttpStatus.OK);
//    }
//
//    @GetMapping("pagination")
//    public ResponseEntity<?> paginationCustomer(
//            @PathParam("page") int page,
//            @PathParam("limit") int limit){
//        return new ResponseEntity<>(customerService.Pagination(page,limit),HttpStatus.OK);
//    }


//    @GetMapping("pageSearch")
//    public ResponseEntity<?> paginationCustomer(@PathParam("key") String key,@PathParam("page") int page, @PathParam("limit") int limit) {
//        return new ResponseEntity<>(customerService.PaginationSearch(key,page,limit),HttpStatus.OK);
//    }

    @GetMapping("pageSearchSortAll")
    public ResponseEntity<?> paginationSortCustomer(@PathParam("key") String key,
                                                    @PathParam("page") int page,
                                                    @PathParam("limit") int limit,
                                                    @RequestParam(defaultValue = "idStatus") String sort,
                                                    @RequestParam(defaultValue = "DESC") String sortOrder) {
        return new ResponseEntity<>(jobService.searchPageSort(key,page,limit,sort,sortOrder),HttpStatus.OK);
    }

//    @GetMapping("pageSearchSort")
//    public ResponseEntity<?> paginationSortCustomer(
//                                                    @PathParam("page") int page,
//                                                    @PathParam("limit") int limit,
//                                                    @RequestParam(defaultValue = "") String sort,
//                                                    @RequestParam(defaultValue = "DESC") String sortOrder) {
//        return new ResponseEntity<>(customerService.PageSort(page,limit,sort,sortOrder),HttpStatus.OK);
//    }
}
