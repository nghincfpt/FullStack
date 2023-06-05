package fa.youareright.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import fa.youareright.dto.EmployeeInfo;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

import java.util.List;
import org.hibernate.annotations.Parameter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    @GenericGenerator(name = "auto-generator", parameters = @Parameter(name = "prefix", value = "SER"), strategy = "fa.youareright.utils.AutoGeneration")
    @Column(name = "emp_id",columnDefinition = "varchar(10)")
    private  String employeeId;

    @Column(columnDefinition = "int default 0")
    private int isDelete;
    private String type;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "branch_id")
//    @JsonBackReference
    private Branch branch;

    @OneToMany(mappedBy = "employee")
    @JsonBackReference
    private List<BookingDetail> bookingDetailList;

    @OneToMany(mappedBy = "employee")
    private List<InvoiceDetail> invoiceDetailList;



    public Employee(String id, EmployeeInfo employeeInfo) {
        this.employeeId = id;
        this.isDelete = employeeInfo.getIsDelete();
        this.type = employeeInfo.getType();
        this.user = new User(employeeInfo.getUserId());
        this.branch = new Branch(employeeInfo.getBranchId());
    }
}
