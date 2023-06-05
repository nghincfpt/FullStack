package fa.youareright.controller.branch;

import fa.youareright.dto.BranchMediaDTO;
import fa.youareright.model.Branch;
import fa.youareright.model.Media;
import fa.youareright.repository.BookingDetailRepository;
import fa.youareright.repository.MediaRepository;
import fa.youareright.service.BranchService;
import fa.youareright.service.MediaService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin/branch")
public class BranchRestController {
    @Autowired
    BranchService branchService;

    @Autowired
    MediaRepository mediaRepository;

    @Autowired
    MediaService mediaService;

    @Autowired
    BookingDetailRepository bookingDetailRepository;

    @GetMapping("")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_RECEPTIONIST"})
    public ResponseEntity<Page<Branch>> findAllByCondition(
            @RequestParam(value = "c", defaultValue = "") String condition,
            @RequestParam(name = "p", defaultValue = "0") Integer page) {
        return new ResponseEntity<>(branchService.listAll(condition, PageRequest.of(page, 5)), HttpStatus.OK);
    }

    @PostMapping("")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_RECEPTIONIST"})
    public ResponseEntity<?> create(@RequestBody @Valid BranchMediaDTO branchMediaDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.NOT_ACCEPTABLE);
        }

        Branch branch = new Branch();
        BeanUtils.copyProperties(branchMediaDTO, branch);
        this.branchService.save(branch);

        for (String url : branchMediaDTO.getMedia()) {
            Media media = new Media();
            BeanUtils.copyProperties(branchMediaDTO, media, "media");
            media.setUrl(url);
            media.setBranch(branch);
            mediaRepository.save(media);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{branchId}")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_RECEPTIONIST"})
    public ResponseEntity<Branch> update(@PathVariable String branchId,
                                              @Valid @RequestBody BranchMediaDTO branchMediaDTO,
                                              BindingResult bindingResult) {
        Optional<Branch> currentBranch = branchService.findById(branchId);

        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }

        if (!currentBranch.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        currentBranch.get().setBranchId(branchMediaDTO.getBranchId());
        currentBranch.get().setName(branchMediaDTO.getName());
        currentBranch.get().setAddress(branchMediaDTO.getAddress());
        mediaService.delete(branchId);

        for (String url : branchMediaDTO.getMedia()) {
            Media media = new Media();
            media.setUrl(url);
            media.setBranch(currentBranch.get());
            mediaRepository.save(media);
        }

        branchService.save(currentBranch.get());

        return new ResponseEntity<>(currentBranch.get(), HttpStatus.OK);
    }

    @GetMapping("/{branchId}")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_RECEPTIONIST", "ROLE_CUSTOMER", "ROLE_EMPLOYEE"})
    public ResponseEntity<Branch> findById(@PathVariable String branchId) {
        Optional<Branch> branch = branchService.findById(branchId);

        if (!branchService.findById(branchId).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(branch.orElse(null), HttpStatus.OK);
    }

    @DeleteMapping("/{branchId}")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_RECEPTIONIST"})
    public ResponseEntity<Branch> delete(@PathVariable String branchId) {
        Optional<Branch> branch = branchService.findById(branchId);

        if (!branch.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        branchService.delete(branchId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getListBranch() {
        return new ResponseEntity<>(branchService.findList(), HttpStatus.OK);
    }

}
