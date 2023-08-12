import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeePaymentComponent } from './fee-payment/fee-payment.component';
import { feesService } from '../../service/fees.service';
import { studentService } from '../../service/student.service';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent {
  feeDetails:any[] = [];
  userDetails!:any;
  constructor(
    private _feesService: feesService,
    private _studentService: studentService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    let userId: string | null = localStorage.getItem('userId')
    this._studentService.getUserDetails(userId).subscribe((res: any) => {
      this.userDetails = res
      if (res.department) {
        this.feeDetails = res.department.fees;
      }
    })
  }

  onPay(feeArray:any,feeYear:any){
    const dialogRef = this.dialog.open(FeePaymentComponent, {
      data: { feeArray,feeYear},
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }
  isFeePaid(year: any): boolean {
    let feePaid = this.userDetails.feePayments.filter((payment:any)=>payment.year == Number(year))
    console.log(feePaid)
    if(feePaid.length){
      return true
    }else{
      return false
    }
  }
}
