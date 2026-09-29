package com.college.resource_managment.controller;

import com.college.resource_managment.entity.Distribution;
import com.college.resource_managment.service.DistributionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/distributions")
@CrossOrigin
public class DistributionController {

    private final DistributionService distributionService;


    public DistributionController(
            DistributionService distributionService) {

        this.distributionService =
                distributionService;
    }


    @PostMapping
    public ResponseEntity<?> createDistribution(
            @RequestBody Distribution distribution) {

        try {

            return ResponseEntity.ok(
                    distributionService
                            .createDistribution(distribution)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }


    @GetMapping
    public List<Distribution> getAllDistributions() {

        return distributionService
                .getAllDistributions();

    }


    @GetMapping("/{id}")
    public Optional<Distribution> getDistributionById(
            @PathVariable Long id) {

        return distributionService
                .getDistributionById(id);

    }

}