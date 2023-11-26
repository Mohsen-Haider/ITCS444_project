import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  regForm!: FormGroup;
  loginForm!: FormGroup;

  public isSignUp: boolean = false;

  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authService: AuthenticationService, public router : Router, private toastController: ToastController) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validators: this.matchValidator('password', 'confirmPassword')
      },);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]]
    })
  }

  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = { confirmedValidator: 'Passwords do not match.' };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    }
  }

  // get errorControl() {
  //   return this.regForm.controls;
  // }


  async createAccount() {
    console.log(this.isSignUp);
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.regForm?.valid) {
      const user = await this.authService.createAccount(this.regForm.value.email, this.regForm.value.password).catch((error) => {
        console.log(error);
        loading.dismiss();
      });

      if (user) {
        loading.dismiss();
        await this.authService.createUserDetails(this.regForm.value.email, user.user.uid);
        this.router.navigate(['/tabs']);
      }
      else {
        console.log('Please provide correct values');
        loading.dismiss();
      }
    }
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    // console.log(this.email + this.password);
    if (this.loginForm.valid) {

      //  await  loading.dismiss();
      const user = await this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password).catch((err) => {
        this.presentToast(err)
        console.log(err);
        loading.dismiss();
      })

      if (user) {
        console.log(user.user.uid);
        // console.log(this.authService.getProfile());
        loading.dismiss();
        this.router.navigate(['/tabs'])
      }
    } else {
      loading.dismiss();
      return console.log('Please provide all the required values');
    }
  }

  async presentToast(message: undefined) {
    console.log(message);

    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

}
