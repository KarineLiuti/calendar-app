<template>
  <v-row justify="center">
    <v-dialog
      :value="isOpen"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="() => this.$emit('close')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Events</v-toolbar-title>
        </v-toolbar>
        <v-layout class="mt-10" row>
          <v-flex xs12 sm5 offset-sm1>
            <v-layout row wrap>
              <v-flex xs8 sm8>
                <h2>Events for {{getClicked}}</h2>
              </v-flex>
              <v-flex v-if="hasEvents" xs4 sm4 class="row justify-end">
                <v-btn
                  class="justify-end mt-2"
                  color="primary"
                  outlined
                  dark @click="removeAllEvents">Remove all</v-btn>
              </v-flex>
            </v-layout>

            <v-card class="mt-4" v-if="hasEvents">
              <v-list class="mt-8">
                  <template v-for="(item, index) in getDayEvents">
                    <v-list-item
                      :key="index"
                    >
                      <v-list-item-content>
                        <v-list-item-title>
                          <h5>Event at {{item.time}}</h5>
                          {{ item.title }}
                        </v-list-item-title>
                        <v-list-item-title>
                          <h5>Weather: </h5>
                          {{item.weather || 'no information'}}
                        </v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn icon>
                          <v-icon @click.stop="updateItem(item)">
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>

                      <v-list-item-action>
                        <v-btn icon>
                          <v-icon @click.stop="deleteItem(item)">
                            mdi-delete
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>

                    </v-list-item>
                    <v-divider
                      v-if="index + 1 < getDayEvents.length"
                      :key="`divider-${index}`"
                    >
                    </v-divider>
                  </template>
              </v-list>
            </v-card>
            <v-alert
              v-else
              border="top"
              colored-border
              type="info"
              elevation="2"
              class="mt-4"
            >
              You don't have any event for this day. You can create one on the right form.
            </v-alert>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1>
            <h3>Add or edit event</h3>
            <EventForm @close="() => this.$emit('close')" :update="eventToUpdate" />
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EventForm from '@/components/EventForm.vue';

export default {
  mounted() {},
  props: {
    dateDisplay: String,
    isOpen: Boolean,
    dialog: {
      default: false,
    },
  },
  components: {
    EventForm,
  },
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false,
      eventToUpdate: {},
      eventsList: [],
    };
  },
  computed: {
    ...mapGetters(
      'calendar',
      ['getDayEvents', 'getClicked'],
    ),
    hasEvents() {
      return this.getDayEvents.length;
    },
  },
  methods: {
    ...mapActions('calendar', [
      'setEventIdToUpdate',
      'removeEvent',
      'removeAllEvents',
    ]),
    updateItem(item) {
      this.eventToUpdate = item;
    },
    deleteItem(item) {
      this.removeEvent(item);
    },
  },
};
</script>
