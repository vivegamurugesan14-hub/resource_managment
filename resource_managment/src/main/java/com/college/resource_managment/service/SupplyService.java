package com.college.resource_managment.service;

import com.college.resource_managment.entity.Supply;
import com.college.resource_managment.repository.SupplyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplyService {

    private final SupplyRepository supplyRepository;

    public SupplyService(SupplyRepository supplyRepository) {
        this.supplyRepository = supplyRepository;
    }

    // Create Supply
    public Supply createSupply(Supply supply) {
        return supplyRepository.save(supply);
    }

    // Get All Supplies
    public List<Supply> getAllSupplies() {
        return supplyRepository.findAll();
    }

    // Get Supply By ID
    public Optional<Supply> getSupplyById(Long id) {
        return supplyRepository.findById(id);
    }

    // Update Supply
    public Supply updateSupply(Long id, Supply supply) {

        Supply existingSupply = supplyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supply not found"));

        existingSupply.setItemName(supply.getItemName());
        existingSupply.setQuantity(supply.getQuantity());

        return supplyRepository.save(existingSupply);
    }

    // Delete Supply
    public void deleteSupply(Long id) {
        supplyRepository.deleteById(id);
    }
}