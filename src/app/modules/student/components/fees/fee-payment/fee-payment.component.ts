import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs';
import { feesService } from 'src/app/modules/student/service/fees.service';

@Component({
  selector: 'app-fee-payment',
  templateUrl: './fee-payment.component.html',
  styleUrls: ['./fee-payment.component.css']
})
export class FeePaymentComponent {
  totalAmount: number = 0;
  handler: any = null;
  constructor(
    public dialogRef: MatDialogRef<FeePaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _feeService:feesService,
    private stripeService: StripeService

  ) { }
  ngOnInit() {
    this.totalAmount = this.data.feeArray.map((str: string) => parseInt(str, 10)).reduce((acc:number, num:number) => acc + num, 0);
  }
  onStripe() {
      const userId = localStorage.getItem('userId')
      this._feeService.createCheckout(this.totalAmount,userId,this.data.feeYear)
        .pipe(
          switchMap(session => {
            //@ts-ignore
            return this.stripeService.redirectToCheckout({ sessionId: session.id })
          })
        )
        .subscribe(result => {
          console.log(result)
          if (result.error) {
            alert(result.error.message);
          }
        });
    }
  }
