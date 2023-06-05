package fa.youareright.repository;

import fa.youareright.model.HairService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface HairServiceRepository extends JpaRepository<HairService, String> {

    @Query(value = "select hs from HairService hs where (hs.name like concat('%',:name,'%') or hs.description like concat('%',:description,'%')) and hs.isDelete = 0 order by hs.serviceId desc")
    Page<HairService> findAllByService(@Param("name") String name,
                                       @Param("description") String description,
                                       Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = "update HairService hs set hs.isDelete = 1 " +
            "where hs.serviceId = :serviceId")
    void delete(@Param("serviceId") String serviceId);
}
