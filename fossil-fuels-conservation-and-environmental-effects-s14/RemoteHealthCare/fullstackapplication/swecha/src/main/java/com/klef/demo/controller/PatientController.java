package com.klef.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.demo.entity.Patient;
import com.klef.demo.service.PatientService;

import java.util.List;

@RestController
@RequestMapping("/api/patientapi")
@CrossOrigin("*")
public class PatientController 
{
	@Autowired
	private PatientService patientService;
	
	@GetMapping("/")
	public String patienthome() 
	{
		return "Patient Controller Demo";
	}
	
	@PostMapping("/registration")
	public ResponseEntity<String> patientregistration(@RequestBody Patient p) 
	{
		try
		{
			String output = patientService.patientRegistration(p);
			return ResponseEntity.status(201).body(output);
		}
		catch (Exception e) 
		{
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> verifypatientlogin(@RequestBody Patient patient)
	{
		try 
		{
			Patient p = patientService.verifyPatientLogin(patient.getEmail(), patient.getPassword());
			
			if(p != null)
			{
				return ResponseEntity.ok().body(p);
			}
			else
			{
				return ResponseEntity.status(401).body("Login Invalid");
			}
		}
		catch (Exception e) 
		{
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}

	@GetMapping("/getprofile/{id}")
	public ResponseEntity<?> getPatientProfile(@PathVariable Long id)
	{
		try
		{
			Patient patient = patientService.getPatientById(id);
			
			if(patient != null)
			{
				return ResponseEntity.ok().body(patient);
			}
			else
			{
				return ResponseEntity.status(404).body("Patient Not Found");
			}
		}
		catch (Exception e)
		{
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}
	
	@PostMapping("/updateprofile")
	public ResponseEntity<String> patientupdateprofile(@RequestBody Patient p)
	{
		try
		{
			String output = patientService.updatePatientProfile(p);
			return ResponseEntity.ok().body(output);
		}
		catch(Exception e)
		{
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}
	
	@GetMapping("/viewall")
	public ResponseEntity<?> viewAllPatients()
	{
		try
		{
			List<Patient> patients = patientService.viewAllPatients();
			return ResponseEntity.ok().body(patients);
		}
		catch (Exception e)
		{
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deletePatient(@PathVariable Long id)
	{
		try
		{
			String output = patientService.deletePatient(id);
			return ResponseEntity.ok().body(output);
		}
		catch(Exception e)
		{
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}
}
