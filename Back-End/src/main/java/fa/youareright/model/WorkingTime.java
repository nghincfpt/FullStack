package fa.youareright.model;

import java.time.LocalTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorkingTime {
    @Id
    @Column(name="working_time_id",columnDefinition = "varchar(10)")
    private String workingTimeId;
    @Column(name="time_zone", columnDefinition = "Time")
    private LocalTime timeZone;
    private String dateType;

    @OneToMany(mappedBy = "workingTime")
    @JsonBackReference
    private List<BookingDetail> bookingDetailList;

}