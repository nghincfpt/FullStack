package fa.youareright.controller.employee;

import fa.youareright.dto.EmployeeInfo;
import fa.youareright.dto.RegisterInfo;
import fa.youareright.dto.UpdateEmpDTO;
import fa.youareright.dto.UserAccountDTO;
import fa.youareright.model.*;
import fa.youareright.repository.EmployeeRepository;
import fa.youareright.repository.UserRepository;
import fa.youareright.service.AccountService;
import fa.youareright.service.BranchService;
import fa.youareright.service.EmployeeService;
import fa.youareright.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin("http://localhost:3000")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private UserService userService;
    @Autowired
    private BranchService branchService;
@Autowired
private UserRepository userRepository;
    /**
     * Save employee.
     *
     * Create date : Jun 1, 2023 1:19:19 PM
     * Author : Create by MyVTH2
     * BirthDay : 2000_03_02
     *
     * @param employeeInfo the employee info
     * @return the response entity
     */
    @PostMapping("/add")
    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<String> saveEmployee(@RequestBody EmployeeInfo employeeInfo) {
        String lastEmpId = employeeService.getLastEmpId();
        String id = employeeService.getNextId(lastEmpId);
        employeeService.save(new Employee(id, employeeInfo));
        User user = userService.findByUserId(employeeInfo.getUserId());
        user.setAvatar(employeeInfo.getAvatar());
        userService.save(user);
        return ResponseEntity.status(HttpStatus.OK).body("");
    }


    @GetMapping("/listAllEmp")
//    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<?> findAllByCondition(
            @RequestParam(value = "c", defaultValue = "",required = false) String condition,
            @RequestParam(name = "p", defaultValue = "0") Integer page) {
        return new ResponseEntity<>(userRepository.findAllEmp("%" +condition + "%" , "%" +condition + "%" , PageRequest.of(page, 5)), HttpStatus.OK);
    }

    @PostMapping("/registerEmp")
    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<?> register(@RequestBody RegisterInfo info) {
        // Check username, email is exist
        Map<String, String> errorResponse = new HashMap<>();
        if (accountService.isUsernameExist(info.getUsername())) {
            errorResponse.put("error", "Username is exist!");
            return ResponseEntity.badRequest().body(errorResponse);
        } else if (accountService.isEmailExist(info.getEmail())) {
            errorResponse.put("error", "Email is exist!");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Generate userId auto increment
        String lastUserId = userService.getLastUserId();
        String userId = null;
        if (lastUserId == null) {
            userId = "USE001";
        } else {
            userId = userService.getNextId(lastUserId);
        }

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String passEncode = passwordEncoder.encode(info.getPassword());

        UserAccountDTO userAcc = new UserAccountDTO(userId, null, info.getFullname(), info.getEmail(),
                info.getUsername(), passEncode, info.getPhoneNumber(), null, "Active", null, null, null);

        Account acc = new Account();
        User user = new User();

        BeanUtils.copyProperties(userAcc, acc);
        BeanUtils.copyProperties(userAcc, user);
        user.setAccount(acc);
        accountService.save(acc);

        // Add role for account ROLE_CUSTOMER
        acc.addRole(new Role(3));

        userService.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "Register successfully.");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/createEmp")
    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<?> createEmp(@RequestBody EmployeeInfo info) {

        //Generate employeeId auto increment
        String lastEmpId = employeeService.getLastEmpId();
        String empId = null;
        if (lastEmpId == null) {
            empId = "EMP001";
        } else {
            empId = employeeService.getNextId(lastEmpId);
        }

        EmployeeInfo employeeInfo = new EmployeeInfo(empId, info.getUserId(), info.getBranchId(), info.getType(), info.getAddress(), info.getDateOfBirth(), info.getGender(), info.getAvatar(), 0);
        Employee employee = new Employee();

        String address = info.getAddress();
        String gender = info.getGender();
        LocalDate dateOfBirth = info.getDateOfBirth();
        String avatar = info.getAvatar();
        User user = userService.findByUserId(info.getUserId());
        user.setAddress(address);
        user.setGender(gender);
        user.setDateOfBirth(dateOfBirth);
        user.setAvatar(avatar);
        Branch branch = branchService.findByBranchId(info.getBranchId());
        employee.setBranch(branch);


        BeanUtils.copyProperties(employeeInfo, employee);
        employee.setUser(user);

        //BeanUtils.copyProperties(employeeInfo, user);

        employeeService.save(employee);
        userService.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "Register successfully.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/edit")
    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<?> getEmployee(@RequestParam String employeeId) {
        Employee emp = employeeRepository.findByEmployeeId(employeeId).get();
        Map<String, Object> response = new HashMap<>();
        response.put("employeeId", emp.getEmployeeId());
        response.put("fullname", emp.getUser().getFullName());
        response.put("phoneNumber", emp.getUser().getPhoneNumber());
        response.put("avatar", emp.getUser().getAvatar());
        response.put("type", emp.getType());
        response.put("branchId", emp.getBranch().getBranchId());
        return ResponseEntity.ok(response);

    }

    @PostMapping("/edit")
    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<?> updateEmp(@RequestBody UpdateEmpDTO employee) {
        employeeService.updateEmp(employee);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "Update successfully.");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/listAllEmp/{employeeId}")
    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<Void> delete(@PathVariable String employeeId) {
        Optional<Employee> employee = employeeRepository.findById(employeeId);

        if(employee == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        employeeService.deleteEmpId(employeeId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/listAllEmp/{employeeId}")
    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<?> findById(@PathVariable String employeeId) {
        User user = userRepository.findEmpById(employeeId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     * Author MyVTH2
     * @param info
     * @return
     */
    @PostMapping("/createRec")
    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<?> createRec(@RequestBody EmployeeInfo info) {

        //Generate employeeId auto increment
        String lastEmpId = employeeService.getLastEmpId();
        String empId = null;
        if (lastEmpId == null) {
            empId = "EMP001";
        } else {
            empId = employeeService.getNextId(lastEmpId);
        }

        EmployeeInfo employeeInfo = new EmployeeInfo(empId, info.getUserId(), info.getBranchId(), "3", info.getAddress(), info.getDateOfBirth(), info.getGender(), info.getAvatar(), 0);
        Employee employee = new Employee();

        String address = info.getAddress();
        String gender = info.getGender();
        LocalDate dateOfBirth = info.getDateOfBirth();
        String avatar = info.getAvatar();
        User user = userService.findByUserId(info.getUserId());
        user.setAddress(address);
        user.setGender(gender);
        user.setDateOfBirth(dateOfBirth);
        user.setAvatar(avatar);
        Branch branch = branchService.findByBranchId(info.getBranchId());
        employee.setBranch(branch);


        BeanUtils.copyProperties(employeeInfo, employee);
        employee.setUser(user);

        //BeanUtils.copyProperties(employeeInfo, user);

        employeeService.save(employee);
        userService.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "Register successfully.");
        return ResponseEntity.ok(response);
    }

}
