package com.college.resource_managment.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.college.resource_managment.entity.Camp;
import com.college.resource_managment.service.CampService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/camps")
@CrossOrigin
public class CampController {

    private final CampService campService;

    public CampController(CampService campService) {
        this.campService = campService;
    }

    // Create Camp
    @PostMapping
    public Camp createCamp(@RequestBody Camp camp) {
        return campService.createCamp(camp);
    }

    // Get All Camps
    @GetMapping
    public List<Camp> getAllCamps() {
        return campService.getAllCamps();
    }

    // Get Camp By ID
    @GetMapping("/{id}")
    public Optional<Camp> getCampById(@PathVariable Long id) {
        return campService.getCampById(id);
    }

    // Update Camp
    @PutMapping("/{id}")
    public Camp updateCamp(
            @PathVariable Long id,
            @RequestBody Camp camp) {

        return campService.updateCamp(id, camp);
    }

    // Delete Camp
    @DeleteMapping("/{id}")
    public String deleteCamp(@PathVariable Long id) {

        campService.deleteCamp(id);

        return "Camp deleted successfully";
    }
}