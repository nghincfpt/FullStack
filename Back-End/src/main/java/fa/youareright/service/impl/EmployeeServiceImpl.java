package fa.youareright.service.impl;

import fa.youareright.dto.UpdateEmpDTO;
import fa.youareright.model.Employee;
import fa.youareright.repository.EmployeeRepository;
import fa.youareright.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public Page<Employee> listAllEmpl(String condition, Pageable pageable) {
        return employeeRepository.listAllEmp(condition, condition, pageable);
    }

//    @Override
//    public Page<Employee> listAllEmpl(Pageable pageable) {
//        return employeeRepository.listAllEmp(pageable);
//    }

    @Override
    public void save(Employee employee) {
        employeeRepository.save(employee);
    }

    @Override
    public String getLastEmpId() {
        return employeeRepository.getLastEmpId();
    }

    @Override
    public String getNextId(String inputId) {
        String prefix = inputId.substring(0, 3); // Extract the prefix "ACC"
        int number = Integer.parseInt(inputId.substring(3)); // Extract the number part as an integer
        int nextNumber = number + 1; // Increment the number by 1

        // Format the nextNumber to have leading zeros
        String formattedNumber = String.format("%03d", nextNumber);

        return prefix + formattedNumber; // Concatenate the prefix and formatted number
    }

    @Override
    public void updateEmp(UpdateEmpDTO employee) {
        employeeRepository.updateEmp(employee.getType(), employee.getBranchId(), employee.getEmployeeId());
    }

    @Override
    public void deleteEmpId(String employeeId) {
        employeeRepository.deleteEmpId(employeeId);
    }

    @Override
    public Optional<Employee> findById(String employeeId) {
        return employeeRepository.findById(employeeId);
    }

}
