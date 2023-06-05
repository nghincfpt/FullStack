package fa.youareright.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Branch {
    @Id
    @GeneratedValue(generator = "auto-generator")
    @GenericGenerator(name = "auto-generator", parameters = @org.hibernate.annotations.Parameter(name = "prefix", value = "BRA"), strategy = "fa.youareright.utils.AutoGeneration")
    @Column(name="branch_id",columnDefinition = "varchar(10)")
    private String branchId;
    private String name;
    private String address;
    @Column(columnDefinition = "int default 0")
    private int isDelete;

    @OneToMany(mappedBy = "branch")
    @JsonBackReference
    private List<Employee> employeeList;

    @OneToMany(mappedBy = "branch")
    private List<Media> media;


    public Branch(String branchId) {
        this.branchId = branchId;
    }

    @OneToMany(mappedBy = "branch")
    @JsonBackReference
    private List<Booking> bookingList;


}
