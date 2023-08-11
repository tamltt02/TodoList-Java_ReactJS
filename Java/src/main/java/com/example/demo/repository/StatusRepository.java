package com.example.demo.repository;

import com.example.demo.entity.StatusEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusRepository extends JpaRepository<StatusEntity,Long> {

//    @Query("select c from CustomerEntity c where c.tenkh like %:keyword% OR c.diachi like %:keyword% OR c.dienthoai like %:keyword%")
//    List<CustomerEntity> search(@Param("keyword") String keyword);
//
//
    @Query("select c from StatusEntity c where c.ten like %:key% ")
    Page<StatusEntity> searchPage(@Param("key") String key, Pageable pageable);

//
//    Page<CustomerEntity> findAll(Pageable pageable);
//





}
