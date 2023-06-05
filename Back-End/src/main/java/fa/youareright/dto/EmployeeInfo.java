package fa.youareright.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmployeeInfo {
    private String employeeId;
    private String userId;
    private String branchId;
    private String type;
    private String address;
    private LocalDate dateOfBirth;
    private String gender;
    private String avatar;
    private int isDelete;
}
