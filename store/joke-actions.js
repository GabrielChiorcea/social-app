import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { jokeActions } from './jocke-slice';
import { useSelector } from 'react-redux';

export const FetchDataBase = (url) => {
  return async (dispatch) => {
    const FetchData = async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('soemting went wrong');
      }
      const responseData = await response.json();
      return responseData;
    };
    try {
      const data = await FetchData();

      const jokesArray = [];

      for (const key in data) {
        jokesArray.push({
          id: key,
          idUser: data[key].id,
          name: data[key].name,
          photoURL: data[key].photoURL,
          text: data[key].text,
          vote: data[key].vote,
        });
      }
      if (url === process.env.REACT_APP_URL_BANC ) {
        dispatch(jokeActions.addJokes(jokesArray));
      }
      if (url === process.env.REACT_APP_URL_MAJOR) {
        dispatch(jokeActions.addBanc(jokesArray));
      }
    } catch (err) {
      if (url === process.env.REACT_APP_URL_BANC)
        dispatch(
          jokeActions.setError({
            errorMainArr: !!err,
            errorMajorArr: false,
            formError: false,
          })
        );

      if (url === process.env.REACT_APP_URL_MAJOR) {
        dispatch(
          jokeActions.setError({
            errorMainArr: false,
            errorMajorArr: !err,
            formError: false,
          })
        );
      }
    }
  };
};

export const SetTopTen = () => {
  const dispatch = useDispatch();
  const topTen = useSelector((state) => state.jo.jokes);

  const setTopArr = useCallback(() => {
    dispatch(jokeActions.setTop([...topTen]));
  }, [dispatch, topTen]);

  useEffect(() => {
    setTopArr();
  }, [setTopArr]);
};
