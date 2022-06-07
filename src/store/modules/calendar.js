import Vue from 'vue';
import getWeather from '@/services/weather';
/* eslint-disable no-shadow */
const state = () => ({
  events: [],
  clicked: {},
});

const getters = {
  getEvents: (state) => state.events,
  getClicked: (state) => state.clicked.date,
  getDayEvents: (state) => state.events.filter((event) => event.date === state.clicked.date),
};
const mutations = {
  addEvent(state, event) {
    const eventToSave = { ...event, date: state.clicked.date, id: Math.random().toString() };
    state.events.push(eventToSave);
  },
  updateEvent(state, event) {
    const eventIndex = state.events.findIndex(((obj) => obj.id === event.id));
    if (eventIndex < 0) return;
    const eventToUpdate = { ...event, date: state.clicked.date };

    Vue.set(state.events, eventIndex, eventToUpdate);
  },
  removeEvent(state, event) {
    const eventsFiltered = state.events.filter(((obj) => obj.id !== event.id));

    state.events = eventsFiltered;
  },
  removeAllEvents(state) {
    state.events = [];
  },
  setClicked(state, day) {
    state.clicked = day;
  },
  setEventIdToUpdate(state, id) {
    state.eventToUpdate = id;
  },
};
const actions = {
  async addEvent({ state, commit }, event) {
    const eventToSave = { ...event, weather: '' };

    if (state.clicked.isCurrentDay) {
      const wheather = await getWeather(event.city);
      const currentWeather = wheather?.weather[0]?.main;
      eventToSave.weather = currentWeather;
    }

    if (event.id) {
      commit('updateEvent', eventToSave);
    } else {
      commit('addEvent', eventToSave);
    }
  },
  setClicked({ commit }, day) {
    if (!day.padding) {
      commit('setClicked', day);
    }
  },
  setEventIdToUpdate({ commit }, event) {
    commit('setEventIdToUpdate', event.id);
  },
  removeEvent({ commit }, event) {
    commit('removeEvent', event);
  },
  removeAllEvents({ commit }) {
    commit('removeAllEvents');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
