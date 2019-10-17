// Country Wiki App
class CountryWiki {
  constructor() {
    this.apiKey = '';
    this.apiKey2 = '';
    this.formInput = document.querySelector('.form__input');
    this.searchButton = document.querySelector('.btn');
    this.resultsContainer = document.querySelector('.results');
    this.img = document.querySelector('img');
  }

  // Grab country data from search value
  async getCountryData() {
    let searchValue = this.formInput.value.trim();
    let response;

    if (searchValue !== '') {
      const data = await fetch(
        `https://api.opencagedata.com/geocode/v1/geojson?q=${searchValue}&key=${this.apiKey}`
      );
      response = await data.json();
    }
    return response;
  }

  // Grab second country data
  async getCountryData2() {
    let searchValue = this.formInput.value;
    let response;

    if (searchValue !== '') {
      const data = await fetch(
        `https://restcountries-v1.p.rapidapi.com/name/${searchValue}`,
        {
          headers: {
            'x-rapidapi-host': 'restcountries-v1.p.rapidapi.com',
            'x-rapidapi-key': `${this.apiKey2}`,
          },
        }
      );
      response = await data.json();
    }
    return response;
  }
}

// Instantiate the country wiki object
const country = new CountryWiki();

// Hide result from the start
country.resultsContainer.style.display = 'none';
country.img.style.display = 'none';

country.searchButton.addEventListener('click', function() {
  country.img.style.display = 'block';
  country.resultsContainer.style.display = 'none';
  setTimeout(function() {
    country.img.style.display = 'none';
    country.resultsContainer.style.display = 'block';
  }, 4000);

  const result = country.getCountryData();

  // Grab country data from second API
  // country.getCountryData2().then(response => console.log(response["0"])).catch(err => console.log(`An error occurred: ${err}`));

  let countryData;

  result
    .then(data => {
      if (data.status.code === 200 && data.status.message === 'OK') {
        countryData = data.features[0];
      }

      const returnedData = {
        latitude: countryData.geometry.coordinates[0],
        longitude: countryData.geometry.coordinates[1],
        callingCode: countryData.properties.annotations.callingcode,
        countryCodeA: countryData.properties.components['ISO_3166-1_alpha-2'],
        countryCodeB: countryData.properties.components['ISO_3166-1_alpha-3'],
        ISONumeric: countryData.properties.annotations.currency.iso_numeric,
        ISOCode: countryData.properties.annotations.currency.iso_code,
        currencyName: countryData.properties.annotations.currency.name,
        smallestDenomination:
          countryData.properties.annotations.currency.smallest_denomination,
        currencySubUnit: countryData.properties.annotations.currency.subunit,
        currencyAlternateSymbols:
          countryData.properties.annotations.currency.alternate_symbols,
        currencySubUnitToUnit:
          countryData.properties.annotations.currency.subunit_to_unit,
        currencySymbol: countryData.properties.annotations.currency.symbol,
        isSymbolFirst:
          countryData.properties.annotations.currency.symbol_first === 1
            ? 'YES'
            : 'NO',
        thousandsSeparator:
          countryData.properties.annotations.currency.thousands_separator,
        flag: countryData.properties.annotations.flag,
        qibla: countryData.properties.annotations.qibla,
        roadDriveOn: countryData.properties.annotations.roadinfo.drive_on,
        speedMeasurement: countryData.properties.annotations.roadinfo.speed_in,
        sunRise: countryData.properties.annotations.sun.rise.apparent,
        sunSet: countryData.properties.annotations.sun.set.apparent,
        timeZone: countryData.properties.annotations.timezone.name,
        offsetString: countryData.properties.annotations.timezone.offset_string,
        offsetSeconds: countryData.properties.annotations.timezone.offset_sec,
        shortTimeZone: countryData.properties.annotations.timezone.short_name,
        continent: countryData.properties.components.continent,
        country: countryData.properties.components.country,
      };

      // Get DOM Classes
      const DOMStrings = {
        geolocationValue: document.getElementById('geolocation_value'),
        countryName: document.getElementById('country_name'),
        continent: document.getElementById('continent'),
        callingCode: document.getElementById('calling_code'),
        countryCode: document.getElementById('country_code'),
        isoCode: document.getElementById('iso_code'),
        isoNumeric: document.getElementById('iso_numeric'),
        alternateCurrencySymbol: document.getElementById(
          'currency_alternate_symbols'
        ),
        currencyName: document.getElementById('currency_name'),
        currencySubunit: document.getElementById('currency_subunit'),
        currencySubUnitToUnit: document.getElementById(
          'currency_subunit_to_unit'
        ),
        currencySymbol: document.getElementById('currency_symbol'),
        flag: document.getElementById('flag'),
        isSymbolFirst: document.getElementById('is_symbol_first'),
        offsetSeconds: document.getElementById('offset_seconds'),
        offsetString: document.getElementById('offset_string'),
        qibla: document.getElementById('qibla'),
        roadDriveOn: document.getElementById('road_drive_on'),
        smallestDenomination: document.getElementById('smallest_denomination'),
        speedMeasurement: document.getElementById('speed_measurement'),
        sunRise: document.getElementById('sun_rise'),
        sunSet: document.getElementById('sun_set'),
        thousandsSeparator: document.getElementById('thousand_separator'),
        timeZone: document.getElementById('timezone'),
        shortTimeZone: document.getElementById('short_time_zone'),
      };

      // Insert Returned data into the DOM
      DOMStrings.geolocationValue.textContent = `Latitude -> ${returnedData.latitude}, Longitude -> ${returnedData.longitude}`;
      DOMStrings.continent.textContent = returnedData.continent;
      DOMStrings.callingCode.textContent = returnedData.callingCode;
      DOMStrings.countryCode.textContent = `${returnedData.countryCodeA} OR ${returnedData.countryCodeB}`;
      DOMStrings.isoCode.textContent = returnedData.ISOCode;
      DOMStrings.isoNumeric.textContent = returnedData.ISONumeric;
      DOMStrings.alternateCurrencySymbol.textContent = `${returnedData.currencyAlternateSymbols.join(', ')}`;
      DOMStrings.currencyName.textContent = returnedData.currencyName;
      DOMStrings.currencySubunit.textContent = returnedData.currencySubUnit;
      DOMStrings.currencySubUnitToUnit.textContent =
        returnedData.currencySubUnitToUnit;
      DOMStrings.currencySymbol.textContent = returnedData.currencySymbol;
      DOMStrings.flag.textContent = returnedData.flag;
      DOMStrings.shortTimeZone.textContent = returnedData.shortTimeZone;
      DOMStrings.isSymbolFirst.textContent = returnedData.isSymbolFirst;
      DOMStrings.offsetSeconds.textContent = returnedData.offsetSeconds;
      DOMStrings.offsetString.textContent = returnedData.offsetString;
      DOMStrings.qibla.textContent = returnedData.qibla;
      DOMStrings.roadDriveOn.textContent = returnedData.roadDriveOn;
      DOMStrings.smallestDenomination.textContent =
        returnedData.smallestDenomination;
      DOMStrings.speedMeasurement.textContent = returnedData.speedMeasurement;
      DOMStrings.sunRise.textContent = returnedData.sunRise;
      DOMStrings.sunSet.textContent = returnedData.sunSet;
      DOMStrings.thousandsSeparator.textContent =
        returnedData.thousandsSeparator;
      DOMStrings.timeZone.textContent = returnedData.timeZone;
    })
    .catch(err => console.log(err));

  // THE SECOND COUNTRY DATA
  let result2, countryData2;

  result2 = country.getCountryData2();

  result2
    .then(data => {
      if (data) {
        countryData2 = data['0'];
      }

      // Save data returned into an object
      const returnedData2 = {
        countryName: countryData2.name,
        alternateSpellings: countryData2.altSpellings.join(', '),
        areaCode: countryData2.area,
        capital: countryData2.capital,
        demonym: countryData2.demonym,
        gini: countryData2.gini,
        languagesSpoken: countryData2.languages.join(', '),
        borders: countryData2.borders.join(', '),
        nativeName: countryData2.nativeName,
        totalPopulation: countryData2.population,
        region: countryData2.region,
        relevance: countryData2.relevance,
        subRegion: countryData2.subregion,
        timezones2: countryData2.timezones.join(', '),
        topLevelDomains: countryData2.topLevelDomain.join(', '),
      };

      const DOMStrings2 = {
        countryResultHeading: document.getElementById('country_result'),
        countryName: document.getElementById('country_name'),
        alternateSpellings: document.getElementById('alternate_spellings'),
        areaCode: document.getElementById('area_code'),
        capital: document.getElementById('capital'),
        demonym: document.getElementById('demonym'),
        gini: document.getElementById('gini'),
        languagesSpoken: document.getElementById('languages_spoken'),
        borders: document.getElementById('borders'),
        nativeName: document.getElementById('native_names'),
        totalPopulation: document.getElementById('total_population'),
        region: document.getElementById('region'),
        relevance: document.getElementById('relevance'),
        subRegion: document.getElementById('subregion'),
        timezones2: document.getElementById('timezones'),
        topLevelDomains: document.getElementById('top_level_domains'),
      };

      // Insert Returned Data into the DOM
      DOMStrings2.alternateSpellings.textContent =
        returnedData2.alternateSpellings;
      DOMStrings2.areaCode.textContent = returnedData2.areaCode;
      DOMStrings2.countryResultHeading.textContent = returnedData2.countryName;
      DOMStrings2.countryName.textContent = returnedData2.countryName;
      DOMStrings2.capital.textContent = returnedData2.capital;
      DOMStrings2.demonym.textContent = returnedData2.demonym;
      DOMStrings2.gini.textContent = returnedData2.gini;
      DOMStrings2.languagesSpoken.textContent = returnedData2.languagesSpoken;
      DOMStrings2.borders.textContent = returnedData2.borders;
      DOMStrings2.nativeName.textContent = returnedData2.nativeName;
      DOMStrings2.nativeName.textContent = returnedData2.nativeName;
      DOMStrings2.totalPopulation.textContent = returnedData2.totalPopulation;
      DOMStrings2.region.textContent = returnedData2.region;
      DOMStrings2.relevance.textContent = returnedData2.relevance;
      DOMStrings2.subRegion.textContent = returnedData2.subRegion;
      DOMStrings2.timezones2.textContent = returnedData2.timezones2;
      DOMStrings2.topLevelDomains.textContent = returnedData2.topLevelDomains;
    })
    .catch(err => console.log(`An error occurred: ${err}`));
});
