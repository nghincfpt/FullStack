package fa.youareright.repository;

import fa.youareright.model.Branch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import java.util.Optional;




public interface BranchRepository extends JpaRepository<Branch, String> {


    @Query(value = "select * from branch where (name like concat('%',:name,'%') or address like concat('%',:address,'%')) AND is_delete = 0",
            nativeQuery = true)
    Page<Branch> findAllByService(@Param("name") String name,
                                  @Param("address") String address,
                                  Pageable pageable);
    @Modifying
    @Query(value = "UPDATE branch SET is_delete = 1 WHERE branch_id = :branchId", nativeQuery = true)
    @Transactional
    void updateIsDelete(@Param("branchId") String branchId);

    List<Branch> findByIsDelete(Integer isDelete);


    @Query(value = "select * from branch where branch.branch_id = :branchId", nativeQuery = true)
    Optional<Branch> findByBranchId(@Param("branchId") String branchId);

    
    
    @Query(value = "select * from  branch",nativeQuery =true)
    List<Branch> findAllBranch();
    
    
}
