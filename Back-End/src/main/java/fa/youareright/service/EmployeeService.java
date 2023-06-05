package fa.youareright.service;

import fa.youareright.dto.UpdateEmpDTO;
import fa.youareright.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface EmployeeService {
    //Page<Employee> listAllEmplCondition(String condition, Pageable pageable);
    Page<Employee> listAllEmpl(String condition, Pageable pageable);
    void save(Employee employee);
//    void createEmployee(String employeeId, )

    String getLastEmpId();

    String getNextId(String inputId);

    void updateEmp(UpdateEmpDTO employee);
    void deleteEmpId(String employeeId);
    Optional<Employee> findById(String employeeId);

}
