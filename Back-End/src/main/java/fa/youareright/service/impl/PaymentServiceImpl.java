package fa.youareright.service.impl;

import fa.youareright.model.Branch;
import fa.youareright.model.Invoice;
import fa.youareright.service.PaymentService;

import java.util.List;
import java.util.Optional;

public class PaymentServiceImpl implements PaymentService {

    @Override
    public Optional<Invoice> findById(String invoiceId) {
        return Optional.empty();
    }

    @Override
    public List<Invoice> findList() {
        return null;
    }
}
