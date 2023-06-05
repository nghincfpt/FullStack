package fa.youareright.service.impl;

import fa.youareright.dto.BookingDTO;
import fa.youareright.model.Booking;
import fa.youareright.model.BookingDetail;
import fa.youareright.repository.*;
import fa.youareright.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class BookingServiceImpl implements BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private WorkingTimeRepository workingTimeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookingDetailRepository bookingDetailRepository;
    @Autowired
    private HairServiceRepository hairServiceRepository;
    @Autowired
    private BranchRepository branchRepository;

    @Override
    @Transactional
    public Booking saveBookingAndBookingDetail(BookingDTO bookingDTO) {
        String name = bookingDTO.getCustomerName() == null ? userRepository.findById(bookingDTO.getUserId())
                .orElse(null).getFullName() : bookingDTO.getCustomerName();
        Booking booking = bookingRepository
                .save(new Booking(LocalDate.parse(bookingDTO.getBookingDate()), bookingDTO.getIsDelete(), bookingDTO.getNote(),
                        userRepository.findById(bookingDTO.getUserId()).orElse(null),
                        branchRepository.findById(bookingDTO.getBranch()).orElse(null),
                        name));
        bookingDTO.getServiceList().add("SER011");
        bookingDTO.getServiceList().stream().forEach((item) -> {
            if (hairServiceRepository.findById(item).orElse(null).getType()
                    .equals(employeeRepository.findById(bookingDTO.getStyleId()).orElse(null).getType())) {
                bookingDetailRepository.save(new BookingDetail(
                        bookingDTO.getIsDelete(),
                        hairServiceRepository.findById(item).orElse(null),
                        booking,
                        employeeRepository.findById(bookingDTO.getStyleId()).orElse(null),
                        workingTimeRepository.findById(bookingDTO.getWorkTimeId()).orElse(null)));
            } else
                bookingDetailRepository.save(new BookingDetail(
                        bookingDTO.getIsDelete(),
                        hairServiceRepository.findById(item).orElse(null),
                        booking,
                        employeeRepository.findById(bookingDTO.getSkinnerId()).orElse(null),
                        workingTimeRepository.findById(bookingDTO.getWorkTimeId()).orElse(null)));
        });
        return booking;
    }

    @Override
    public Booking updateBookingAndBookingDetail(BookingDTO bookingDTO, String bookingId) {
        String name = bookingDTO.getCustomerName() == null ? userRepository.findById(bookingDTO.getUserId())
                .orElse(null).getFullName() : bookingDTO.getCustomerName();
        int resultDelete = bookingDetailRepository.deleteBookingDetailByBookingId((bookingId));

        Booking bookingDTOData=  new Booking( LocalDate.parse(bookingDTO.getBookingDate()),
                bookingDTO.getIsDelete(), bookingDTO.getNote(),
                userRepository.findById(bookingDTO.getUserId()).orElse(null),
                branchRepository.findById(bookingDTO.getBranch()).orElse(null), name);
        bookingDTOData.setBookingId(bookingId);

        Booking booking = bookingRepository.save(bookingDTOData);
        bookingDTO.getServiceList().add("SER011");
        bookingDTO.getServiceList().stream().forEach((item) -> {
            if (hairServiceRepository.findById(item).orElse(null).getType()
                    .equals(employeeRepository.findById(bookingDTO.getStyleId()).orElse(null).getType())) {
                bookingDetailRepository.save(new BookingDetail(
                        bookingDTO.getIsDelete(),
                        hairServiceRepository.findById(item).orElse(null),
                        booking,
                        employeeRepository.findById(bookingDTO.getStyleId()).orElse(null),
                        workingTimeRepository.findById(bookingDTO.getWorkTimeId()).orElse(null)));
            } else
                bookingDetailRepository.save(new BookingDetail(
                        bookingDTO.getIsDelete(),
                        hairServiceRepository.findById(item).orElse(null), booking,
                        employeeRepository.findById(bookingDTO.getSkinnerId()).orElse(null),
                        workingTimeRepository.findById(bookingDTO.getWorkTimeId()).orElse(null)));
        });
        return booking;
    }

    @Override
    public Page<Booking> findAll(String bookingId, String name, Pageable pageable) {
        Pageable sortPage = pageable;
        Sort sort = Sort.by(Sort.Direction.ASC,"bookingDate");
        sortPage = PageRequest.of(pageable.getPageNumber(),pageable.getPageSize(),sort);

        Specification<Booking> spec = Specification.where(null);
        if (bookingId != null && !bookingId.trim().isEmpty()) {
            spec = spec.or((root, query, builder) -> builder.like(root.get("bookingId"), "%" + bookingId + "%"));
        }
        if (name != null && !name.trim().isEmpty()) {
            spec = spec.or((root, query, builder) -> builder.like(root.get("name"), "%" + name + "%"));
        }
        spec = spec.and((root, query, builder) -> builder.equal(root.get("isDelete"), 0));

        Page<Booking> result;
        if (spec.equals(Specification.where(null))) {
            result = bookingRepository.findAll(sortPage);
        } else {
            result = bookingRepository.findAll(spec, sortPage);
        }

        return result;
    }
    @Override
    public Page<Booking> findAllByCustomer(String bookingId, String name, Pageable pageable) {
        Pageable sortPage = pageable;
        Sort sort = Sort.by(Sort.Direction.ASC,"bookingDate");
        sortPage = PageRequest.of(pageable.getPageNumber(),pageable.getPageSize(),sort);

        Specification<Booking> spec = Specification.where(null);
        if (bookingId != null && !bookingId.trim().isEmpty()) {
            spec = spec.or((root, query, builder) -> builder.like(root.get("bookingId"), "%" + bookingId + "%"));
        }
        if (name != null && !name.trim().isEmpty()) {
            spec = spec.and((root, query, builder) -> builder.like(root.get("name"), "%" + name + "%"));
        }
        spec = spec.and((root, query, builder) -> builder.equal(root.get("isDelete"), 0));

        Page<Booking> result;
        if (spec.equals(Specification.where(null))) {
            result = bookingRepository.findAll(sortPage);
        } else {
            result = bookingRepository.findAll(spec, sortPage);
        }

        return result;
    }

    @Override
    public int deleteBooking(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        bookingDetailRepository.deleteAll(booking.getBookingDetailList());
        return bookingRepository.deleteBooking(bookingId);
    }

    @Override
    public Booking findById(String id) {
        return bookingRepository.findById(id).orElse(null);
    }
}