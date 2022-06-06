/* eslint-disable no-shadow */
const state = () => ({
  events: [],
  karine: true,
  clicked: '',
});

const getters = {
  getEvents: (state) => state.events,
  getClicked: (state) => state.clicked,
};
const mutations = {
  addEvent(state, event) {
    const eventObj = Object.assign(event, { date: state.clicked });
    state.events.push(eventObj);
  },
  setClicked(state, date) {
    state.clicked = date;
  },
};
const actions = {
  addEvent({ commit }, event) {
    commit('addEvent', event);
  },
  setClicked({ commit }, day) {
    if (!day.padding) {
      commit('setClicked', day.date);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
