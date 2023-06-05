package fa.youareright.service.impl;

import fa.youareright.dto.InvoiceDTO;
import fa.youareright.model.Invoice;
import fa.youareright.model.InvoiceDetail;
import fa.youareright.repository.*;
import fa.youareright.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    InvoiceRepository invoiceRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    HairServiceRepository hairServiceRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    InvoiceDetailRepository invoiceDetailRepository;


    @Override
    @Transactional
    public Invoice saveInvoiceAndInvoiceDetail(InvoiceDTO invoiceDTO) {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        Invoice invoice = invoiceRepository
                .save(new Invoice(invoiceDTO.getIsDelete(),
                        userRepository.findById(invoiceDTO.getUserId()).orElse(null),
                        bookingRepository.findById(invoiceDTO.getBookingId()).orElse(null),
                        timestamp.toLocalDateTime(),
                        Float.parseFloat(invoiceDTO.getTotal()),
                        invoiceDTO.getStatus()
                ));

            invoiceDTO.getServiceList().stream().forEach((item) -> {
                if (hairServiceRepository.findById(item).orElse(null).getType()
                        .equals(employeeRepository.findById(invoiceDTO.getSkinnerId()).orElse(null).getType())) {
                    invoiceDetailRepository.save(new InvoiceDetail(
                            invoiceDTO.getIsDelete(),
                            hairServiceRepository.findById(item).orElse(null),
                            employeeRepository.findById(invoiceDTO.getSkinnerId()).orElse(null),
                            invoice));
                } else
                    invoiceDetailRepository.save(new InvoiceDetail(
                            invoiceDTO.getIsDelete(),
                            hairServiceRepository.findById(item).orElse(null),
                            employeeRepository.findById(invoiceDTO.getStyleId()).orElse(null),
                            invoice));
            });
        return invoice;
    }

    @Override
    @Transactional
    public Invoice updateInvoiceAndInvoiceDetail(InvoiceDTO invoiceDTO) {
        String invoiceId = invoiceRepository.findInvoiceIdByBookingId(invoiceDTO.getBookingId());

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());;
        Invoice invoice = new Invoice(invoiceDTO.getIsDelete(),
                        userRepository.findById(invoiceDTO.getUserId()).orElse(null),
                        bookingRepository.findById(invoiceDTO.getBookingId()).orElse(null),
                timestamp.toLocalDateTime(),
                        Float.parseFloat(invoiceDTO.getTotal()),
                        invoiceDTO.getStatus());
        invoice.setInvoiceId(invoiceId);
        invoiceRepository.save(invoice);

        invoiceDetailRepository.deleteByInvoiceId(invoiceId);

        invoiceDTO.getServiceList().stream().forEach((item) -> {
            if (hairServiceRepository.findById(item).orElse(null).getType()
                    .equals(employeeRepository.findById(invoiceDTO.getSkinnerId()).orElse(null).getType())) {
                invoiceDetailRepository.save(new InvoiceDetail(
                        invoiceDTO.getIsDelete(),
                        hairServiceRepository.findById(item).orElse(null),
                        employeeRepository.findById(invoiceDTO.getSkinnerId()).orElse(null),
                        invoice));
            } else
                invoiceDetailRepository.save(new InvoiceDetail(
                        invoiceDTO.getIsDelete(),
                        hairServiceRepository.findById(item).orElse(null),
                        employeeRepository.findById(invoiceDTO.getStyleId()).orElse(null),
                        invoice));
        });
        return invoice;

    }


    @Override
    public Page<Invoice> findAll(String invoiceId, String name, Pageable pageable) {
        Pageable sortPage;
        Sort sort = Sort.by(Sort.Direction.ASC,"invoiceTime");
        sortPage = PageRequest.of(pageable.getPageNumber(),pageable.getPageSize(),sort);

        Specification<Invoice> spec = Specification.where(null);
        if (invoiceId != null && !invoiceId.trim().isEmpty()) {
            spec = spec.or((root, query, builder) -> builder.like(root.get("invoiceId"), "%" + invoiceId + "%"));
        }
        spec = spec.and((root, query, builder) -> builder.equal(root.get("isDelete"), 0));

        Page<Invoice> result;
        if (spec.equals(Specification.where(null))) {
            result = invoiceRepository.findAll(sortPage);
        } else {
            result = invoiceRepository.findAll(spec, sortPage);
        }

        return result;
    }
    @Override
    public Page<Invoice> findAllByCustomer(String invoiceId, String name, Pageable pageable) {
        Pageable sortPage;
        Sort sort = Sort.by(Sort.Direction.ASC,"invoiceTime");
        sortPage = PageRequest.of(pageable.getPageNumber(),pageable.getPageSize(),sort);

        Specification<Invoice> spec = Specification.where(null);
        if (invoiceId != null && !invoiceId.trim().isEmpty()) {
            spec = spec.or((root, query, builder) -> builder.like(root.get("invoiceId"), "%" + invoiceId + "%"));
        }
        if (name != null && !name.trim().isEmpty()) {
            spec = spec.and((root, query, builder) -> builder.like(root.get("user").get("userId"),  name ));
        }
        spec = spec.and((root, query, builder) -> builder.equal(root.get("isDelete"), 0));

        Page<Invoice> result;
        if (spec.equals(Specification.where(null))) {
            result = invoiceRepository.findAll(sortPage);
        } else {
            result = invoiceRepository.findAll(spec, sortPage);
        }

        return result;
    }


    @Override
    @Transactional
    public int deleteInvocie(String invocieId) {
        Invoice invoice = invoiceRepository.findById(invocieId).orElse(null);
        invoiceDetailRepository.deleteAll(invoice.getInvoiceDetailList());
        return invoiceRepository.deleteInvoice(invocieId);
    }

}
