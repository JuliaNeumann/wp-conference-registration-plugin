<template>
  <div class="registration-editor">
    <div>
      <h1 class="registration-editor__headline">Anmeldungen</h1>
      <router-link
        v-if="sessions.length"
        :to="`/${event_id}/new-registration`"
        class="page-title-action"
      >
        Neue Anmeldung erstellen
      </router-link>
      <em v-else
        >&nbsp; (Sie müssen zuerst Sessions und Seminare anlegen, um Anmeldungen
        erstellen zu können)</em
      >
      <button type="button" class="page-title-action" @click="exportRegistrations">
        Anmeldungen exportieren
      </button>
    </div>
    <list-table
      :rows="registrations"
      :perPage="per_page"
      :text="text"
      :columns="columns"
      :actions="actions"
      :bulk-actions="bulk_actions"
      action-column="first_name"
      notFound="Keine Einträge gefunden"
      @action:click="onActionClick"
      @bulk:click="onBulkActionClick"
    >
      <template slot="confirmed" slot-scope="data">
        {{ data.row.confirmed === "1" ? "Ja" : "Nein" }}
      </template>
    </list-table>
  </div>
</template>

<script>
import {
  deleteRegistrations,
  getRegistrations,
  getSpeakers,
} from "../utils/api-services";
import { exportAllRegistrations, parseJSONStringArray, parseJSONStringObject } from "../utils/helpers";
import ListTable from "vue-wp-list-table";
import "vue-wp-list-table/dist/vue-wp-list-table.css";

export default {
  name: "RegistrationEditor",
  components: { ListTable },
  props: {
    event: {
      type: Object,
      required: true,
    },
    sessions: {
      type: Array,
      default: () => [],
    },
    seminars: {
      type: Array,
      default: () => [],
    },
    additionalParams: {
      type: String,
      default: "[]",
    },
  },
  data() {
    return {
      event_id: this.event.id,
      newRegistration: {
        name: "",
        event_id: this.event.id,
      },
      seminar_map: {},
      additionalParams_parsed: parseJSONStringArray(this.additionalParams),
      registrations: [],
      per_page: 50,
      text: {
        select_bulk_action: "Mehrfachaktionen auswählen",
        bulk_actions: "Mehrfachaktionen",
        items: "Einträge",
        apply: "Übernehmen",
      },
      columns: {
        first_name: {
          label: "Vorname",
        },
        surname: {
          label: "Nachname",
        },
        contact_mail: {
          label: "E-Mail",
        },
        confirmed: {
          label: "Bestätigt",
        },
        registration_date: {
          label: "Anmeldedatum",
        },
      },
      actions: [
        {
          key: "edit",
          label: "Bearbeiten",
        },
        {
          key: "delete",
          label: "Löschen",
        },
      ],
      bulk_actions: [
        {
          key: "delete",
          label: "Löschen",
        },
      ],
    };
  },
  created() {
    this.seminars.forEach((seminar) => {
      this.seminar_map[seminar.id] = seminar.name;
    });
    this.loadRegistrations();
    this.sessions.forEach((session) => {
      this.columns[`session_${session.id}`] = { label: session.name };
    });
    this.additionalParams_parsed.forEach((param) => {
      this.columns[param.code] = { label: param.name };
    });
  },
  methods: {
    async loadRegistrations() {
      const result = await getRegistrations(this.event_id);
      if (result.error) {
        alert(result.error);
        return;
      }
      result.forEach((registration) => {
        registration.seminars.forEach((seminar) => {
          if (seminar) {
            registration[`session_${seminar.session_id}`] = this.seminar_map[
              seminar.seminar_id
            ];
          }
        });
        const additionalParams = parseJSONStringObject(
          registration.additional_params
        );
        this.additionalParams_parsed.forEach((param) => {
          registration[param.code] = additionalParams[param.code] || "";
        });
      });
      this.registrations = result;
      this.per_page = this.registrations.length;
    },

    async onActionClick(action, row) {
      if ("delete" === action) {
        if (
          confirm(
            `Anmeldung für ${row.first_name} ${row.surname} wirklich löschen?`
          )
        ) {
          const result = await deleteRegistrations([row.id]);
          if (result.error) {
            alert(result.error);
          } else {
            this.loadRegistrations();
            alert(`Anmeldung für ${row.first_name} ${row.surname} gelöscht!`);
          }
        }
      } else if ("edit" === action) {
        this.$router.push({
          path: `/${this.event_id}/edit-registration/${row.id}`,
        });
      }
    },

    async onBulkActionClick(action, rowIds) {
      if ("delete" === action) {
        if (confirm("Gewählte Anmeldungen wirklich löschen?")) {
          const result = await deleteRegistrations(rowIds);
          if (result.error) {
            alert(result.error);
          } else {
            this.loadRegistrations();
            alert(result.success);
          }
        }
      }
    },

    exportRegistrations(event) {
      event.preventDefault();
      exportAllRegistrations(this.registrations, this.event);
    }
  },
};
</script>

<style scoped>
.registration-editor__headline {
  display: inline-block;
}
</style>