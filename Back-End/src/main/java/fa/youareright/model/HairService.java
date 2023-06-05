package fa.youareright.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HairService {
    @Id
    @GeneratedValue(generator = "auto-generator")
    @GenericGenerator(name = "auto-generator", parameters = @Parameter(name = "prefix", value = "SER"), strategy = "fa.youareright.utils.AutoGeneration")
    @Column(name = "service_id",columnDefinition = "varchar(10)")
    private String serviceId;
    private String name;
    private float price;
    @Column(name = "description", columnDefinition = "text")
    private String description;
    private String type;
    @Column(columnDefinition = "int default 0")
    private int isDelete;

    @OneToMany(mappedBy = "hairService")
    @JsonBackReference
    private List<BookingDetail> bookingDetailList;

    @OneToMany(mappedBy = "hairService")
    private List<InvoiceDetail> invoiceDetailList;

    @OneToMany(mappedBy = "hairService")
    private List<Media> media;

    public void setMedia(List<String> media) {
    }
}
