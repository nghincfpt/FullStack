package fa.youareright.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDetail {
    @Id
    @GeneratedValue(generator = "auto-generator")
    @GenericGenerator(name = "auto-generator", parameters = @org.hibernate.annotations.Parameter(name = "prefix", value = "IVD"), strategy = "fa.youareright.utils.AutoGeneration")
    @Column(name = "invoice_detail_id", columnDefinition = "varchar(10)")
    private String invoiceDetailId;

    @Column(columnDefinition = "int default 0")
    private int isDelete;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "service_id")
    private HairService hairService;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "emp_id")
    private Employee employee;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    public InvoiceDetail(int isDelete, HairService hairService, Employee employee, Invoice invoice) {
        this.isDelete = isDelete;
        this.hairService = hairService;
        this.employee = employee;
        this.invoice = invoice;
    }

}
