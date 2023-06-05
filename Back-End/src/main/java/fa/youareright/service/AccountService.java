package fa.youareright.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fa.youareright.dto.ConfirmOtp;
import fa.youareright.dto.OTP;
import fa.youareright.model.Account;

@Service
public interface AccountService {

	void save(Account account);

	List<String> getAllUsername();

	boolean isUsernameExist(String username);

	List<String> getAllEmail();

	boolean isEmailExist(String email);

	Account findByUsername(String username);

	Account findByEmail(String email);

	boolean isOtpExact(ConfirmOtp confirmOtp, List<OTP> otps);

	List<Account> findAll();

}
