import Vue from 'vue';

/* eslint-disable no-shadow */
const state = () => ({
  events: [],
  clicked: '',
});

const getters = {
  getEvents: (state) => state.events,
  getClicked: (state) => state.clicked,
  getDayEvents: (state) => state.events.filter((event) => event.date === state.clicked),
};
const mutations = {
  addEvent(state, event) {
    const eventToSave = { ...event, date: state.clicked, id: Math.random().toString() };
    state.events.push(eventToSave);
  },
  updateEvent(state, event) {
    const eventIndex = state.events.findIndex(((obj) => obj.id === event.id));
    if (eventIndex < 0) return;
    const eventToUpdate = { ...event, date: state.clicked };

    Vue.set(state.events, eventIndex, eventToUpdate);
  },
  setClicked(state, date) {
    state.clicked = date;
  },
  setEventIdToUpdate(state, id) {
    state.eventToUpdate = id;
  },
};
const actions = {
  addEvent({ commit }, event) {
    if (event.id) {
      commit('updateEvent', event);
    } else {
      commit('addEvent', event);
    }
  },
  setClicked({ commit }, day) {
    if (!day.padding) {
      commit('setClicked', day.date);
    }
  },
  setEventIdToUpdate({ commit }, event) {
    commit('setEventIdToUpdate', event.id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
