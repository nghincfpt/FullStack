package fa.youareright.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingDetail {
    @Id
    @GeneratedValue(generator = "auto-generator")
    @GenericGenerator(name = "auto-generator",
            parameters = @org.hibernate.annotations.Parameter(name = "prefix", value = "BKD"),
            strategy = "fa.youareright.utils.MyGenerator")
    @Column(name = "booking_detail_id", columnDefinition = "varchar(10)")
    private String bookingDetailId;

    @Column(columnDefinition = "int default 0")
    private int isDelete;

    @ManyToOne

    @JoinColumn(name = "service_id")
    private HairService hairService;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne

    @JoinColumn(name = "emp_id")
    private Employee employee;

    @ManyToOne

    @JoinColumn(name = "working_time_id")
    private WorkingTime workingTime;

    public BookingDetail( int isDelete, HairService hairService, Booking booking, Employee employee, WorkingTime workingTime) {

        this.isDelete = isDelete;
        this.hairService = hairService;
        this.booking = booking;
        this.employee = employee;
        this.workingTime = workingTime;
    }
}