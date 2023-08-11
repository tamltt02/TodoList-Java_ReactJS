package com.example.demo.repository;

import com.example.demo.entity.JobDetailEntity;
import com.example.demo.entity.JobEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface JobDetailRepository extends JpaRepository<JobDetailEntity,Long> {

//    @Query("select c from CustomerEntity c where c.tenkh like %:keyword% OR c.diachi like %:keyword% OR c.dienthoai like %:keyword%")
//    List<CustomerEntity> search(@Param("keyword") String keyword);
//
//
    @Query("select j from JobDetailEntity j where j.job.idJob = :idJob and j.ten like %:key% ")
    Page<JobDetailEntity> searchPage(@Param("idJob") Long idJob ,@Param("key") String key, Pageable pageable);

    @Query("select j from JobDetailEntity j where j.job.idJob = :idJob ")
    List<JobDetailEntity> findAll(Long idJob);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM `job_detail` WHERE id_job_detail = ?1",nativeQuery = true)
    void deleteJD(Long idJobDetail);






}
