package fa.youareright.repository;

import fa.youareright.model.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


@Transactional
public interface BookingRepository  extends JpaRepository<Booking, String> , JpaSpecificationExecutor<Booking> {
    Page<Booking> findAll(Specification<Booking> spec, Pageable page);

    @Modifying
    @Query(value="update Booking b set b.isDelete = 1 where b.bookingId = :bookingId")
    int deleteBooking(@Param("bookingId") String bookingId );


}
