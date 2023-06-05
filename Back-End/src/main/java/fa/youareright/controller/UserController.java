package fa.youareright.controller;

import fa.youareright.dto.AccountDto;
import fa.youareright.dto.UserDto;
import fa.youareright.model.Account;
import fa.youareright.model.HairService;
import fa.youareright.model.User;
import fa.youareright.repository.UserRepository;
import fa.youareright.service.AccountService;
import fa.youareright.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AccountService accountService;

    /**
     * @param page, condition
     * @return listAll()
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */

    @GetMapping("")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_RECEPTIONIST"})
    public ResponseEntity<Page<User>> findAllByCondition(
            @RequestParam(value = "c", defaultValue = "") String condition,
            @RequestParam(name = "p", defaultValue = "0") Integer page) {
        return new ResponseEntity<>(userService.listAll(condition, PageRequest.of(page, 5)), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<List<FieldError>> create(@RequestBody @Valid UserDto userDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.NOT_ACCEPTABLE);
        }

        AccountDto accountDto;
        accountDto = userDto.getAccountDto();
        Account account = new Account();
        BeanUtils.copyProperties(accountDto, account);

        accountService.save(account);

        User user = new User();
        BeanUtils.copyProperties(userDto, user);

        userService.save(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/updateInfo")
    public ResponseEntity<?> updateInfo() {

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


//    @GetMapping("findAll")
//    public ResponseEntity<Page<User>> findAll( ) {
//        Page<User> users = userService.findAll(Pageable.unpaged(),"");
//        if (users.isEmpty()) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        return new ResponseEntity<>(users, HttpStatus.OK);
//    }

    /**
     * @param userId
     * @return if success status 2xx else if error status 4xx
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */
    @PutMapping("/{userId}")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_RECEPTIONIST", "ROLE_CUSTOMER"})
    public ResponseEntity<User> updateStatus(@PathVariable String userId) {
        User user = userService.findByUserId(userId);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(HttpStatus.OK);
    }




    @GetMapping("findAll")
    public ResponseEntity<List<User>> findAll() {
        List<User> listEmp = userRepository.findAllEmp();
        if (listEmp.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(listEmp, HttpStatus.OK);
    }


    @GetMapping("findAllRec")
    public ResponseEntity<List<User>> findAllRec( ) {
        List<User> listEmp = userRepository.findAllRec();
        if (listEmp.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(listEmp, HttpStatus.OK);
    }

    @GetMapping("/detail/{idUser}")
    @RolesAllowed({"ROLE_CUSTOMER","ROLE_ADMIN","ROLE_RECEPTIONIST"})
    public ResponseEntity<User> getUserById(@PathVariable String idUser) {
        Optional<User> user = userRepository.findById(idUser);

        return new ResponseEntity( user, HttpStatus.OK);
    }


}
