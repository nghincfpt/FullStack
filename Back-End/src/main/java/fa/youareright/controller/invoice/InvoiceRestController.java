package fa.youareright.controller.invoice;

import fa.youareright.dto.BookingDTO;
import fa.youareright.dto.InvoiceDTO;
import fa.youareright.dto.ListServiceResponse;
import fa.youareright.dto.ListServiceResponsePayment;
import fa.youareright.model.Booking;
import fa.youareright.model.BookingDetail;
import fa.youareright.model.Invoice;
import fa.youareright.repository.BookingDetailRepository;
import fa.youareright.repository.BookingRepository;
import fa.youareright.repository.InvoiceDetailRepository;
import fa.youareright.repository.InvoiceRepository;
import fa.youareright.service.BookingService;
import fa.youareright.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/receptionist/invoice")
public class InvoiceRestController {
    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    BookingService bookingService;

    @Autowired
    BookingDetailRepository bookingDetailRepository;

    @Autowired
    InvoiceRepository invoiceRepository;

    @Autowired
    InvoiceService invoiceService;

    @Autowired
    InvoiceDetailRepository invoiceDetailRepository;

    @GetMapping("")
    public ResponseEntity<?> getBookingInfo(@RequestParam(required = false, name = "c") String condition,
                                            @RequestParam(defaultValue = "0", name = "p") int page,
                                            @RequestParam(defaultValue = "5") int size) {
        PageRequest pageable = PageRequest.of(page,size);
        Page<Booking> bookingList = bookingService.findAll(condition,condition, pageable);
        return new ResponseEntity<>(bookingList,HttpStatus.OK);
    }

    @GetMapping("/bookingdetail")
    public ResponseEntity<?> getListBookingDetail() {
        return new ResponseEntity<>(bookingDetailRepository.findAll(), HttpStatus.OK);
    }
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<?> getListBookingById(@PathVariable String bookingId) {
        return new ResponseEntity<>(bookingRepository.findById(bookingId), HttpStatus.OK);
    }

    @GetMapping("/details")
    @RolesAllowed({"ROLE_CUSTOMER","ROLE_ADMIN","ROLE_RECEPTIONIST"})
    public ResponseEntity<?> getDetails(@RequestParam(name= "id") String bookingId) {
        Booking booking = bookingService.findById(bookingId);
        List<ListServiceResponsePayment> service = booking.getBookingDetailList().stream().map(item->
                new ListServiceResponsePayment(item.getHairService().getServiceId(), item.getEmployee().getEmployeeId(),item.getHairService().getName(),item.getEmployee().getUser().getFullName(),
                        item.getHairService().getPrice()) ).collect(Collectors.toList());
        double total = service.stream().mapToDouble(ListServiceResponsePayment:: getPrice).sum();
        Map<String, Object> resp = new HashMap<>();
        resp.put("id", booking.getBookingId());
        resp.put("date", booking.getBookingDate());
        resp.put("time", booking.getBookingDetailList().get(0).getWorkingTime().getTimeZone());
        resp.put("name", booking.getName());
        resp.put("branch", booking.getBranch().getName());
        resp.put("service",service);
        resp.put("userIdBooking", booking.getUser().getUserId());
        resp.put("phoneUerBooking", booking.getUser().getPhoneNumber());
        resp.put("total", total);

        return new ResponseEntity<>(resp,HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createInvoice(@RequestBody InvoiceDTO invoiceDTO) {

        boolean isInvoice = invoiceRepository.checkExistInvoice(invoiceDTO.getBookingId()).isEmpty();
        System.err.println(isInvoice);
        Invoice invoice = null;
        if(!isInvoice) {
            invoice = invoiceService.updateInvoiceAndInvoiceDetail(invoiceDTO);
        } else {
            invoice = invoiceService.saveInvoiceAndInvoiceDetail(invoiceDTO);
        }

        return new ResponseEntity<>(invoice, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getListInvoice() {
        return new ResponseEntity<>(invoiceRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/list-detail")
    public ResponseEntity<?> getListInvoiceDetail() {
        return new ResponseEntity<>(invoiceDetailRepository.findAll(), HttpStatus.OK);
    }

}
