import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import {mount, createLocalVue} from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList';

const findByTestId = (wrapper, testId, index) =>
  wrapper.findAll(`[data-testid="${testId}"]`).at(index);

describe('RestaurantList', () => {
  Vue.use(Vuetify);

  const records = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];

  const localVue = createLocalVue();
  localVue.use(Vuex);

  let restaurantsModule;
  let component;

  const mountWithStore = (state = {records, loading: false}) => {
    restaurantsModule = {
      namespaced: true,
      state,
      actions: {
        load: jest.fn().mockName('load'),
      },
    };
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });

    component = mount(RestaurantList, {localVue, store});
  };

  describe('when loading succeeds', () => {
    beforeEach(() => {
      mountWithStore();
    });

    it('displays the restaurants', () => {
      expect(findByTestId(component, 'restaurant', 0).text()).toBe('Sushi Place');
      expect(findByTestId(component, 'restaurant', 1).text()).toBe('Pizza Place');
    });

    it('does not display the loading indicator while not loading', () => {
      expect(component.find('[data-testid="loading-indicator"]').exists()).toBe(false);
    });

    it('does not display the error message', () => {
      expect(component.find('[data-testid="loading-error"]').exists()).toBe(false);
    });
  });

  it('loads restaurants on mount', () => {
    mountWithStore();
    expect(restaurantsModule.actions.load).toHaveBeenCalled();
  });

  it('displays the loading indicator while loading', () => {
    mountWithStore({loading: true});
    expect(component.find('[data-testid="loading-indicator"]').exists()).toBe(true);
  });

  describe('when loading fails', () => {
    it('displays the error message', () => {
      mountWithStore({loadError: true});
      expect(component.find('[data-testid="loading-error"]').exists()).toBe(true);
    });

    it('does not display the error message', () => {
      mountWithStore({loadError: false});
      expect(component.find('[data-testid="loading-error"]').exists()).toBe(false);
    });
  });
});
