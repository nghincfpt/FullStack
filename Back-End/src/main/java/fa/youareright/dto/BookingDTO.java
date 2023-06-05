package fa.youareright.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class BookingDTO {
    private String bookingDate;
    private int isDelete;
    private String userId;
    private String note;
    private String workTimeId;
    private List<String> serviceList;
    private String styleId;
    private String skinnerId;
    private String customerName;
    private String branch;
}
