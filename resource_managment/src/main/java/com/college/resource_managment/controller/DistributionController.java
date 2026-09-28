package com.college.resource_managment.controller;

import com.college.resource_managment.entity.Distribution;
import com.college.resource_managment.service.DistributionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/distributions")
@CrossOrigin
public class DistributionController {

    private final DistributionService distributionService;

    public DistributionController(DistributionService distributionService) {
        this.distributionService = distributionService;
    }

    // Create Distribution
    @PostMapping
    public Distribution createDistribution(
            @RequestBody Distribution distribution) {

        return distributionService.createDistribution(distribution);
    }

    // Get All Distributions
    @GetMapping
    public List<Distribution> getAllDistributions() {
        return distributionService.getAllDistributions();
    }

    // Get Distribution By ID
    @GetMapping("/{id}")
    public Optional<Distribution> getDistributionById(
            @PathVariable Long id) {

        return distributionService.getDistributionById(id);
    }
}