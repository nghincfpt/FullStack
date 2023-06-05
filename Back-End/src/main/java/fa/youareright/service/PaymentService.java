package fa.youareright.service;

import fa.youareright.model.Branch;
import fa.youareright.model.Invoice;

import java.util.List;
import java.util.Optional;

public interface PaymentService {
    Optional<Invoice> findById(String invoiceId);

    List<Invoice> findList();
}
