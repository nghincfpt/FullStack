package fa.youareright.repository;

import fa.youareright.model.Employee;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {

//	@Query(value = "select e from Employee e")
//	List<Employee> listAll();
//	@Query(value = "select * from employee " +
//			"inner join user on employee.user_id = user.user_id " +
//			"inner join branch on employee.branch_id = branch.branch_id " +
//			"where (user.full_name like concat('%','abc','%') or branch.name like concat('%','002','%'))", nativeQuery = true)
//	List<Employee> listAll();

//	@Query(value = "select e.*\n" +
////			"from employee e\n" +
////			"inner join user u on u.user_id = e.user_id\n" +
////			"inner join account acc on acc.account_id = u.account_id\n" +
////			"inner join account_role accr on acc.account_id = accr.account_id\n" +
////			"inner join branch b on e.branch_id = b.branch_id\n" +
////			"where (accr.role_id = 3 and e.is_delete = 0) and \n" +
////			"(((u.full_name like concat('%',:fullName,'%')) or (b.name like concat('%', :name,'%')))); ", nativeQuery = true)
@Query(value = "select * from employee " +
		"inner join user on employee.user_id = user.user_id " +
		"inner join branch on employee.branch_id = branch.branch_id " +
		"where (employee.is_delete = 0 and (user.full_name like concat('%',:fullName,'%')  or branch.name like concat('%',:name,'%'))) ", nativeQuery = true)
	Page<Employee> listAllEmp(@Param("fullName") String fullName,
							  @Param("name") String name,
							  Pageable pageable);

	@Query(value = "select emp_id from employee order by emp_id desc limit 1", nativeQuery = true)
	public String getLastEmpId();

	@Query(value = "select e from Employee e")
	List<Employee> listAll();

	@Query(value = "select e from Employee e where e.employeeId = :employeeId")
	Optional<Employee>findByEmployeeId(@Param("employeeId")String employeeId);

	@Modifying
	@Transactional
	@Query(value = "update Employee e set e.type = :type, e.branch.branchId = :branchId where e.employeeId = :employeeId")
	void updateEmp(@Param("type") String type, @Param("branchId")String branchId, @Param("employeeId") String employeeId);

	@Modifying
	@Transactional
	@Query( value = "update Employee e set e.isDelete = 1 where e.employeeId = :employeeId")
	void deleteEmpId(@Param("employeeId") String employeeId);

}
