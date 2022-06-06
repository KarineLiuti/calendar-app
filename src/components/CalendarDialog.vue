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
            <h2>Events for this day</h2>
            <v-card class="mt-4">
              <v-list>
                  <template  v-for="(item, index) in getDayEvents">
                    <v-list-item
                      :key="index"
                    >
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.title }}
                        </v-list-item-title>
                        <v-list-item-title>
                          weather
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
                          <v-icon @click.stop="deleteItem(index)">
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
          </v-flex>
          <v-flex xs12 sm4 offset-sm1>
            <h2>Add new</h2>
            <EventForm :update="eventToUpdate" />
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
      ['getDayEvents'],
    ),
  },
  methods: {
    ...mapActions('calendar', ['setEventIdToUpdate']),
    updateItem(item) {
      this.eventToUpdate = item;
    },
    deleteItem() {},
  },
};
</script>
