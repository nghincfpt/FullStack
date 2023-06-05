package fa.youareright.controller.chart;

import java.util.List;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fa.youareright.model.Branch;
import fa.youareright.repository.BranchRep;
import fa.youareright.repository.BranchRepository;
import fa.youareright.repository.Chart;
import fa.youareright.repository.InvoiceRepository;
import fa.youareright.repository.Total;
import fa.youareright.repository.UserRepository;
import fa.youareright.repository.UserTotal;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin/chart")
public class ChartController {


	@Autowired
	private InvoiceRepository invoiceRepository;
	
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BranchRepository branchRepository;
	
	@GetMapping("/total")
	@RolesAllowed("ROLE_ADMIN")
	List<Total> listAll(){
		return invoiceRepository.getTotal();
	}
	
	@GetMapping("/chart")
	@RolesAllowed("ROLE_ADMIN")
	List<Chart> listAllUser(){
		return invoiceRepository.getAll();
	}
	
	
	@GetMapping("/limmit")
	@RolesAllowed("ROLE_ADMIN")
	List<Total> listAllLimit(){
		return invoiceRepository.getLimit();
	}
	
	@GetMapping("/totalUser")
	@RolesAllowed("ROLE_ADMIN")
	List<UserTotal> listAlluser(){
		return  userRepository.getCountUser();
	}
	
	@GetMapping("/branch")
	@RolesAllowed("ROLE_ADMIN")
	List<Branch> listAllbranch(){
		return  branchRepository.findAllBranch();
	}
	

	@GetMapping("/FindBychart")
	@RolesAllowed("ROLE_ADMIN")

	public ResponseEntity<List<Chart>> findByChart(
			@RequestParam(required = false,name="branch") String branch) {
    List<Chart>  listChart;
    listChart = invoiceRepository.getByChart(branch);
	return new ResponseEntity<>(listChart, HttpStatus.OK);
	}
	
	@GetMapping("/checkDay")
	@RolesAllowed("ROLE_ADMIN")
	public ResponseEntity<List<Chart>> findByChartDay(
			@RequestParam(name = "sd" ,required = false) String startDay,
			@RequestParam(name = "ed" ,required = false) String endDay) {
    List<Chart>  listChart;
    listChart = invoiceRepository.getByDay(startDay,endDay);
	return new ResponseEntity<>(listChart, HttpStatus.OK);
	}

}
