package fa.youareright.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Booking {
    @Id
    @GeneratedValue(generator = "auto-generator")
    @GenericGenerator(name = "auto-generator",
            parameters = @Parameter(name = "prefix", value = "BKG"),
            strategy = "fa.youareright.utils.MyGenerator")
    @Column(name = "booking_id", columnDefinition = "varchar(10)")
    private String bookingId;
    @Column(name = "booking_date", columnDefinition = "date")
    private LocalDate bookingDate;
    @Column(name = "is_delete", columnDefinition = "int default 0")
    private int isDelete;
    @Column(columnDefinition = "text")
    private String note;
    private String name;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "booking")
    private List<BookingDetail> bookingDetailList;

    @OneToOne(mappedBy = "booking")
    @JsonBackReference
    private Invoice invoice;

    @ManyToOne

    @JoinColumn(name= "branch_id")
    private Branch branch;

    public Booking(LocalDate bookingDate, int isDelete, String note, User user, Branch branch,String name) {
        this.bookingDate = bookingDate;
        this.isDelete = isDelete;
        this.note = note;
        this.user = user;
        this.branch= branch;
        this.name= name;
    }
    public Booking(String bookingId,LocalDate bookingDate, int isDelete, String note, User user, Branch branch,String name) {
        this.bookingDate = bookingDate;
        this.isDelete = isDelete;
        this.note = note;
        this.user = user;
        this.branch= branch;
        this.bookingId= bookingId;
        this.name= name;
    }
}