package fa.youareright.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountDto {
    private String accountId;
    private String userName;
    private String password;
    private UserDto userDto;
//    private List<AccountRole> accountRoleList;
}
