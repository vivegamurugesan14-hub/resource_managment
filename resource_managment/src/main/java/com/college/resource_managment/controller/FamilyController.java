package com.college.resource_managment.controller;

import com.college.resource_managment.entity.Family;
import com.college.resource_managment.service.FamilyService;

import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/families")
@CrossOrigin
public class FamilyController {

    private final FamilyService familyService;

    public FamilyController(FamilyService familyService) {
        this.familyService = familyService;
    }

    // Create Family
   @PostMapping
public ResponseEntity<?> createFamily(@RequestBody Family family) {

    try {

        return ResponseEntity.ok(
                familyService.createFamily(family)
        );

    } catch (RuntimeException e) {

        return ResponseEntity
                .badRequest()
                .body(e.getMessage());
    }
}
    

    // Get All Families
    @GetMapping
    public List<Family> getAllFamilies() {
        return familyService.getAllFamilies();
    }

    // Get Family By ID
    @GetMapping("/{id}")
    public Optional<Family> getFamilyById(@PathVariable Long id) {
        return familyService.getFamilyById(id);
    }

    // Update Family
    @PutMapping("/{id}")
    public Family updateFamily(
            @PathVariable Long id,
            @RequestBody Family family) {

        return familyService.updateFamily(id, family);
    }

    // Delete Family
    @DeleteMapping("/{id}")
    public String deleteFamily(@PathVariable Long id) {

        familyService.deleteFamily(id);

        return "Family deleted successfully";
    }
}