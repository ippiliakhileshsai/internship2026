package com.ambulance.tracker.dto;

import com.ambulance.tracker.model.EmergencyRequestRecord;
import com.ambulance.tracker.model.LocationHistoryEntry;

import java.util.List;

public class TrackResponse {
  public EmergencyRequestRecord request;
  public List<LocationHistoryEntry> locationHistory;

  public TrackResponse() {
  }
}
