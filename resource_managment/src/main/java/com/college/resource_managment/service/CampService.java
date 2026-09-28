package com.college.resource_managment.service;

import com.college.resource_managment.entity.Camp;
import com.college.resource_managment.repository.CampRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CampService {

    private final CampRepository campRepository;

    public CampService(CampRepository campRepository) {
        this.campRepository = campRepository;
    }

    // Create Camp
    public Camp createCamp(Camp camp) {
        return campRepository.save(camp);
    }

    // Get All Camps
    public List<Camp> getAllCamps() {
        return campRepository.findAll();
    }

    // Get Camp By ID
    public Optional<Camp> getCampById(Long id) {
        return campRepository.findById(id);
    }

    // Update Camp
    public Camp updateCamp(Long id, Camp camp) {

        Camp existingCamp = campRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Camp not found"));

        existingCamp.setCampName(camp.getCampName());
        existingCamp.setLocation(camp.getLocation());
        existingCamp.setCapacity(camp.getCapacity());

        return campRepository.save(existingCamp);
    }

    // Delete Camp
    public void deleteCamp(Long id) {
        campRepository.deleteById(id);
    }
}