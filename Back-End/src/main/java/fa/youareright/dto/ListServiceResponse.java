package fa.youareright.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ListServiceResponse {
    private String serviceName;
    private String employeeName;
    private double price;
}
