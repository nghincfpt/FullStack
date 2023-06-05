package fa.youareright.controller.employee;

import fa.youareright.dto.ListServiceResponse;
import fa.youareright.model.Account;
import fa.youareright.model.Booking;
import fa.youareright.repository.AccountRepository;
import fa.youareright.repository.BookingDetailRepository;
import fa.youareright.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/booking-management")
public class BookingManagementRestController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingDetailRepository bookingDetailRepository;

    @Autowired
    private AccountRepository accountRepository;
    @GetMapping("")
    @RolesAllowed({"ROLE_CUSTOMER", "ROLE_RECEPTIONIST"})
    public ResponseEntity<?> getBookingInfo(@RequestParam(required = false, name = "c") String condition,
                                            @RequestParam(defaultValue = "0", name = "p") int page,
                                            @RequestParam(defaultValue = "5") int size, Principal principal){
        PageRequest pageable = PageRequest.of(page, size);
        int accountId= ((Account)(((Authentication) principal).getPrincipal())).getAccountId();
        boolean checkRole = ((Account)(((Authentication) principal).getPrincipal())).getRoles()
                .stream().map(x -> x.getName())
                .collect(Collectors.joining()).contains("ROLE_CUSTOMER");
        Page<Booking> bookingList;
        if(checkRole) {
            bookingList = bookingService.findAllByCustomer(condition,
                    accountRepository.findById(accountId).orElse(null).getUser().getFullName(),
                    pageable);
        }else {
            bookingList = bookingService.findAll(condition, condition, pageable);
        }

        return new ResponseEntity<>(bookingList, HttpStatus.OK);
    }

    @DeleteMapping("/{bookingId}")
    @RolesAllowed({"ROLE_CUSTOMER", "ROLE_RECEPTIONIST"})
    public ResponseEntity<?> deleteBooking(@PathVariable String bookingId) {
        return new ResponseEntity<>(bookingService.deleteBooking(bookingId), HttpStatus.OK);
    }

    @GetMapping("details")
    public ResponseEntity<?> getDetails(@RequestParam(name = "id") String bookingId) {
        Booking booking = bookingService.findById(bookingId);
        List<ListServiceResponse> service = booking.getBookingDetailList().stream().map(item ->
                new ListServiceResponse(item.getHairService().getName(), item.getEmployee().getUser().getFullName(),
                        item.getHairService().getPrice())).collect(Collectors.toList());
        double total = service.stream().mapToDouble(ListServiceResponse::getPrice).sum();
        Map<String, Object> resp = new HashMap<>();
        resp.put("id", booking.getBookingId());
        resp.put("date", booking.getBookingDate());
        resp.put("time", booking.getBookingDetailList().get(0).getWorkingTime().getTimeZone());
        resp.put("name", booking.getName());
        resp.put("branch", booking.getBranch().getName());
        resp.put("service", service);
        resp.put("total", total);

        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

}