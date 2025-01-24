import { AppRoutes } from '../../const.ts';
import MainPage from '../../pages/main/main.tsx';
import Error from '../../pages/error/error.tsx';
import Favorites from '../../pages/favorites/favorites.tsx';
import Login from '../../pages/login/login.tsx';
import Offer from '../../pages/offer/offer.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route.tsx';
import { HelmetProvider } from 'react-helmet-async';
import { Place, ReviewItemType } from '../../types.ts';
import { useAppSelector } from '../../store/hooks';
import { Preloader } from '../preloader/preloader.tsx';
import { useAppDispatch } from '../../store/hooks';
import { useEffect } from 'react';
import { fetchOffersAction } from '../../api/actions.ts';
import { selectLoading, selectError } from '../../store/slices/loading.ts';
import ServerError from '../../pages/error/server-error.tsx';
import { checkAuthorisation } from '../../api/auth.ts';
import { selectAuthorisationStatus } from '../../store/slices/auth.ts';

type AppProps = {
  places: Place[];
  reviews: ReviewItemType[];
}

export default function App({ places, reviews }: AppProps): JSX.Element {
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const authStatus = useAppSelector(selectAuthorisationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(checkAuthorisation());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <ServerError />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.Main} element={<MainPage />} />
          <Route path={AppRoutes.Login} element={<Login />} />
          <Route
            path={AppRoutes.Favourites}
            element={
              <PrivateRoute authStatus={authStatus}>
                <Favorites places={places} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoutes.Offer} element={<Offer places={places} reviews={reviews} />} />
          <Route path={AppRoutes.Error} element={<Error />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
