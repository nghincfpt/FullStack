package fa.youareright.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fa.youareright.model.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {
	Optional<Account> findByUsername(String username);

	Optional<Account> findByEmail(String email);

	@Query(value = "select username from account;", nativeQuery = true)
	public List<String> getAllUsername();

	@Query(value = "select email from account;", nativeQuery = true)
	public List<String> getAllEmail();
}
