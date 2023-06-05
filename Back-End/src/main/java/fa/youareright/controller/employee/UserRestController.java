package fa.youareright.controller.employee;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import fa.youareright.config.security.JwtTokenUtil;
import fa.youareright.dto.AuthRequest;
import fa.youareright.dto.AuthResponse;
import fa.youareright.dto.ChangePassword;
import fa.youareright.dto.ConfirmOtp;
import fa.youareright.dto.ForgotChangePassword;
import fa.youareright.dto.MailInfoDTO;
import fa.youareright.dto.OTP;
import fa.youareright.dto.RegisterInfo;
import fa.youareright.dto.UpdateInfoDTO;
import fa.youareright.dto.UserAccountDTO;
import fa.youareright.model.Account;
import fa.youareright.model.Role;
import fa.youareright.model.User;
import fa.youareright.repository.AccountRepository;
import fa.youareright.service.AccountService;
import fa.youareright.service.SendMailService;
import fa.youareright.service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class UserRestController {

    @Autowired
    private AuthenticationManager authenticationManager;


    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private SendMailService sendMailService;

    @Autowired
    private UserService userService;

    @Autowired
    private AccountService accountService;

    List<OTP> otps = new ArrayList<>();

    /**
     * @author NamNB6
     */
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            Account acc = (Account) authentication.getPrincipal();
            String accessToken = jwtTokenUtil.generateAccessToken(acc);
            AuthResponse response = new AuthResponse(acc.getUsername(), accessToken);
            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    /**
     * @author NamNB6
     */
    @PostMapping("/forgotPassword")
    public ResponseEntity<Object> forgotPassword(@RequestParam @Valid String email)
            throws MessagingException, IOException {

        if (accountService.isEmailExist(email)) {
            // Generate random otp
            int randomOtp = (int) Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);

            // Set time expire for otp
            LocalDateTime timeExp = LocalDateTime.now().plusMinutes(1);
            OTP otp = new OTP(Integer.toString(randomOtp), email, timeExp);
            otps.add(otp);

            // Send mail otp
            String body = "<div>\r\n"
                    + "<h3>Mã xác thực OTP của bạn là: <span style=\"color:#119744; font-weight: bold;\">" + randomOtp
                    + "</span></h3>\r\n" + "</div>";
            MailInfoDTO mail = new MailInfoDTO(email, "Quên mật khẩu?", body);
            sendMailService.send(mail);

            Map<String, Object> response = new HashMap<>();
            response.put("email", email);
            response.put("message",
                    "Mã xác thực OTP đã được gửi tới Email: " + email + ", hãy kiểm tra Email của bạn!");
            return ResponseEntity.ok(response);
        }

        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("error", "Email này chưa được đăng ký!");
        return ResponseEntity.badRequest().body(errorResponse);
    }

    /**
     * @author NamNB6
     */
    @PostMapping("/confirmOtp")
    public ResponseEntity<?> confirmForgotPassword(@RequestBody ConfirmOtp confirmOtp) {
        // Check OTP
        if (accountService.isOtpExact(confirmOtp, otps)) {
            Map<String, Object> response = new HashMap<>();
            response.put("msg", "Success, continue");
            response.put("email", confirmOtp.getEmail());
            return ResponseEntity.ok(response);
        }

        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Mã xác thực OTP không đúng, vui lòng thử lại!");
        return ResponseEntity.badRequest().body(errorResponse);
    }

    /**
     * @author NamNB6
     */
    @PostMapping("/forgot-changePassword")
    public ResponseEntity<?> changePassword(@RequestBody ForgotChangePassword forgotChangePassword) {

        if (accountService.isEmailExist(forgotChangePassword.getEmail())) {
            Account acc = accountService.findByEmail(forgotChangePassword.getEmail());

            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            acc.setPassword(passwordEncoder.encode(forgotChangePassword.getNewPassword()));
            accountService.save(acc);

            Map<String, Object> response = new HashMap<>();
            response.put("msg", "Password changed successfully.");
            return ResponseEntity.ok(response);

        }

        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Email này chưa được đăng ký!");
        return ResponseEntity.badRequest().body(errorResponse);
    }

    /**
     * @author NamNB6
     */
    @PostMapping("/changePassword")
    public ResponseEntity<?> change(@RequestBody ChangePassword changePassword) {
        Account acc = accountService.findByUsername(changePassword.getUsername());

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (passwordEncoder.matches(changePassword.getOldPassword(), acc.getPassword())) {
            acc.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
            accountRepository.save(acc);
            Map<String, Object> response = new HashMap<>();
            response.put("msg", "Password changed successfully.");
            return ResponseEntity.ok(response);
        }

        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Error!");
        return ResponseEntity.badRequest().body(errorResponse);
    }

    /**
     * @author NamNB6
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterInfo info) {
        // Check username, email is exist
        Map<String, String> errorResponse = new HashMap<>();
        if (accountService.isUsernameExist(info.getUsername())) {
            errorResponse.put("error", "Tên đăng nhập đã tồn tại!");
            return ResponseEntity.badRequest().body(errorResponse);
        } else if (accountService.isEmailExist(info.getEmail())) {
            errorResponse.put("error", "Email đã tồn tại!");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Generate userId auto increment
        String lastUserId = userService.getLastUserId();
        String userId = null;
        if (lastUserId == null) {
            userId = "USR001";
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
        acc.addRole(new Role(4));

        userService.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "Register successfully.");
        return ResponseEntity.ok(response);
    }

    /**
     * @author NamNB6
     */
    @GetMapping("/updateInfo")
    public ResponseEntity<?> getUpdateInfo(@RequestParam Integer accountId) {
        User user = userService.findByAccountId(accountId);
        Map<String, Object> response = new HashMap<>();
        response.put("userId", user.getUserId());
        response.put("fullname", user.getFullName());
        response.put("phoneNumber", user.getPhoneNumber());
        response.put("address", user.getAddress());
        response.put("gender", user.getGender());
        response.put("avatar", user.getAvatar());
        response.put("dob", user.getDateOfBirth());
        response.put("email", user.getAccount().getEmail());
        return ResponseEntity.ok(response);
    }

    /**
     * @author NamNB6
     */
    @PostMapping("/updateInfo")
    public ResponseEntity<?> updateInfo(@RequestBody UpdateInfoDTO info) {
        userService.updateInfo(info);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "Update successfully.");
        return ResponseEntity.ok(response);
    }


}
