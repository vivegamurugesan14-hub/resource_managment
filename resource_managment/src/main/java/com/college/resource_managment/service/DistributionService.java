package com.college.resource_managment.service;

import com.college.resource_managment.entity.Distribution;
import com.college.resource_managment.entity.Supply;
import com.college.resource_managment.repository.DistributionRepository;
import com.college.resource_managment.repository.SupplyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DistributionService {

    private final DistributionRepository distributionRepository;
    private final SupplyRepository supplyRepository;

    public DistributionService(
            DistributionRepository distributionRepository,
            SupplyRepository supplyRepository) {

        this.distributionRepository = distributionRepository;
        this.supplyRepository = supplyRepository;
    }

    // Create Distribution
    public Distribution createDistribution(Distribution distribution) {

        Supply supply = supplyRepository.findById(distribution.getSupplyId())
                .orElseThrow(() -> new RuntimeException("Supply not found"));

        if (distribution.getQuantity() > supply.getQuantity()) {
            throw new RuntimeException("Not enough supply available");
        }

        int remainingQuantity =
                supply.getQuantity() - distribution.getQuantity();

        supply.setQuantity(remainingQuantity);

        supplyRepository.save(supply);

        return distributionRepository.save(distribution);
    }

    // Get All Distributions
    public List<Distribution> getAllDistributions() {
        return distributionRepository.findAll();
    }

    // Get Distribution By ID
    public Optional<Distribution> getDistributionById(Long id) {
        return distributionRepository.findById(id);
    }
}