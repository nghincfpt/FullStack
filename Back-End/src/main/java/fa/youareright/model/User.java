package fa.youareright.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @Column(name = "user_id", columnDefinition = "varchar(10)")
    private String userId;

    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @Column(columnDefinition = "varchar(45)")
    private String fullName;

    @Column(columnDefinition = "varchar(11)")
    private String phoneNumber;

    @Column(columnDefinition = "varchar(100)")
    private String address;

    @Column(columnDefinition = "varchar(10)")
    private String gender;

    private String avatar;

    @Column(name = "date_of_birth", columnDefinition = "date")
    private LocalDate dateOfBirth;

    @Column(columnDefinition = "varchar(30)")
    private String status;

    @OneToMany(mappedBy = "user")
    private List<Booking> bookingList;

    @OneToOne(mappedBy = "user")
//    @JsonBackReference
    private Employee employee;

    @OneToMany(mappedBy = "user")
    @JsonBackReference
    private List<Invoice> invoiceList;

    public User(String userId) {
        this.userId = userId;
    }
}
