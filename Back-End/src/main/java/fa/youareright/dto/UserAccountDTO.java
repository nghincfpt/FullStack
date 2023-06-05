package fa.youareright.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserAccountDTO {

	private String userId;

	private Integer accountId;

	private String fullName;

	private String email;

	private String username;

	private String password;

	private String phoneNumber;

	private String gender;

	private String status;

	private String avatar;

	private String address;

	private LocalDate dateOfBirth;

}
