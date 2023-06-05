package fa.youareright.service;

import fa.youareright.dto.InvoiceDTO;
import fa.youareright.model.Booking;
import fa.youareright.model.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface InvoiceService {
    Invoice saveInvoiceAndInvoiceDetail(InvoiceDTO invoiceDTO);
    Invoice updateInvoiceAndInvoiceDetail(InvoiceDTO invoiceDTO);

    int deleteInvocie( String invoiceId );

    Page<Invoice> findAll(String invoiceId, String name, Pageable pageable);

    Page<Invoice> findAllByCustomer(String invoiceId, String name, Pageable pageable);
}
