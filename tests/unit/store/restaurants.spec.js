import Vuex from 'vuex';
import {createLocalVue} from '@vue/test-utils';
import restaurants from '@/store/restaurants';

describe('restaurants', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const records = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];

  describe('when loading succeeds', () => {
    let store;

    beforeEach(() => {
      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };
      store = new Vuex.Store({
        modules: {
          restaurants: restaurants(api),
        },
      });
      return store.dispatch('restaurants/load');
    });

    it('stores the restaurants', async () => {
      expect(store.state.restaurants.records).toEqual(records);
    });

    it('clears the loading flag', () => {
      expect(store.state.restaurants.loading).toEqual(false);
    });
  });

  describe('while loading', () => {
    let store;

    beforeEach(() => {
      const api = {
        loadRestaurants: () => new Promise(() => {
        }),
      };
      store = new Vuex.Store({
        modules: {
          restaurants: restaurants(api),
        },
      });
      store.dispatch('restaurants/load');
    });

    it('sets a loading flag', () => {
      expect(store.state.restaurants.loading).toEqual(true);
    });
  });

  describe('initially', () => {
    let store;

    beforeEach(() => {
      store = new Vuex.Store({
        modules: {
          restaurants: restaurants(),
        },
      });
    });
    it('does not have the loading flag set', () => {
      expect(store.state.restaurants.loading).toEqual(false);
    });

    it('does not have the error flag set', () => {
      expect(store.state.restaurants.loadError).toEqual(false);
    });
  });

  describe('when loading fails', () => {
    let store;

    beforeEach(() => {
      const api = {
        loadRestaurants: () => Promise.reject(),
      };
      store = new Vuex.Store({
        modules: {
          restaurants: restaurants(api),
        },
      });

      return store.dispatch('restaurants/load');
    });

    it('sets an error flag', () => {
      expect(store.state.restaurants.loadError).toEqual(true);
    });
  });
});
