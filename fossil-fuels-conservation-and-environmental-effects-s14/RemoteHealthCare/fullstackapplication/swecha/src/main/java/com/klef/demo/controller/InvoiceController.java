package com.klef.demo.controller;

import com.klef.demo.entity.Invoice;
import com.klef.demo.repository.InvoiceRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin("*")
public class InvoiceController {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @PostConstruct
    public void init() {
        // Seed initial dummy data if the database is empty
        if (invoiceRepository.count() == 0) {
            invoiceRepository.save(createInvoice("INV-2026-001", "John Doe", "2026-06-15", "Cardiac Ultrasound / Echocardiogram", "$420.00", "Paid"));
            invoiceRepository.save(createInvoice("INV-2026-002", "Alice Smith", "2026-06-14", "Acute Bronchitis Clinic Visit", "$150.00", "Paid"));
            invoiceRepository.save(createInvoice("INV-2026-003", "Robert Downey", "2026-06-12", "Comprehensive Metabolic Panel", "$280.00", "Pending"));
            invoiceRepository.save(createInvoice("INV-2026-004", "Emma Watson", "2026-06-08", "Right Knee ACL MRI Diagnostic Scan", "$850.00", "Overdue"));
            invoiceRepository.save(createInvoice("INV-2026-005", "David Miller", "2026-06-05", "Endocrinology Consultation", "$120.00", "Paid"));
            invoiceRepository.save(createInvoice("INV-2026-006", "Bruce Wayne", "2026-05-24", "Cervical Spine CT radiology study", "$600.00", "Pending"));
            invoiceRepository.save(createInvoice("INV-2026-007", "Tony Stark", "2026-04-28", "Thoracic Surgical Calibration consultation", "$950.00", "Paid"));
        }
    }

    private Invoice createInvoice(String id, String name, String date, String service, String amount, String status) {
        Invoice invoice = new Invoice();
        invoice.setId(id);
        invoice.setPatientName(name);
        invoice.setDate(date);
        invoice.setService(service);
        invoice.setAmount(amount);
        invoice.setStatus(status);
        return invoice;
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        List<Invoice> invoices = invoiceRepository.findAll();
        // Sort descending by id to get latest first
        invoices.sort((a, b) -> b.getId().compareTo(a.getId()));
        return ResponseEntity.ok(invoices);
    }

    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        if (invoice.getId() == null || invoice.getId().isEmpty()) {
            // Generate a unique ID if not provided
            long count = invoiceRepository.count();
            invoice.setId(String.format("INV-2026-%03d", count + 1));
        }
        Invoice saved = invoiceRepository.save(invoice);
        return ResponseEntity.ok(saved);
    }
}
