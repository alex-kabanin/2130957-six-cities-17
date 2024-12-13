import { LOCATIONS } from './const';

export type CityName = (typeof LOCATIONS)[keyof typeof LOCATIONS];

export type LocationType = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type CityType = {
  name: CityName;
  location: LocationType;
}

export type Place = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type ReviewFormType = {
  rating: number;
  review: string;
}

export type Point = Pick<Place, 'id' | 'location'>;

