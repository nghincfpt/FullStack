package fa.youareright.service;

import java.io.IOException;

import javax.mail.MessagingException;

import org.springframework.stereotype.Service;

import fa.youareright.dto.MailInfoDTO;


@Service
public interface SendMailService {
	void run();

	void queue(String to, String subject, String body);

	void queue(MailInfoDTO mail);

	void send(MailInfoDTO mail) throws MessagingException, IOException;
}
