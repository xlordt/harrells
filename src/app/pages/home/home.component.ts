import {Component, OnInit} from '@angular/core';
import {WeatherApiService} from '../../include/services/weatherApi.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  // Holds data returned from API
  public accuData: object;

  // Reactive form group.
  public myForm: FormGroup;

  constructor(private accuApi: WeatherApiService, private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      searchInput: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5)]]
    });
  }

  // Search daily forecast based on location key
  public postalCodeSearch() {
    this.accuApi.postalCodeSearch(this.myForm.value.searchInput).subscribe(data => {
      if (data[0] && data[0].Key) {
        this.getDailyForeCast(data[0].Key);
      }
    });
  }

  // Get our daily forecast
  private getDailyForeCast(key: string) {
    this.accuApi.dailyForecasts(key).subscribe(data => {
      this.accuData = data;
    });
  }

}
