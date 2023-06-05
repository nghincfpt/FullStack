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
public class UserDto {
    private String userId;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String address;
    private String gender;
    private String avatar;
    private LocalDate dateOfBirth;
    private String status;
    private AccountDto accountDto;
}
