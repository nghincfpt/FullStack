package fa.youareright.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeAccountDTO {
    private String userId;
    private Integer accountId;
    private String employeeId;
    private String branchId;
    private String name;
    private int isDelete;
    private String type;
    private String username;
    private String password;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String address;
    private String gender;
    private String avatar;
    private LocalDate dateOfBirth;
    private String status;
}
