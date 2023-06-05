package fa.youareright.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fa.youareright.dto.UpdateInfoDTO;
import fa.youareright.model.User;
import fa.youareright.repository.AccountRepository;
import fa.youareright.repository.UserRepository;
import fa.youareright.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public String getLastUserId() {
        return userRepository.getLastUserId();
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
    public void saveNamNB6(User user) {
        userRepository.save(user);
    }

    @Override
    public User findByAccountId(Integer accountId) {
        return userRepository.findByAccountId(accountId).get();
    }

    @Override
    public void updateInfo(UpdateInfoDTO info) {
        userRepository.updateUser(info.getAddress(), info.getAvatar(), info.getDob(), info.getFullName(),
                info.getPhoneNumber(), info.getUserId());
    }

    /**
     * @param condition, condition
     * @return findAllByUser()
     * @Creator HuyenTN2
     * @Date 30/05/2023
     */

    @Override
    public Page<User> listAll(String condition, Pageable pageable) {
        return userRepository.findAllByUser(condition, condition, pageable);
    }

    @Autowired
    AccountRepository accountRepository;

    @Override
    public void save(User user) {
        user.setAccount(user.getAccount());
        userRepository.save(user);
    }

    @Override
    public User findByUserId(String userId) {
        return userRepository.findByUserId(userId).get();
    }

    @Override
    public User findByEmpId(String employeeId) {
        return userRepository.findByEmpId(employeeId).get();
    }

    @Override
    public void updateStatus(String userId) {
        userRepository.updateStatus(userId);
    }



//	@Override
//	public User findByEmpId(String employeeId) {
//		return userRepository.findByEmpId(employeeId).get();
//	}


}
