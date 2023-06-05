package fa.youareright.service;

import fa.youareright.dto.BookingDTO;
import fa.youareright.model.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface BookingService {
    Booking saveBookingAndBookingDetail(BookingDTO bookingDTO);
    Booking updateBookingAndBookingDetail(BookingDTO bookingDTO,String bookingId);

    Page<Booking> findAll(String bookingId, String name, Pageable pageable);
    Page<Booking> findAllByCustomer(String bookingId, String name, Pageable pageable);
    int deleteBooking( String bookingId );

    Booking findById(String id);
}
