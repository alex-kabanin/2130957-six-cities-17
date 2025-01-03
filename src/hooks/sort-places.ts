import { Place } from '../types';
import { SortOptionName } from '../types';

type SortPlacesProps = {
  filteredPlaces: Place[];
  sortOption: SortOptionName;
}

export default function sortPlaces({ filteredPlaces, sortOption }: SortPlacesProps):Place[] {
  return [...filteredPlaces].sort((a, b) => {
    switch (sortOption) {
      case 'PriceLowHigh':
        return a.price - b.price;
      case 'PriceHighLow':
        return b.price - a.price;
      case 'TopRated':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
}
