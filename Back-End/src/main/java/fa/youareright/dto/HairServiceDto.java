package fa.youareright.dto;

import fa.youareright.model.Media;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HairServiceDto {
//    @NotBlank(message = "Vui lòng không để trống")
    private String serviceId;
    @NotBlank(message = "Vui lòng không để trống")
    private String name;
    @NotNull(message = "Vui lòng không để trống")
    @Min(value = 1, message = "Vui lòng nhập số dương")
    private Float price;
    @NotBlank(message = "Vui lòng không để trống")
    private String description;
    @NotBlank(message = "Vui lòng không để trống")
    private String type;
    private int isDelete;
    private List<String> media;

}
