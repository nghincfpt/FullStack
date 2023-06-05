package fa.youareright.repository;

import fa.youareright.model.InvoiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InvoiceDetailRepository  extends JpaRepository<InvoiceDetail,String> {

    @Modifying
    @Query(value = "DELETE FROM InvoiceDetail invDetail WHERE invDetail.invoice.invoiceId = :invoiceId")
    void deleteByInvoiceId(@Param("invoiceId") String invoiceId);

}
