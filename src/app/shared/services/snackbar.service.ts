import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private messageQueue: { icon: SweetAlertIcon, text: string }[] = [];
  private isDisplaying = false;

  private queueChanged = new Subject<void>();

  private showNextMessage(): void {
    if (this.messageQueue.length > 0 && !this.isDisplaying) {
      this.isDisplaying = true;
      const { icon, text } = this.messageQueue.shift()!;

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          container: 'sweetalert-container' // Add your custom CSS class if needed
        }
      });

      Toast.fire({
        icon,
        title: text
      }).then(() => {
        this.isDisplaying = false;
        this.queueChanged.next();
      });
    }
  }

  showNotification(icon: SweetAlertIcon, message: string): void {
    this.messageQueue.push({ icon, text: message });
    this.queueChanged.next();
  }

  showSuccess(message: string): void {
    this.showNotification('success', message);
  }

  showError(message: string): void {
    this.showNotification('error', message);
  }

  initQueueWatcher(): void {
    this.queueChanged.subscribe(() => {
      if (!this.isDisplaying) {
        this.showNextMessage();
      }
    });
  }
}