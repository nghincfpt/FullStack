package fa.youareright.repository;

import fa.youareright.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository  extends JpaRepository<Role, String> {
}
