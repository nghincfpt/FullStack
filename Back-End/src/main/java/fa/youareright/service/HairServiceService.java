package fa.youareright.service;

import fa.youareright.model.HairService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

import java.util.List;

public interface HairServiceService {

    /**
     * @param condition, pageable
     * @return listAll()
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */

    Page<HairService> listAll(String condition, Pageable pageable);

    /**
     * @param hairService
     * @return save()
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */

    void save(HairService hairService);

    /**
     * @param serviceId
     * @return findById()
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */

    Optional<HairService> findById(String serviceId);

    /**
     * @param serviceId
     * @return delete()
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */

    void delete(String serviceId);

    List<HairService> findList();

    HairService get(String serviceId);
}
