package com.college.resource_managment.controller;

import com.college.resource_managment.entity.Supply;
import com.college.resource_managment.service.SupplyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/supplies")
@CrossOrigin
public class SupplyController {

    private final SupplyService supplyService;

    public SupplyController(SupplyService supplyService) {
        this.supplyService = supplyService;
    }

    // Create Supply
    @PostMapping
    public Supply createSupply(@RequestBody Supply supply) {
        return supplyService.createSupply(supply);
    }

    // Get All Supplies
    @GetMapping
    public List<Supply> getAllSupplies() {
        return supplyService.getAllSupplies();
    }

    // Get Supply By ID
    @GetMapping("/{id}")
    public Optional<Supply> getSupplyById(@PathVariable Long id) {
        return supplyService.getSupplyById(id);
    }

    // Update Supply
    @PutMapping("/{id}")
    public Supply updateSupply(
            @PathVariable Long id,
            @RequestBody Supply supply) {

        return supplyService.updateSupply(id, supply);
    }

    // Delete Supply
    @DeleteMapping("/{id}")
    public String deleteSupply(@PathVariable Long id) {

        supplyService.deleteSupply(id);

        return "Supply deleted successfully";
    }
}