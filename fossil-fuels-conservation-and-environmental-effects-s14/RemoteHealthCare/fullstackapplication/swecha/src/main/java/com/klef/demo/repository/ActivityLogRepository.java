package com.klef.demo.repository;

import com.klef.demo.entity.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, String> {
}
