import Vuex from 'vuex';
import {mount, createLocalVue} from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList';

describe('RestaurantList', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  it('loads restaurants on mount', () => {
    const restaurantsModule = {
      namespaced: true,
      actions: {
        load: jest.fn().mockName('load'),
      },
    };
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });

    mount(RestaurantList, {localVue, store});

    expect(restaurantsModule.actions.load).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    const records = [
      {id: 1, name: 'Sushi Place'},
      {id: 2, name: 'Pizza Place'},
    ];

    const restaurantsModule = {
      namespaced: true,
      state: {records},
      actions: {
        load: jest.fn().mockName('load'),
      },
    };
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });

    const component = mount(RestaurantList, {localVue, store});

    const firstRestaurantName = component
      .findAll('[data-testid="restaurant"]')
      .at(0)
      .text();
    expect(firstRestaurantName).toBe('Sushi Place');

    const secondRestaurantName = component
      .findAll('[data-testid="restaurant"]')
      .at(1)
      .text();
    expect(secondRestaurantName).toBe('Pizza Place');
  });
});
