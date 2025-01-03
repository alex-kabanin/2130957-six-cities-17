import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LOCATIONS, DEFAULT_CITY } from '../../const';
import { CityName } from '../../types';
import { changeCity } from '../../store/reducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import LocationItem from './location-item';

export default function LocationList(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.offers.city);
  const [searchParams, setSearchParams] = useSearchParams();

  const locations: CityName[] = Object.values(LOCATIONS) as CityName[];

  useEffect(() => {
    const cityFromURL = searchParams.get('city') as CityName;

    if (cityFromURL && locations.includes(cityFromURL)) {
      dispatch(changeCity(cityFromURL));
    } else {
      dispatch(changeCity(DEFAULT_CITY));
    }
  }, [searchParams, dispatch, locations]);

  const handleCityChange = (city: CityName) => {
    setSearchParams({ city });
    dispatch(changeCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {locations.map((city) => (
        <LocationItem
          key={city}
          city={city}
          isActive={city === activeCity}
          onClick={() => handleCityChange(city)}
        />
      ))}
    </ul>
  );
}
