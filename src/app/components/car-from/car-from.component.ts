import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {CarService} from "../../services";
import {ICar} from "../../interfaces";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

@Component({
  selector: 'app-car-from',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    JsonPipe
  ],
  templateUrl: './car-from.component.html',
  styleUrl: './car-from.component.css'
})
export class CarFromComponent implements OnInit{
  form!:FormGroup;
  carForUpdate: ICar

  constructor(private fb: FormBuilder, private carService: CarService) {
  }

ngOnInit(): void {
    this._formInit()
  this.carService.getCarForUpdate().subscribe(value => {
    this.carForUpdate = value

    if(value){
      const {brand, price, year} = value;
      this.form.patchValue({brand, price, year})
    }
  })
}

private _formInit():void{
    this.form = this.fb.group({
      brand: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Zа-яА-яёЁіІїЇєЄҐґ]{1,20}$/),
      ]],
      price:['', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.min(0),
        Validators.max(1_000_000),
      ]],
      year:['', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.min(1990),
        Validators.max(new Date().getFullYear()),
      ]]
    })
}

  save() {
    this.carService.create(this.form.getRawValue()).subscribe(()=>{
      this.carService.setTrigger()
      this.form.reset()
    })
  }

  update(){
    this.carService.updateById(this.carForUpdate.id, this.form.value).subscribe(()=>{
      this.carService.setCarForUpdate(null)
      this.carService.setTrigger()
      this.form.reset()
    })
  }

}
