package com.klef.demo.repository;

import com.klef.demo.entity.FlowEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlowEventRepository extends JpaRepository<FlowEvent, String> {
}
