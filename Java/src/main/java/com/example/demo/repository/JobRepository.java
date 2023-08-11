package com.example.demo.repository;

import com.example.demo.entity.JobDetailEntity;
import com.example.demo.entity.JobEntity;
import com.example.demo.entity.StatusEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<JobEntity,Long> {

    @Query("select j from JobEntity j where j.ten like %:key% ")
    Page<JobEntity> searchPage(@Param("key") String key, Pageable pageable);

    @Query("select j from JobDetailEntity j where j.status.idStatus = 17 and j.job.idJob = ?1")
    List<JobDetailEntity> findJobDone(Long idJob);

    @Query("select j from JobDetailEntity j where   j.job.idJob = ?1")
    List<JobDetailEntity> findJobDetailAll(Long idJob);







}
