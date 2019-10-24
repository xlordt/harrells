import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class WeatherApiService {

  // Endpoint to access AccuWeather.
  private endpoint = 'https://dataservice.accuweather.com';

  // Weather service apikey - key will be removed, please with your own.
  private apiKey = 'eumva2hriurffm6T9U3ivQVxKtJhp8ep';

  // @param httpClient
  constructor(private httpClient: HttpClient) {
  }

  // Get data from endpoint based on Postal Code.
  public postalCodeSearch(postalCode: number) {
      return this.httpClient.get(this.endpoint + '/locations/v1/postalcodes/search?', {
          params: { apikey: this.apiKey, q: postalCode.toString()}
      });
  }

  // Returns daily forecast data for a specific location
  public dailyForecasts(locationKey: string) {
    return this.httpClient.get(this.endpoint + '/forecasts/v1/daily/1day/' + locationKey, {
      params: { apikey: this.apiKey, language: 'en-us'}
    });
  }
}
