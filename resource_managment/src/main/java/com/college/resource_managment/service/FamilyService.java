package com.college.resource_managment.service;

import com.college.resource_managment.entity.Camp;
import com.college.resource_managment.entity.Family;
import com.college.resource_managment.repository.CampRepository;
import com.college.resource_managment.repository.FamilyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FamilyService {

    private final FamilyRepository familyRepository;
    private final CampRepository campRepository;

    public FamilyService(
            FamilyRepository familyRepository,
            CampRepository campRepository) {

        this.familyRepository = familyRepository;
        this.campRepository = campRepository;
    }

    // Create Family
    public Family createFamily(Family family) {

        Camp camp = campRepository.findById(family.getCampId())
                .orElseThrow(() -> new RuntimeException("Camp not found"));

        int currentPeople = familyRepository.findAll()
                .stream()
                .filter(f -> f.getCampId().equals(family.getCampId()))
                .mapToInt(Family::getHeadcount)
                .sum();

        if (currentPeople + family.getHeadcount() > camp.getCapacity()) {
            throw new RuntimeException("Camp capacity exceeded");
        }

        return familyRepository.save(family);
    }

    // Get All Families
    public List<Family> getAllFamilies() {
        return familyRepository.findAll();
    }

    // Get Family By ID
    public Optional<Family> getFamilyById(Long id) {
        return familyRepository.findById(id);
    }

    // Update Family
    public Family updateFamily(Long id, Family family) {

        Family existingFamily = familyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Family not found"));

        existingFamily.setFamilyName(family.getFamilyName());
        existingFamily.setHeadcount(family.getHeadcount());
        existingFamily.setCampId(family.getCampId());

        return familyRepository.save(existingFamily);
    }

    // Delete Family
    public void deleteFamily(Long id) {
        familyRepository.deleteById(id);
    }
}
