/* eslint-disable no-shadow */
const state = () => ({
  events: [],
  karine: true,
});

const getters = {
  getEvents: (state) => state.events,
};
const mutations = {
  addEvent(state, event) {
    state.events.push(event);
  },
};
const actions = {
  addEvent({ commit }, event) {
    commit('addEvent', event);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
