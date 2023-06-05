package fa.youareright.repository;

import fa.youareright.model.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import fa.youareright.model.Invoice;
import fa.youareright.model.User;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice,String> {
	
	
	@Query(value = "SELECT SUM(total) AS total FROM invoice  where status = '1' ",nativeQuery =true)
	List<Total> getTotal();
	// chart
	
	@Query(value="select sum(total) as quantity, month(invoice_time) as month from invoice group by month(invoice_time) order by month asc" ,nativeQuery = true)
	List<Chart> getAll();
	
	
	@Query(value = "select   full_name,sum(total) as 'total' ,invoice.user_id from user \r\n"
			+ "inner join invoice  on user.user_id = invoice.user_id \r\n"
			+ " where  total  group by full_name,invoice.user_id  order by total desc limit 5 " ,nativeQuery = true)
	List<Total>getLimit();
	
	
	@Query(value= "select sum( total)as quantity, month(invoice_time) as month ,"
			+ " branch.branch_id from invoice  inner join booking  on invoice.booking_id = "
			+ "booking.booking_id inner join branch  on booking.branch_id = branch.branch_id "
			+ "where branch.branch_id = ?1 group by month(invoice_time) order by month asc",nativeQuery = true)	
	List<Chart> getByChart( String branch);
	
	
	@Query(value="select sum(total) as quantity, month(invoice_time) as month "
			+ "from invoice "
			+ "where month(invoice_time) <= :endDate and month(invoice_time) >= :startDay "
			+ "group by month(invoice_time) "
			+ "order by month asc " ,nativeQuery = true)
	List<Chart> getByDay(@Param("startDay")String startDay,@Param("endDate") String endDate);
			    

	Page<Invoice> findAll(Specification<Invoice> spec, Pageable page);

	@Query(value="select inv from Invoice inv where inv.booking.bookingId = :bookigId")
	List<Invoice> checkExistInvoice(@Param("bookigId") String bookigId);

	@Query(value = "SELECT inv.invoiceId FROM Invoice inv WHERE inv.booking.bookingId = :bookingId")
	String findInvoiceIdByBookingId(@Param("bookingId") String bookingId);

	@Modifying
	@Query(value="update Invoice c set c.isDelete = 1 where c.invoiceId = :invoiceId")
	int deleteInvoice(@Param("invoiceId") String invoiceId );

	@Query(value = "SELECT inv FROM Invoice inv WHERE inv.booking.bookingId = :bookingId")
	List<Invoice> getInvoicesByBookingId(@Param("bookingId") String bookingId);

	@Modifying
	@Transactional
	@Query(value="update Invoice c set c.status = '1' where c.booking.bookingId = :bookingId")
	int thanhToanInvoice(@Param("bookingId") String bookingId );
	
	@Query(value ="select i from Invoice i where i.booking.user.userId = :id and i.isDelete = 0")
	Page<Invoice> getListInvoiceByCustomer(@Param("id") String id, Pageable page);
	

}
