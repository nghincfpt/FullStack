package fa.youareright.repository;

import fa.youareright.model.BookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface BookingDetailRepository extends JpaRepository<BookingDetail,String> {

    @Query(value="select bd from BookingDetail  bd where bd.booking.bookingDate = :day and bd.employee.employeeId = :employeeId")
    List<BookingDetail> getBusyTimeOfEmployee(@Param("day") LocalDate day, @Param("employeeId") String employeeId);

    @Query(value="select bd from BookingDetail  bd where bd.booking.bookingId = :bookingId and bd.employee.type = '1'")
    List<BookingDetail> getStylist(@Param("bookingId")String bookingId);

    @Query(value="select bd from BookingDetail  bd where bd.booking.bookingId = :bookingId and bd.employee.type = '2'")
    List<BookingDetail> getSkinnerlist(@Param("bookingId")String bookingId);

    @Modifying
    @Transactional
    @Query(value="delete from BookingDetail bd where bd.booking.bookingId = :bookingId")
    int deleteBookingDetailByBookingId(@Param("bookingId") String bookingId);

  @Query(value="select bd from BookingDetail bd where bd.workingTime.workingTimeId = :time and bd.employee.employeeId = :empId " +
          "and bd.booking.bookingDate = :date")
    List<BookingDetail> checkExistBooking(@Param("time") String time, @Param("empId")  String empId, @Param("date")  LocalDate date);


}
