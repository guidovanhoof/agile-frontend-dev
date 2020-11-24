const restaurants = api => ({
  namespaced: true,
  state: {
    records: [],
    loading: false,
    loadError: false,
  },
  actions: {
    load({commit}) {
      console.log('load()');
      commit('startLoading');
      api.loadRestaurants()
        .then(records => {
          commit('storeRecords', records);
        })
        .catch(() => {
          commit('loadingError');
        });
    },
  },
  mutations: {
    startLoading(state) {
      console.log('startLoading()');
      state.loading = true;
    },
    loadingError(state) {
      console.log('loadingError()');
      state.loadError = true;
    },
    storeRecords(state, records) {
      console.log('storeRecords()');
      state.records = records;
      state.loading = false;
    },
  },
});

export default restaurants;
