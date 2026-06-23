package com.ambulance.tracker.controller;

import com.ambulance.tracker.dto.DashboardStatsResponse;
import com.ambulance.tracker.service.DispatchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
  private final DispatchService dispatchService;

  public DashboardController(DispatchService dispatchService) {
    this.dispatchService = dispatchService;
  }

  @GetMapping("/statistics")
  public DashboardStatsResponse statistics() {
    return dispatchService.dashboardStats();
  }

  @GetMapping("/stats")
  public DashboardStatsResponse stats() {
    return dispatchService.dashboardStats();
  }
}
