package fa.youareright.controller;

import fa.youareright.dto.HairServiceDto;
import fa.youareright.model.*;
import fa.youareright.repository.HairServiceRepository;
import fa.youareright.repository.MediaRepository;
import fa.youareright.service.HairServiceService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.beans.FeatureDescriptor;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;


@RestController
@RequestMapping("/api/hairService")
@CrossOrigin("*")
public class HairServiceController {

    @Autowired
    HairServiceService hairServiceService;

    @Autowired
    MediaRepository mediaRepository;

    /**
     * @param page, condition
     * @return listAll()
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */

    @GetMapping("")

    @RolesAllowed({"ROLE_ADMIN"})

    public ResponseEntity<Page<HairService>> findAllByCondition(
            @RequestParam(value = "c", defaultValue = "") String condition,
            @RequestParam(name = "p", defaultValue = "0") Integer page) {
        return new ResponseEntity<>(hairServiceService.listAll(condition, PageRequest.of(page, 5)), HttpStatus.OK);
    }

    /**
     * @param hairServiceDto, bindingResult
     * @return if success status 2xx else if error status 4xx
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */

    @PostMapping("")
    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<?> create(@RequestBody @Valid HairServiceDto hairServiceDto,
                                    BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.NOT_ACCEPTABLE);
        }

        HairService hairService = new HairService();
        BeanUtils.copyProperties(hairServiceDto, hairService);
        this.hairServiceService.save(hairService);

        for (String url : hairServiceDto.getMedia()) {
            Media media = new Media();
            BeanUtils.copyProperties(hairServiceDto, media, "media");
            media.setUrl(url);
            media.setHairService(hairService);
            mediaRepository.save(media);
        }

        return new ResponseEntity<>(hairServiceDto, HttpStatus.OK);
    }

    /**
     * @param serviceId
     * @return if success status 2xx else if error status 4xx
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */

    @GetMapping("/{serviceId}")
    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<HairService> findById(@PathVariable String serviceId) {
        Optional<HairService> hairService = hairServiceService.findById(serviceId);

        if (!hairServiceService.findById(serviceId).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(hairService.orElse(null), HttpStatus.OK);
    }


    /**
     * @param serviceId, hairServiceDto
     * @return if success status 2xx else if error status 4xx
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */


    @PatchMapping("/{serviceId}")
    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<?> update(@PathVariable("serviceId") String serviceId,
                                    @RequestBody @Valid HairServiceDto hairServiceDto,
                                    BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.NOT_ACCEPTABLE);
        }

        Optional<HairService> hairService = hairServiceService.findById(serviceId);
        HairService hairServices = hairService.orElse(null);
        if (hairServices == null) {
            return new ResponseEntity<>("HairService not found", HttpStatus.NOT_FOUND);
        }
        BeanUtils.copyProperties(hairServiceDto, hairServices, getNullPropertyNames(hairServiceDto));

        this.hairServiceService.save(hairServices);

        List<Media> existingMedia = mediaRepository.findByHairService(hairServices);
        List<Media> updatedMedia = new ArrayList<>();

        for (String url : hairServiceDto.getMedia()) {
            Media media = new Media();
            BeanUtils.copyProperties(hairServiceDto, media, "media");
            media.setUrl(url);
            media.setHairService(hairServices);
            mediaRepository.save(media);
        }


        return new ResponseEntity<>(hairService.get(), HttpStatus.OK);

//        mediaRepository.saveAll(updatedMedia);
//        return new ResponseEntity<>(HttpStatus.OK);

    }
    private String[] getNullPropertyNames(Object source) {
        final BeanWrapper wrappedSource = new BeanWrapperImpl(source);
        return Stream.of(wrappedSource.getPropertyDescriptors())
                .map(FeatureDescriptor::getName)
                .filter(propertyName -> wrappedSource.getPropertyValue(propertyName) == null)
                .toArray(String[]::new);
    }


    /**
     * @param serviceId
     * @return if success status 2xx else if error status 4xx
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */


    @DeleteMapping("/{serviceId}")
    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<Void> delete(@PathVariable String serviceId) {
        Optional<HairService> hairService = hairServiceService.findById(serviceId);

        if (!hairService.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    
        
        hairServiceService.delete(serviceId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getListService() {
        return new ResponseEntity<>(hairServiceService.findList(), HttpStatus.OK);
    }
}
