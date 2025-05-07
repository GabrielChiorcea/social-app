import { createSlice } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';

const jokeSlice = createSlice({
  name: 'joke',
  initialState: {
    jokes: [],
    newJoke: [],
    topTen: [],
    banc: [],
    wellcomeState: 'empty',
    writtenJoke: false,
    existUser: false,
    cookieConsent: false,
    deleteAccount: false,
    error: {
      errorMainArr: false,
      errorMajorArr: false,
      formError: false,
      registration: false,
    },
  },
  reducers: {
    welcome(state, action) {
      state.wellcomeState = action.payload;
    },
    deleteAccount(state, action) {
      state.deleteAccount = action.payload;
    },
    cookieConsent(state, action) {
      state.cookieConsent = action.payload;
    },
    checkUser(state, action) {
      state.existUser = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setBoolean(state, action) {
      state.writtenJoke = action.payload;
    },
    addJokes(state, action) {
      const jokes = action.payload;
      const shuffled = [...jokes].sort(() => Math.random() - 0.5);
      state.jokes = shuffled;
    },
    addNewJoke(state, action) {
      const joke = action.payload;

      state.newJoke.push(joke);
    },
    addBanc(state, action) {
      const jokes = action.payload;
      const shuffled = [...jokes].sort(() => Math.random() - 0.5);
      state.banc = shuffled;
    },
    upDateOldJokes(state, action) {
      let arr;
      if (action.payload.comeFrom === 'AllJokes') {
        arr = current(state.jokes);
      } else if (action.payload.comeFrom === 'Banc') {
        arr = current(state.banc);
      }

      const findJoke = arr.find((el) => el.id === action.payload.id);
      const newJoke = { ...findJoke, vote: action.payload.vote };
      const findJokeIndex = arr.findIndex((el) => el.id === action.payload.id);

      switch (action.payload.comeFrom) {
        case 'AllJokes':
          state.jokes[findJokeIndex] = newJoke;
          break;
        case 'Banc':
          state.banc[findJokeIndex] = newJoke;
          break;
        default:
          state.jokes[findJokeIndex] = newJoke;
          break;
      }
    },
    setTop(state, action) {
      const oldJokes = action.payload;
      const sortJokes = oldJokes.sort((a, b) => {
        return b.vote - a.vote;
      });
      const sliceJokes = sortJokes.slice(0, 10);
      state.topTen = sliceJokes;
    },
  },
});

export const jokeActions = jokeSlice.actions;

export default jokeSlice;
