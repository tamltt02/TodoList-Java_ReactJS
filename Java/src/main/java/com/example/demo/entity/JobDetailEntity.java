package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.List;

@Data
@Table(name = "job_detail")
@Entity
public class JobDetailEntity {
    @Id
    @Column(name = "id_job_detail")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long idJobDetail;

    private  String ten;

    @Column(name = "ngay_tao")
    private Timestamp ngayTao;

    @ManyToOne
    @JoinColumn(name = "id_job")
    private JobEntity job;

    @ManyToOne
    @JoinColumn(name = "id_status")
    private StatusEntity status;

}
