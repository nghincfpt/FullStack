package fa.youareright.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MailInfoDTO {
	
	String from;
	String to;
	String subject;
	String body;
	String attachments;

	public MailInfoDTO(String to, String subject, String body) {
		this.from = "Yourareright";
		this.to = to;
		this.subject = subject;
		this.body = body;
	}

}
