package fa.youareright.repository;

import fa.youareright.model.WorkingTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkingTimeRepository  extends JpaRepository<WorkingTime,String> {
}
