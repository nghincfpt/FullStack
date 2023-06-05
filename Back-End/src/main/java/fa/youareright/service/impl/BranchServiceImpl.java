package fa.youareright.service.impl;

import fa.youareright.model.Branch;
import fa.youareright.repository.BranchRepository;
import fa.youareright.service.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BranchServiceImpl implements BranchService {

    @Autowired
    BranchRepository branchRepository;

    @Override
    public Page<Branch> listAll(String condition, Pageable pageable) {
        return branchRepository.findAllByService(condition, condition, pageable);
    }

    @Override
    public void save(Branch branch) {
        branchRepository.save(branch);
    }

    @Override
    public Optional<Branch> findById(String branchId) {
        return branchRepository.findById(branchId);
    }

    @Override
    public void delete(String branchId) {
        branchRepository.updateIsDelete(branchId);
    }

    @Override
    public List<Branch> findList() {
        return branchRepository.findAll();
    }

    @Override
    public Branch get(String branchId) {
        return branchRepository.findById(branchId).orElse(new Branch());
    }


    @Override
    public Branch findByBranchId(String branchId) {
        return branchRepository.findByBranchId(branchId).get();
    }
}



