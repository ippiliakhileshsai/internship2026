package com.ambulance.tracker.dto;

import com.ambulance.tracker.model.EmergencyPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class EmergencyRequestCreateRequest {
  @NotBlank
  public String patientName;

  @NotBlank
  public String phone;

  @NotBlank
  public String address;

  @NotBlank
  public String emergencyType;

  @NotNull
  public EmergencyPriority priority;

  @NotNull
  public Double latitude;

  @NotNull
  public Double longitude;

  @NotBlank
  public String source;
}
