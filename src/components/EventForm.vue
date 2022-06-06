<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="title"
      :counter="30"
      :rules="titleRules"
      label="Title"
      required
    ></v-text-field>

    <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            label="Set time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          format="24hr"
          v-if="menu2"
          v-model="time"
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
    </v-menu>

    <h4>Event color</h4>
    <v-radio-group
        v-model="color"
        column
      >
      <v-radio
        label="blue"
        color="blue"
        value="blue"
      ></v-radio>
      <v-radio
        label="red"
        color="red"
        value="red"
      ></v-radio>
      <v-radio
        label="orange"
        color="orange"
        value="orange"
      ></v-radio>
    </v-radio-group>

    <v-select
      v-model="selectedCity"
      :items="cities"
      :rules="[v => !!v || 'City is required']"
      label="City"
      required
    ></v-select>

    <v-btn
      :disabled="!valid"
      color="primary"
      class="mr-4"
      @click="add"
    >
      add
    </v-btn>
    <v-btn
      color="success"
      class="mr-4"
      @click="reset"
    >
      cancel
    </v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    mode: {
      default: 'add',
    },
    update: {
      default: {},
    },
  },
  data: () => ({
    id: 0,
    color: 'blue',
    valid: true,
    title: '',
    titleRules: [
      (v) => !!v || 'Title is required',
      (v) => (v && v.length > 0 && v.length <= 30) || 'title must be less than 30 characters',
    ],
    selectedCity: null,
    cities: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    time: null,
    menu2: false,
    modal2: false,
  }),
  computed: {
    colorComputed() {
      return true;
    },
    form: {
      get() {
        return {
          id: this.id,
          title: this.title,
          time: this.time,
          color: this.color,
          city: this.selectedCity,
        };
      },
      set(value) {
        this.id = value.id;
        this.title = value.title;
        this.time = value.time;
        this.color = value.color;
        this.selectedCity = value.city;
      },
    },
  },
  watch: {
    update(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.form = this.update;
      }
    },
  },
  methods: {
    add() {
      this.$refs.form.validate();
      this.addEvent(this.form);
      this.reset();
    },
    reset() {
      this.$refs.form.reset();
    },
    ...mapActions('calendar', [
      'addEvent',
    ]),
  },
};
</script>
