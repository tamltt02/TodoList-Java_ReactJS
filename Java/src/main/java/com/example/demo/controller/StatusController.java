package com.example.demo.controller;

import com.example.demo.entity.request.StatusRequest;
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
@RequestMapping("status/")
public class StatusController {

    @Autowired
    StatusService statusService;


    @GetMapping("get")
    public ResponseEntity<?> getStatus() {
        return new ResponseEntity(statusService.getAll(), HttpStatus.OK);
    }
//
    @PostMapping("post")
    public ResponseEntity<?> postCustomer(@RequestBody StatusRequest statusRequest) {
        return new ResponseEntity(statusService.add(statusRequest), HttpStatus.OK);
    }

    @PutMapping("put/{id}")
    public ResponseEntity<?> putCustomer(@PathVariable("id") Long id, @RequestBody StatusRequest statusRequest) {
        return new ResponseEntity<>(statusService.update(id, statusRequest), HttpStatus.OK);

    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable("id") Long id) {
        return new ResponseEntity<>(statusService.delete(id), HttpStatus.OK);
    }


    @GetMapping("pageSearchSortAll")
    public ResponseEntity<?> paginationSortCustomer(@PathParam("key") String key,
                                                    @PathParam("page") int page,
                                                    @PathParam("limit") int limit,
                                                    @RequestParam(defaultValue = "idStatus") String sort,
                                                    @RequestParam(defaultValue = "DESC") String sortOrder) {
        return new ResponseEntity<>(statusService.searchPageSort(key,page,limit,sort,sortOrder),HttpStatus.OK);
    }


}
