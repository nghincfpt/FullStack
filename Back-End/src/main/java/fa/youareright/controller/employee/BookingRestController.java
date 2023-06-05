package fa.youareright.controller.employee;

import fa.youareright.dto.BookingDTO;
import fa.youareright.model.Booking;
import fa.youareright.model.BookingDetail;

import fa.youareright.model.HairService;
import fa.youareright.repository.*;
import fa.youareright.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/emp/booking")
public class BookingRestController {
    @Autowired
    private BranchRepository branchRepository;
    @Autowired
    private WorkingTimeRepository workingTimeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookingDetailRepository bookingDetailRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private BookingService bookingService;
    private static final int ISDELETE = 0;

    @GetMapping("info/list-branch")
    public ResponseEntity<?> getListBranch() {

        return new ResponseEntity<>(branchRepository.findByIsDelete(ISDELETE), HttpStatus.OK);
    }

    @GetMapping("info/list-employee-of-branch")
    public ResponseEntity<?> getEmployeeOfBranch(@RequestParam(name = "branchId") String branchId) {
        return new ResponseEntity<>(userRepository.getListEmployee(branchId), HttpStatus.OK);
    }

    @GetMapping("info/working-time")
    public ResponseEntity<?> getWorkingTimeList() {
        return new ResponseEntity<>(workingTimeRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("info/busy-list")
    public ResponseEntity<?> getBusyListOfEmployee(@RequestParam("employeeId") String employeeId, @RequestParam("day") String day) {
        List<String> busyList;
        busyList = bookingDetailRepository.getBusyTimeOfEmployee(LocalDate.parse(day), employeeId)
                .stream()
                .map((item) -> item.getWorkingTime().getTimeZone().toString())
                .collect(Collectors.toList());
        return new ResponseEntity<>(busyList, HttpStatus.OK);
    }

    @PostMapping("create")
    @RolesAllowed({"ROLE_CUSTOMER", "ROLE_RECEPTIONIST"})
    public ResponseEntity<?> createBooking(@RequestBody BookingDTO bookingDTO) {
        boolean isBooking = bookingDetailRepository.checkExistBooking(bookingDTO.getWorkTimeId(), bookingDTO.getStyleId(),
                LocalDate.parse(bookingDTO.getBookingDate())).isEmpty();
        if (!isBooking) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        Booking booking = bookingService.saveBookingAndBookingDetail(bookingDTO);
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }

    @GetMapping("/get-booking")
    public ResponseEntity<?> getBookingInfo(@RequestParam("bookingId") String bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        List<HairService> listService = booking.getBookingDetailList().stream().map((item)->item.getHairService()).
                filter((item)-> !item.getServiceId().equals("SER011")).collect(Collectors.toList());
        Map<String, Object> response = new HashMap<>();
        List<BookingDetail> styleData = bookingDetailRepository.getStylist(bookingId);
        List<BookingDetail> skinnerData =bookingDetailRepository.getSkinnerlist(bookingId);
        String stylist = styleData.isEmpty() ? "" :  styleData.get(0).getEmployee().getEmployeeId();
        String skinner= skinnerData.isEmpty() ? "" : skinnerData.get(0).getEmployee().getEmployeeId();
        String workTimeId;
        if(stylist.equals("")) {
            workTimeId=   bookingDetailRepository.getSkinnerlist(bookingId).get(0).getWorkingTime().getWorkingTimeId();
        }else workTimeId = styleData.get(0).getWorkingTime().getWorkingTimeId();

        response.put("branch",booking.getBranch().getBranchId());
        response.put("bookingId",booking.getBookingId());
        response.put("bookingDate",booking.getBookingDate());
        response.put("isDelete",booking.getIsDelete());
        response.put("serviceList",listService);
        response.put("styleId",stylist);
        response.put("skinnerId",skinner);
        response.put("userId",booking.getUser().getUserId());
        response.put("workTimeId",workTimeId);
        response.put("note",booking.getNote());
        response.put("customerName",booking.getName());

        return  new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping("update/{bookingId}")
    public ResponseEntity<?> createBooking(@RequestBody BookingDTO bookingDTO, @PathVariable("bookingId") String bookingId) {
        Booking booking = bookingService.updateBookingAndBookingDetail(bookingDTO, bookingId);
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }


}
