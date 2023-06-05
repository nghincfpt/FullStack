package fa.youareright.controller.invoice;

import fa.youareright.model.Account;
import fa.youareright.model.Invoice;
import fa.youareright.repository.AccountRepository;
import fa.youareright.repository.InvoiceRepository;
import fa.youareright.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.security.Principal;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/invoice-management")
public class InvoiceManagementRestController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private InvoiceRepository  invoiceRepository;


    @GetMapping("")
    @RolesAllowed({"ROLE_CUSTOMER", "ROLE_RECEPTIONIST", "ROLE_ADMIN"})
    public ResponseEntity<?> getBookingInfo(@RequestParam(required = false, name = "c") String condition,
                                            @RequestParam(defaultValue = "0", name = "p") int page,
                                            @RequestParam(defaultValue = "5") int size, Principal principal){
        PageRequest pageable = PageRequest.of(page, size);
        int accountId= ((Account)(((Authentication) principal).getPrincipal())).getAccountId();

        boolean checkRole = ((Account)(((Authentication) principal).getPrincipal())).getRoles()
                .stream().map(x -> x.getName())
                .collect(Collectors.joining()).contains("ROLE_CUSTOMER");
        Page<Invoice> invoiceList;
        if(checkRole) {
            invoiceList = invoiceService.findAllByCustomer(condition,
                    accountRepository.findById(accountId).orElse(null).getUser().getUserId(),
                    pageable);
        }else {
            invoiceList = invoiceService.findAll(condition, condition, pageable);
        }

        return new ResponseEntity<>(invoiceList, HttpStatus.OK);
    }

    @DeleteMapping("/{invoiceId}")
    @RolesAllowed({"ROLE_CUSTOMER", "ROLE_RECEPTIONIST", "ROLE_ADMIN"})
    public ResponseEntity<?> deleteInvocie(@PathVariable String invoiceId) {
        return new ResponseEntity<>(invoiceService.deleteInvocie(invoiceId), HttpStatus.OK);
    }

    @GetMapping("/detail/{bookingId}")
    @RolesAllowed({"ROLE_CUSTOMER", "ROLE_RECEPTIONIST", "ROLE_ADMIN"})
    public ResponseEntity<?> getDetailInvocie(@PathVariable String bookingId) {
        return new ResponseEntity<>(invoiceRepository.getInvoicesByBookingId(bookingId), HttpStatus.OK);
    }

    @PatchMapping("/success/{bookingId}")
//    @RolesAllowed({"ROLE_CUSTOMER", "ROLE_RECEPTIONIST"})
    public ResponseEntity<?> thanhToanInvoice(@PathVariable String bookingId) {
        invoiceRepository.thanhToanInvoice(bookingId);
        System.err.println("vaf thanh toan" + bookingId);
            return new ResponseEntity<>("Thanh toán thành công", HttpStatus.OK);

    }
}
