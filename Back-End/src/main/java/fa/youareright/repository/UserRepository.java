package fa.youareright.repository;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;




import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.transaction.annotation.Transactional;

import fa.youareright.model.User;

public interface UserRepository extends JpaRepository<User, String> {

    @Query(value = "select user_id from user order by user_id desc limit 1;", nativeQuery = true)
    public String getLastUserId();

    @Query(value = "select u from User u where u.account.accountId = :accountId")
    Optional<User> findByAccountId(@Param("accountId") Integer accountId);

    @Modifying
    @Transactional
    @Query(value = "update User u\r\n" + "set u.address = :address, u.avatar = :avatar, "
            + "u.dateOfBirth = :dateOfBirth, u.fullName = :fullName, " + "u.phoneNumber = :phoneNumber\r\n"
            + "where u.userId = :userId")
    void updateUser(@Param("address") String address, @Param("avatar") String avatar,
                    @Param("dateOfBirth") LocalDate dateOfBirth, @Param("fullName") String fullName,
                    @Param("phoneNumber") String phoneNumber, @Param("userId") String userId);

    @Query(value = "select u from User u where (u.fullName like concat('%',:fullName,'%') or u.address like concat('%',:address,'%')) and u.status = '1'")
    Page<User> findAllByUser(@Param("fullName") String fullName,
                             @Param("address") String address,
                             Pageable pageable);


    @Query(value = "select u from User u where u.employee.branch.branchId like :branch and u.employee.isDelete = 0  ")
    List<User> getListEmployee(@Param("branch") String branch);

//	@Query(value = "select u from User u where u.account.roles[ro].roleId = 3")
//	List<User> findEmp();

//	@Query(value = "select u from User u where u.employee.branch.branchId like :branch and u.employee.isDelete = 0  ")
//	List<User> getListEmployee(@Param("branch") String branch);


    @Query(value = "select * from user where user.user_id = :userId", nativeQuery = true)
    Optional<User> findByUserId(@Param("userId") String userId);

    @Query(value = "select user.user_id from employee " +
            "inner join user on user.user_id = employee.user_id where employee.emp_id = :employeeId	", nativeQuery = true)
    Optional<User> findByEmpId(@Param("employeeId") String employeeId);


    @Modifying
    @Transactional
    @Query(value = "update User u set u.status = '0' " +
            "where u.userId = :userId")
    void updateStatus(@Param("userId") String userId);




    @Query(value ="select count(full_name) as totalUser from user",nativeQuery = true)
    List<UserTotal> getCountUser();

    

	@Query( value = "SELECT u.*\n" +
			"FROM user u \n" +
			"INNER JOIN account acc ON acc.account_id = u.account_id\n" +
			"INNER JOIN account_role accr ON acc.account_id = accr.account_id\n" +
			"WHERE accr.role_id = 3\n" +
			"  AND NOT EXISTS (SELECT 1 FROM employee e2 WHERE e2.user_id = u.user_id);", nativeQuery = true)
	List<User> findAllEmp();


	@Query( value = "SELECT u.*\n" +
			"FROM user u \n" +
			"INNER JOIN account acc ON acc.account_id = u.account_id\n" +
			"INNER JOIN account_role accr ON acc.account_id = accr.account_id\n" +
			"WHERE accr.role_id = 2\n" +
			"  AND NOT EXISTS (SELECT 1 FROM employee e2 WHERE e2.user_id = u.user_id);;", nativeQuery = true)
	List<User> findAllRec();

	@Query(value = "select u from User u where u.employee.isDelete = 0  and " +
			"(u.employee.type = '1' or u.employee.type = '2' or u.employee.type = '3' ) and " +
			"(u.fullName like :fullName or u.employee.branch.name like :branchName)" )
	Page<User> findAllEmp (@Param("fullName") String fullName, @Param("branchName") String branchName, Pageable pageable);

	@Query(value =" select u from User u where u.employee.employeeId = :empId")
	User findEmpById(@Param("empId") String id);

}
