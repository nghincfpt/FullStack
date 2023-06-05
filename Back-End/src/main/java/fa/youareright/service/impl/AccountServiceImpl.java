package fa.youareright.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fa.youareright.dto.ConfirmOtp;
import fa.youareright.dto.OTP;
import fa.youareright.model.Account;
import fa.youareright.repository.AccountRepository;
import fa.youareright.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService {

	@Autowired
	private AccountRepository accountRepository;

	@Override
	public void save(Account account) {
		accountRepository.save(account);
	}

	@Override
	public List<String> getAllUsername() {
		return accountRepository.getAllUsername();
	}

	@Override
	public boolean isUsernameExist(String username) {
		boolean isExist = false;
		List<String> listUsername = getAllUsername();
		for (String string : listUsername) {
			if (username.equals(string)) {
				isExist = true;
			}
		}
		return isExist;
	}

	@Override
	public List<String> getAllEmail() {
		return accountRepository.getAllEmail();
	}

	@Override
	public boolean isEmailExist(String email) {
		boolean isExist = false;
		List<String> listEmail = getAllEmail();
		for (String string : listEmail) {
			if (email.equals(string)) {
				isExist = true;
			}
		}
		return isExist;
	}

	@Override
	public Account findByUsername(String username) {
		return accountRepository.findByUsername(username).get();
	}

	@Override
	public Account findByEmail(String email) {
		return accountRepository.findByEmail(email).get();
	}

	@Override
	public boolean isOtpExact(ConfirmOtp confirmOtp, List<OTP> otps) {
		boolean isExact = false;
		for (OTP otp : otps) {
			if (confirmOtp.getOtp().equals(otp.getOtp()) && confirmOtp.getEmail().equals(otp.getEmail())
					&& LocalDateTime.now().compareTo(otp.getTimeExp()) < 0) {
				isExact=true;
			}
		}
		return isExact;
	}
	
	@Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }

}
