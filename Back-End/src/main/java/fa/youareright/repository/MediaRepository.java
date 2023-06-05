package fa.youareright.repository;

import fa.youareright.model.HairService;
import fa.youareright.model.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface MediaRepository  extends JpaRepository<Media, Integer> {
    List<Media> findByBranch_BranchId(String id);

    @Modifying
    @Query(value = "DELETE FROM Media m WHERE m.branch.branchId = :branchId")
    void deleteByBranchId(@Param("branchId") String branchId);

    List<Media> findByHairService(HairService hairService);
}
