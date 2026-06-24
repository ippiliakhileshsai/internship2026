package com.klef.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "flow_events")
public class FlowEvent {
    @Id
    private String id;
    
    private String name;
    private String type;
    private String room;
    private String time;
    private String date;
    private String billingCode;
    private Double amount;

    public FlowEvent() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getBillingCode() {
        return billingCode;
    }

    public void setBillingCode(String billingCode) {
        this.billingCode = billingCode;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
