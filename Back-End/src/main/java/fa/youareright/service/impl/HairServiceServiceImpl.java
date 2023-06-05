package fa.youareright.service.impl;

import fa.youareright.model.HairService;
import fa.youareright.repository.HairServiceRepository;
import fa.youareright.service.HairServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

import java.util.List;


@Service
public class HairServiceServiceImpl implements HairServiceService {
    @Autowired
    HairServiceRepository hairServiceRepository;

    /**
     * @param pageable, condition
     * @return findAllByService()
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */

    public Page<HairService> listAll(String condition, Pageable pageable) {
        return hairServiceRepository.findAllByService(condition, condition, pageable);
    }

    /**
     * @param hairService
     * @return save()
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */

    @Override
    public void save(HairService hairService) {
        hairServiceRepository.save(hairService);
    }

    /**
     * @param serviceId
     * @return findById()
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */

    @Override
    public Optional<HairService> findById(String serviceId) {
        return hairServiceRepository.findById(serviceId);
    }

    /**
     * @param serviceId
     * @return delete()
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */

    @Override
    public void delete(String serviceId) {
        hairServiceRepository.delete(serviceId);
    }

    public List<HairService> findList() {
        return hairServiceRepository.findAll();
    }

    @Override
    public HairService get(String serviceId) {
        return hairServiceRepository.findById(serviceId).orElse(new HairService());
    }


}
