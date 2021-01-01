(window.webpackJsonp=window.webpackJsonp||[]).push([[2],[,,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,a){"use strict";var n=a(8);a.n(n).a},function(e,t,a){"use strict";var n=a(9);a.n(n).a},function(e,t,a){"use strict";var n=a(10);a.n(n).a},function(e,t,a){"use strict";var n=a(11);a.n(n).a},function(e,t,a){"use strict";var n=a(12);a.n(n).a},,function(e,t,a){"use strict";var n=a(13);a.n(n).a},function(e,t,a){"use strict";var n=a(14);a.n(n).a},function(e,t,a){"use strict";var n=a(15);a.n(n).a},,,function(e,t,a){"use strict";a.r(t);var n=a(3),s={name:"App"},r=a(0),i=Object(r.a)(s,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"vue-backend-app"}},[t("router-view")],1)}),[],!1,null,null,null).exports,o=a(4),l=a(2),c=(a(5),a(17)),m=a.n(c);const u=(window.crep?window.crep.rest_url:"http://127.0.0.1:8000/wp-json/")+"crep/v1/";async function d(e){return await f({method:"delete",url:u+"events",data:{ids:e}})}async function p(e){return await f({method:"delete",url:u+"speakers",data:{ids:e}})}async function h(e){return await f({method:"delete",url:u+"tags",data:{ids:e}})}async function v(e){return await f({method:"delete",url:u+"sessions",data:{ids:e}})}async function _(e){return await f({method:"delete",url:u+"seminars",data:{ids:e}})}async function f(e){try{return(await m()(e)).data}catch(e){return console.error(e),{error:"Bei der Verbindung zum Server ist ein Fehler aufgetreten! Stelle sicher, dass du als Admin eingeloggt bist und versuche es noch einmal."}}}m.a.defaults.headers.common["X-WP-Nonce"]=window.crep?window.crep.nonce:null;var w={name:"Events",components:{ListTable:l.a},data:()=>({items:[],per_page:20,text:{select_bulk_action:"Mehrfachaktionen auswählen",bulk_actions:"Mehrfachaktionen",items:"Einträge",apply:"Übernehmen"},columns:{name:{label:"Event"},contact_mail:{label:"Kontakt"},created:{label:"Erstellt am"},default_slot_max:{label:"max. Teilnehmer je Seminar"}},actions:[{key:"edit",label:"Bearbeiten"},{key:"delete",label:"Löschen"}],bulk_actions:[{key:"delete",label:"Löschen"}]}),created(){this.loadItems()},methods:{async loadItems(){const e=await async function(){return(await f({method:"get",url:u+"events"})).map(e=>({...e,id:parseInt(e.id),default_slot_max:parseInt(e.default_slot_max)}))}();e.error?alert(e.error):(this.items=e,this.per_page=this.items.length)},async onActionClick(e,t){if("delete"===e){if(confirm("Event "+t.name+" wirklich löschen?")){const e=await d([t.id]);e.error?alert(e.error):(this.loadItems(),alert(t.name+" gelöscht!"))}}else"edit"===e&&this.$router.push({name:"EditEvent",params:t})},async onBulkActionClick(e,t){if("delete"===e&&confirm("Gewählte Events wirklich löschen?")){const e=await d(t);e.error?alert(e.error):(this.loadItems(),alert(e.success))}}}},b=(a(51),Object(r.a)(w,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"events"},[a("div",[a("h1",{staticClass:"events__headline"},[e._v("Events")]),e._v(" "),a("router-link",{staticClass:"page-title-action",attrs:{to:"/new-event"}},[e._v("\n      Neues Event erstellen\n    ")])],1),e._v(" "),a("list-table",{attrs:{rows:e.items,perPage:e.per_page,text:e.text,columns:e.columns,actions:e.actions,"bulk-actions":e.bulk_actions,"action-column":"name",notFound:"Keine Einträge gefunden"},on:{"action:click":e.onActionClick,"bulk:click":e.onBulkActionClick}})],1)}),[],!1,null,"bd27a848",null).exports),g={name:"EditEventForm",props:{buttonText:{type:String,default:"Speichern"},event:{type:Object,default:()=>({name:"",contact_mail:"",default_slot_max:25})}},data(){return{newEvent:{name:this.event.name,contact_mail:this.event.contact_mail,default_slot_max:this.event.default_slot_max}}},methods:{submit(e){e.preventDefault(),this.$emit("event-submit",this.newEvent)}}},k=(a(52),Object(r.a)(g,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("form",{staticClass:"edit-event-form",on:{submit:e.submit}},[a("table",{staticClass:"form-table",attrs:{role:"presentation"}},[a("tr",{staticClass:"form-field"},[a("th",{attrs:{scope:"row"}},[e._v("Name")]),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.newEvent.name,expression:"newEvent.name"}],attrs:{id:"crep-name",type:"text"},domProps:{value:e.newEvent.name},on:{input:function(t){t.target.composing||e.$set(e.newEvent,"name",t.target.value)}}})])]),e._v(" "),a("tr",{staticClass:"form-field"},[a("th",{attrs:{scope:"row"}},[e._v("Kontakt")]),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.newEvent.contact_mail,expression:"newEvent.contact_mail"}],attrs:{id:"crep-contact",type:"text"},domProps:{value:e.newEvent.contact_mail},on:{input:function(t){t.target.composing||e.$set(e.newEvent,"contact_mail",t.target.value)}}}),e._v(" "),a("p",{staticClass:"description"},[e._v("\n          E-Mail-Adressen der Organisatoren. Diese Personen werden bei einer\n          Registrierung benachrichtigt. Mehrere Adressen können mit Komma\n          getrennt eingegeben werden.\n        ")])])]),e._v(" "),a("tr",{staticClass:"form-field"},[a("th",{attrs:{scope:"row"}},[e._v("max. Teilnehmer je Seminar ")]),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.newEvent.default_slot_max,expression:"newEvent.default_slot_max"}],staticClass:"edit-event-form__number-field",attrs:{id:"crep-contact",type:"number"},domProps:{value:e.newEvent.default_slot_max},on:{input:function(t){t.target.composing||e.$set(e.newEvent,"default_slot_max",t.target.value)}}}),e._v(" "),a("p",{staticClass:"description"},[e._v("\n          Die Anzahl kann später pro Seminar geändert werden. Wenn es kein Teilnehmer-Limit geben soll, bitte 0 eintragen.\n        ")])])])]),e._v(" "),a("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[e._v("\n    "+e._s(e.buttonText)+"\n  ")])])}),[],!1,null,"799b7e08",null).exports),S={name:"NewEvent",components:{EditEventForm:k},methods:{async createEvent(e){const t=await async function(e){return await f({method:"post",url:u+"events",data:e})}(e);t.error?alert(t.error):(alert(`Event ${e.name} wurde angelegt!`),this.$router.push("/"))}}},y=Object(r.a)(S,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Neues Event erstellen")]),this._v(" "),t("edit-event-form",{attrs:{"button-text":"Neues Event erstellen"},on:{"event-submit":this.createEvent}})],1)}),[],!1,null,null,null).exports,x={name:"TagEditor",components:{ListTable:l.a},props:{event_id:{type:Number,required:!0}},data(){return{newTag:{name:"",event_id:this.event_id},tags:[],per_page:50,text:{select_bulk_action:"Mehrfachaktionen auswählen",bulk_actions:"Mehrfachaktionen",items:"Einträge",apply:"Übernehmen"},columns:{name:{label:"Name"},count:{label:"Anzahl"}},actions:[{key:"edit",label:"Bearbeiten"},{key:"delete",label:"Löschen"}],bulk_actions:[{key:"delete",label:"Löschen"}]}},created(){this.loadTags()},methods:{async loadTags(){const e=await async function(e){return(await f({method:"get",url:u+"tags",params:{event_id:e}})).map(e=>({...e,id:parseInt(e.id),event_id:parseInt(e.event_id)}))}(this.event_id);e.error?alert(e.error):(this.tags=e.map(e=>({...e,editing:!1})),this.per_page=this.tags.length)},async submit(e){e.preventDefault();const t=await async function(e){return await f({method:"post",url:u+"tags",data:e})}(this.newTag);t.error?alert(t.error):(alert(`Schlagwort ${this.newTag.name} wurde angelegt!`),this.newTag.name="",this.loadTags())},async onActionClick(e,t){if("delete"===e){if(confirm("Schlagwort "+t.name+" wirklich löschen?")){const e=await h([t.id]);e.error?alert(e.error):(this.loadTags(),alert(t.name+" gelöscht!"))}}else"edit"===e&&(t.editing=!0)},async onBulkActionClick(e,t){if("delete"===e&&confirm("Gewählte Schlagwörter wirklich löschen?")){const e=await h(t);e.error?alert(e.error):(this.loadTags(),alert(e.success))}},async submitUpdate(e,t){e.preventDefault();const a=await async function(e){return await f({method:"put",url:`${u}tags/${e.id}`,data:e})}(t);a.error?alert(a.error):this.loadTags()}}},E=(a(53),Object(r.a)(x,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tag-editor"},[a("h1",[e._v("Schlagwörter")]),e._v(" "),a("div",{staticClass:"wp-clearfix",attrs:{id:"col-container"}},[a("div",{attrs:{id:"col-left"}},[a("div",{staticClass:"col-wrap"},[a("h2",[e._v("Neues Schlagwort erstellen")]),e._v(" "),a("form",{staticClass:"edit-tag-form form-wrap",on:{submit:e.submit}},[a("div",{staticClass:"form-field"},[a("label",{attrs:{for:"crep-tag-name"}},[e._v("Name")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.newTag.name,expression:"newTag.name"}],attrs:{id:"crep-tag-name",type:"text"},domProps:{value:e.newTag.name},on:{input:function(t){t.target.composing||e.$set(e.newTag,"name",t.target.value)}}})]),e._v(" "),e._m(0)])])]),e._v(" "),a("div",{attrs:{id:"col-right"}},[a("div",{staticClass:"col-wrap"},[a("list-table",{attrs:{rows:e.tags,perPage:e.per_page,text:e.text,columns:e.columns,actions:e.actions,"bulk-actions":e.bulk_actions,"action-column":"name",notFound:"Keine Einträge gefunden"},on:{"action:click":e.onActionClick,"bulk:click":e.onBulkActionClick},scopedSlots:e._u([{key:"name",fn:function(t){return[t.row.editing?a("form",{staticClass:"tag-editor__update-form",on:{submit:function(a){return e.submitUpdate(a,t.row)}}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.row.name,expression:"data.row.name"}],attrs:{type:"text"},domProps:{value:t.row.name},on:{input:function(a){a.target.composing||e.$set(t.row,"name",a.target.value)}}}),e._v(" "),a("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[e._v("Speichern")])]):a("div",[e._v(e._s(t.row.name))])]}}])})],1)])])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("p",{staticClass:"submit"},[t("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[this._v("\n              Neues Schlagwort erstellen\n            ")])])}],!1,null,"11139b0f",null).exports),C={name:"SessionEditor",components:{ListTable:l.a},props:{event_id:{type:Number,required:!0}},data(){return{newSession:{name:"",event_id:this.event_id},sessions:[],per_page:50,text:{select_bulk_action:"Mehrfachaktionen auswählen",bulk_actions:"Mehrfachaktionen",items:"Einträge",apply:"Übernehmen"},columns:{name:{label:"Name"},count:{label:"Anzahl"}},actions:[{key:"edit",label:"Bearbeiten"},{key:"delete",label:"Löschen"}],bulk_actions:[{key:"delete",label:"Löschen"}]}},created(){this.loadSessions()},methods:{async loadSessions(){const e=await async function(e){return(await f({method:"get",url:u+"sessions",params:{event_id:e}})).map(e=>({...e,id:parseInt(e.id),event_id:parseInt(e.event_id)}))}(this.event_id);e.error?alert(e.error):(this.sessions=e.map(e=>({...e,editing:!1})),this.per_page=this.sessions.length)},async submit(e){e.preventDefault();const t=await async function(e){return await f({method:"post",url:u+"sessions",data:e})}(this.newSession);t.error?alert(t.error):(alert(`Session ${this.newSession.name} wurde angelegt!`),this.newSession.name="",this.loadSessions())},async onActionClick(e,t){if("delete"===e){if(confirm("Session "+t.name+" wirklich löschen?")){const e=await v([t.id]);e.error?alert(e.error):(this.loadSessions(),alert(t.name+" gelöscht!"))}}else"edit"===e&&(t.editing=!0)},async onBulkActionClick(e,t){if("delete"===e&&confirm("Gewählte Sessions wirklich löschen?")){const e=await v(t);e.error?alert(e.error):(this.loadSessions(),alert(e.success))}},async submitUpdate(e,t){e.preventDefault();const a=await async function(e){return await f({method:"put",url:`${u}sessions/${e.id}`,data:e})}(t);a.error?alert(a.error):this.loadSessions()}}},$=(a(54),Object(r.a)(C,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"session-editor"},[a("h1",[e._v("Sessions")]),e._v(" "),a("div",{staticClass:"wp-clearfix",attrs:{id:"col-container"}},[a("div",{attrs:{id:"col-left"}},[a("div",{staticClass:"col-wrap"},[a("h2",[e._v("Neue Session erstellen")]),e._v(" "),a("form",{staticClass:"edit-session-form form-wrap",on:{submit:e.submit}},[a("div",{staticClass:"form-field"},[a("label",{attrs:{for:"crep-session-name"}},[e._v("Name")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.newSession.name,expression:"newSession.name"}],attrs:{id:"crep-session-name",type:"text"},domProps:{value:e.newSession.name},on:{input:function(t){t.target.composing||e.$set(e.newSession,"name",t.target.value)}}})]),e._v(" "),e._m(0)])])]),e._v(" "),a("div",{attrs:{id:"col-right"}},[a("div",{staticClass:"col-wrap"},[a("list-table",{attrs:{rows:e.sessions,perPage:e.per_page,text:e.text,columns:e.columns,actions:e.actions,"bulk-actions":e.bulk_actions,"action-column":"name",notFound:"Keine Einträge gefunden"},on:{"action:click":e.onActionClick,"bulk:click":e.onBulkActionClick},scopedSlots:e._u([{key:"name",fn:function(t){return[t.row.editing?a("form",{staticClass:"session-editor__update-form",on:{submit:function(a){return e.submitUpdate(a,t.row)}}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.row.name,expression:"data.row.name"}],attrs:{type:"text"},domProps:{value:t.row.name},on:{input:function(a){a.target.composing||e.$set(t.row,"name",a.target.value)}}}),e._v(" "),a("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[e._v("Speichern")])]):a("div",[e._v(e._s(t.row.name))])]}}])})],1)])])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("p",{staticClass:"submit"},[t("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[this._v("\n              Neue Session erstellen\n            ")])])}],!1,null,"58778c02",null).exports),N={name:"SeminarEditor",components:{ListTable:l.a},props:{event_id:{type:Number,required:!0}},data(){return{newSeminar:{name:"",event_id:this.event_id},seminars:[],per_page:50,text:{select_bulk_action:"Mehrfachaktionen auswählen",bulk_actions:"Mehrfachaktionen",items:"Einträge",apply:"Übernehmen"},columns:{name:{label:"Name"},number:{label:"Nummer"},description:{label:"Beschreibung"},slot_max:{label:"max. Teilnehmerzahl"},sessions:{label:"Sessions"}},actions:[{key:"edit",label:"Bearbeiten"},{key:"delete",label:"Löschen"}],bulk_actions:[{key:"delete",label:"Löschen"}]}},created(){this.loadSeminars()},methods:{async loadSeminars(){const e=await async function(e){return(await f({method:"get",url:u+"seminars",params:{event_id:e}})).map(e=>({...e,id:parseInt(e.id),event_id:parseInt(e.event_id)}))}(this.event_id);e.error?alert(e.error):(this.seminars=e,this.per_page=this.seminars.length)},async onActionClick(e,t){if("delete"===e){if(confirm("Seminar "+t.name+" wirklich löschen?")){const e=await _([t.id]);e.error?alert(e.error):(this.loadSeminars(),alert(t.name+" gelöscht!"))}}else"edit"===e&&this.$router.push({path:`/${this.event_id}/edit-seminar/${t.id}`})},async onBulkActionClick(e,t){if("delete"===e&&confirm("Gewählte Seminare wirklich löschen?")){const e=await _(t);e.error?alert(e.error):(this.loadSeminars(),alert(e.success))}}}},A=(a(55),{name:"EditEvent",components:{EditEventForm:k,TagEditor:E,SessionEditor:$,SeminarEditor:Object(r.a)(N,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"seminar-editor"},[a("div",[a("h1",{staticClass:"seminar-editor__headline"},[e._v("Seminare")]),e._v(" "),a("router-link",{staticClass:"page-title-action",attrs:{to:"/"+e.event_id+"/new-seminar"}},[e._v("\n      Neues Seminar erstellen\n    ")])],1),e._v(" "),a("list-table",{attrs:{rows:e.seminars,perPage:e.per_page,text:e.text,columns:e.columns,actions:e.actions,"bulk-actions":e.bulk_actions,"action-column":"name",notFound:"Keine Einträge gefunden"},on:{"action:click":e.onActionClick,"bulk:click":e.onBulkActionClick}})],1)}),[],!1,null,"612767ca",null).exports},props:{name:{type:String,required:!0},id:{type:Number,required:!0},contact_mail:{type:String,required:!0},default_slot_max:{type:Number,required:!0}},methods:{async updateEvent(e){e.id=this.id;const t=await async function(e){return await f({method:"put",url:`${u}events/${e.id}`,data:e})}(e);t.error?alert(t.error):(alert(`Event ${e.name} wurde aktualisiert!`),this.$router.push("/"))}}}),T=Object(r.a)(A,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h1",[e._v(e._s(e.name))]),e._v(" "),a("edit-event-form",{attrs:{"button-text":"Aktualisieren",event:{name:e.name,contact_mail:e.contact_mail,default_slot_max:e.default_slot_max}},on:{"event-submit":e.updateEvent}}),e._v(" "),a("session-editor",{attrs:{event_id:e.id}}),e._v(" "),a("seminar-editor",{attrs:{event_id:e.id}}),e._v(" "),a("tag-editor",{attrs:{event_id:e.id}})],1)}),[],!1,null,null,null).exports,O=a(29),I=a.n(O),P=(a(56),{name:"EditSeminarForm",components:{Multiselect:I.a},props:{buttonText:{type:String,default:"Speichern"},seminarId:{type:Number},eventId:{type:Number,required:!0}},data:()=>({newSeminar:{number:null,name:"",description:"",slot_max:null},event:{sessions_data:[],tags_data:[],speakers_data:[]},sessionsValue:[],sessionsOptions:[],speakersValue:[],speakersOptions:[],tagsValue:[],tagsOptions:[]}),async created(){let e=null;this.seminarId&&(e=await async function(e){const t=await f({method:"get",url:`${u}seminars/${e}`});return{...t,sessions_data:t.sessions_data.map(e=>e.session_id),speakers_data:t.speakers_data.map(e=>e.speaker_id),tags_data:t.tags_data.map(e=>e.tag_id)}}(this.$route.params.seminar_id),this.newSeminar.name=e.seminar_data.name,this.newSeminar.number=e.seminar_data.number,this.newSeminar.description=e.seminar_data.description,this.newSeminar.slot_max=e.seminar_data.slot_max),this.event=await async function(e){return await f({method:"get",url:`${u}events/${e}`})}(this.eventId),this.event.sessions_data.forEach(t=>{this.sessionsOptions.push({name:t.name,code:t.id}),e&&e.sessions_data.includes(t.id)&&this.sessionsValue.push({name:t.name,code:t.id})}),this.event.speakers_data.forEach(t=>{this.speakersOptions.push({name:`${t.first_name} ${t.surname}`,code:t.id}),e&&e.speakers_data.includes(t.id)&&this.speakersValue.push({name:`${t.first_name} ${t.surname}`,code:t.id})}),this.event.tags_data.forEach(t=>{this.tagsOptions.push({name:t.name,code:t.id}),e&&e.tags_data.includes(t.id)&&this.tagsValue.push({name:t.name,code:t.id})})},methods:{submit(e){e.preventDefault(),this.newSeminar.session_ids=this.sessionsValue.map(e=>e.code),this.newSeminar.speaker_ids=this.speakersValue.map(e=>e.code),this.newSeminar.tag_ids=this.tagsValue.map(e=>e.code),this.newSeminar.event_id=this.eventId,this.$emit("seminar-submit",this.newSeminar)}}}),B=(a(57),Object(r.a)(P,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("form",{staticClass:"edit-seminar-form",on:{submit:e.submit}},[a("table",{staticClass:"form-table",attrs:{role:"presentation"}},[a("tr",{staticClass:"form-field"},[a("th",{attrs:{scope:"row"}},[e._v("Nummer")]),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.newSeminar.number,expression:"newSeminar.number"}],staticClass:"edit-seminar-form__number-field",attrs:{id:"crep-contact",type:"number"},domProps:{value:e.newSeminar.number},on:{input:function(t){t.target.composing||e.$set(e.newSeminar,"number",t.target.value)}}}),e._v(" "),a("p",{staticClass:"description"},[e._v("\n          Optionaler Wert. Falls angegeben, werden Seminare in der Übersicht\n          danach sortiert.\n        ")])])]),e._v(" "),a("tr",{staticClass:"form-field"},[a("th",{attrs:{scope:"row"}},[e._v("Name")]),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.newSeminar.name,expression:"newSeminar.name"}],attrs:{id:"crep-name",type:"text"},domProps:{value:e.newSeminar.name},on:{input:function(t){t.target.composing||e.$set(e.newSeminar,"name",t.target.value)}}})])]),e._v(" "),a("tr",{staticClass:"form-field"},[a("th",{attrs:{scope:"row"}},[e._v("Beschreibung")]),e._v(" "),a("td",[a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.newSeminar.description,expression:"newSeminar.description"}],attrs:{id:"crep-contact"},domProps:{value:e.newSeminar.description},on:{input:function(t){t.target.composing||e.$set(e.newSeminar,"description",t.target.value)}}})])]),e._v(" "),a("tr",{staticClass:"form-field"},[a("th",{attrs:{scope:"row"}},[e._v("max. Teilnehmerzahl")]),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.newSeminar.slot_max,expression:"newSeminar.slot_max"}],staticClass:"edit-seminar-form__number-field",attrs:{id:"crep-contact",type:"number"},domProps:{value:e.newSeminar.slot_max},on:{input:function(t){t.target.composing||e.$set(e.newSeminar,"slot_max",t.target.value)}}}),e._v(" "),a("p",{staticClass:"description"},[e._v("\n          Wenn es kein Teilnehmer-Limit geben soll, bitte 0 eintragen. Frei\n          lassen, um den Standardwert des Events zu übernehmen.\n        ")])])]),e._v(" "),a("tr",{staticClass:"form-field"},[a("th",{attrs:{scope:"row"}},[e._v("Sessions")]),e._v(" "),a("td",[a("multiselect",{staticClass:"edit-seminar-form__fullwidth-field",attrs:{"tag-placeholder":"Session nicht gefunden",placeholder:"Suche nach einer Session",selectLabel:"Enter oder Anklicken zum Auswählen",label:"name","track-by":"code",options:e.sessionsOptions,multiple:!0,taggable:!0},model:{value:e.sessionsValue,callback:function(t){e.sessionsValue=t},expression:"sessionsValue"}})],1)]),e._v(" "),a("tr",{staticClass:"form-field"},[a("th",{attrs:{scope:"row"}},[e._v("Referenten")]),e._v(" "),a("td",[a("multiselect",{staticClass:"edit-seminar-form__fullwidth-field",attrs:{"tag-placeholder":"Referent nicht gefunden",placeholder:"Suche nach einem Referenten",selectLabel:"Enter oder Anklicken zum Auswählen",label:"name","track-by":"code",options:e.speakersOptions,multiple:!0,taggable:!0},model:{value:e.speakersValue,callback:function(t){e.speakersValue=t},expression:"speakersValue"}})],1)]),e._v(" "),a("tr",{staticClass:"form-field"},[a("th",{attrs:{scope:"row"}},[e._v("Schlagwörter")]),e._v(" "),a("td",[a("multiselect",{staticClass:"edit-seminar-form__fullwidth-field",attrs:{"tag-placeholder":"Schlagwort nicht gefunden",placeholder:"Suche nach einem Schlagwort",selectLabel:"Enter oder Anklicken zum Auswählen",label:"name","track-by":"code",options:e.tagsOptions,multiple:!0,taggable:!0},model:{value:e.tagsValue,callback:function(t){e.tagsValue=t},expression:"tagsValue"}})],1)])]),e._v(" "),a("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[e._v("\n    "+e._s(e.buttonText)+"\n  ")])])}),[],!1,null,"79fa9778",null).exports),j={name:"NewSeminar",components:{EditSeminarForm:B},methods:{async createSeminar(e){const t=await async function(e){return await f({method:"post",url:u+"seminars",data:e})}(e);t.error?alert(t.error):(alert(`Seminar ${e.name} wurde angelegt!`),this.$router.push("/"))}}},V=Object(r.a)(j,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Neues Seminar erstellen")]),this._v(" "),t("edit-seminar-form",{attrs:{"button-text":"Neues Seminar erstellen","event-id":parseInt(this.$route.params.event_id)},on:{"seminar-submit":this.createSeminar}})],1)}),[],!1,null,null,null).exports,L={name:"EditSeminar",components:{EditSeminarForm:B},data(){return{id:parseInt(this.$route.params.seminar_id)}},methods:{async updateSeminar(e){e.id=this.id;const t=await async function(e){return await f({method:"put",url:`${u}seminars/${e.id}`,data:e})}(e);t.error?alert(t.error):(alert(`Seminar ${e.name} wurde aktualisiert!`),this.$router.push("/"))}}},F=Object(r.a)(L,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Seminar bearbeiten")]),this._v(" "),t("edit-seminar-form",{attrs:{"button-text":"Aktualisieren","seminar-id":this.id,"event-id":parseInt(this.$route.params.event_id)},on:{"seminar-submit":this.updateSeminar}})],1)}),[],!1,null,null,null).exports,M={name:"Speakers",components:{ListTable:l.a},data:()=>({items:[],per_page:20,text:{select_bulk_action:"Mehrfachaktionen auswählen",bulk_actions:"Mehrfachaktionen",items:"Einträge",apply:"Übernehmen"},columns:{first_name:{label:"Vorname"},surname:{label:"Nachname"},location:{label:"Ort"},description:{label:"Beschreibung"},path_to_picture:{label:"Bild"}},actions:[{key:"edit",label:"Bearbeiten"},{key:"delete",label:"Löschen"}],bulk_actions:[{key:"delete",label:"Löschen"}]}),created(){this.loadItems()},methods:{async loadItems(){const e=await async function(){return(await f({method:"get",url:u+"speakers"})).map(e=>({...e,id:parseInt(e.id)}))}();e.error?alert(e.error):(this.items=e,this.per_page=this.items.length)},async onActionClick(e,t){if("delete"===e){if(confirm(t.first_name+" "+t.surname+" wirklich löschen?")){const e=await p([t.id]);e.error?alert(e.error):(this.loadItems(),alert(t.first_name+" "+t.surname+" gelöscht!"))}}else"edit"===e&&this.$router.push({name:"EditSpeaker",params:t})},async onBulkActionClick(e,t){if("delete"===e&&confirm("Gewählte Referenten wirklich löschen?")){const e=await p(t);e.error?alert(e.error):(this.loadItems(),alert(e.success))}}}},q=(a(58),Object(r.a)(M,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"speakers"},[a("div",[a("h1",{staticClass:"speakers__headline"},[e._v("Referenten")]),e._v(" "),a("router-link",{staticClass:"page-title-action",attrs:{to:"/new-speaker"}},[e._v("\n      Neuen Referent anlegen\n    ")])],1),e._v(" "),a("list-table",{attrs:{rows:e.items,perPage:e.per_page,text:e.text,columns:e.columns,actions:e.actions,"bulk-actions":e.bulk_actions,"action-column":"first_name",notFound:"Keine Einträge gefunden"},on:{"action:click":e.onActionClick,"bulk:click":e.onBulkActionClick}})],1)}),[],!1,null,"755b22ac",null).exports),z={name:"EditSpeakerForm",props:{buttonText:{type:String,default:"Speichern"},speaker:{type:Object,default:()=>({first_name:"",surname:"",location:"",description:"",path_to_picture:""})}},data(){return{newSpeaker:{first_name:this.speaker.first_name,surname:this.speaker.surname,location:this.speaker.location,description:this.speaker.description,path_to_picture:this.speaker.path_to_picture}}},methods:{submit(e){e.preventDefault(),this.$emit("speaker-submit",this.newSpeaker)}}},R=(a(59),Object(r.a)(z,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("form",{staticClass:"edit-speaker-form",on:{submit:e.submit}},[a("table",{staticClass:"form-table",attrs:{role:"presentation"}},[a("tr",{staticClass:"form-field"},[a("th",{attrs:{scope:"row"}},[e._v("Vorname")]),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.newSpeaker.first_name,expression:"newSpeaker.first_name"}],attrs:{id:"crep-first_name",type:"text"},domProps:{value:e.newSpeaker.first_name},on:{input:function(t){t.target.composing||e.$set(e.newSpeaker,"first_name",t.target.value)}}})])]),e._v(" "),a("tr",{staticClass:"form-field"},[a("th",{attrs:{scope:"row"}},[e._v("Nachname")]),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.newSpeaker.surname,expression:"newSpeaker.surname"}],attrs:{id:"crep-surname",type:"text"},domProps:{value:e.newSpeaker.surname},on:{input:function(t){t.target.composing||e.$set(e.newSpeaker,"surname",t.target.value)}}})])]),e._v(" "),a("tr",{staticClass:"form-field"},[a("th",{attrs:{scope:"row"}},[e._v("Ort")]),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.newSpeaker.location,expression:"newSpeaker.location"}],attrs:{id:"crep-location",type:"text"},domProps:{value:e.newSpeaker.location},on:{input:function(t){t.target.composing||e.$set(e.newSpeaker,"location",t.target.value)}}})])]),e._v(" "),a("tr",{staticClass:"form-field"},[a("th",{attrs:{scope:"row"}},[e._v("Beschreibung")]),e._v(" "),a("td",[a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.newSpeaker.description,expression:"newSpeaker.description"}],attrs:{id:"crep-description"},domProps:{value:e.newSpeaker.description},on:{input:function(t){t.target.composing||e.$set(e.newSpeaker,"description",t.target.value)}}})])]),e._v(" "),a("tr",{staticClass:"form-field"},[a("th",{attrs:{scope:"row"}},[e._v("Pfad zum Bild")]),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.newSpeaker.path_to_picture,expression:"newSpeaker.path_to_picture"}],attrs:{id:"crep-path_to_picture",type:"text"},domProps:{value:e.newSpeaker.path_to_picture},on:{input:function(t){t.target.composing||e.$set(e.newSpeaker,"path_to_picture",t.target.value)}}})])])]),e._v(" "),a("button",{staticClass:"button button-primary",attrs:{type:"submit"}},[e._v("\n    "+e._s(e.buttonText)+"\n  ")])])}),[],!1,null,"17778faf",null).exports),D={name:"NewSpeaker",components:{EditSpeakerForm:R},methods:{async createSpeaker(e){const t=await async function(e){return await f({method:"post",url:u+"speakers",data:e})}(e);t.error?alert(t.error):(alert(` ${e.first_name} ${e.surname} wurde angelegt!`),this.$router.push("/speakers"))}}},K=Object(r.a)(D,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Neuen Referenten erstellen")]),this._v(" "),t("edit-speaker-form",{attrs:{"button-text":"Neuen Referenten erstellen"},on:{"speaker-submit":this.createSpeaker}})],1)}),[],!1,null,null,null).exports,G={name:"EditSpeaker",components:{EditSpeakerForm:R},props:{id:{type:Number,required:!0},first_name:{type:String,required:!0},surname:{type:String,required:!0},location:{type:String},description:{type:String},path_to_picture:{type:String}},methods:{async updateSpeaker(e){e.id=this.id;const t=await async function(e){return await f({method:"put",url:`${u}speakers/${e.id}`,data:e})}(e);t.error?alert(t.error):(alert(`${e.first_name} ${e.surname} wurde aktualisiert!`),this.$router.push("/speakers"))}}},U=Object(r.a)(G,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h1",[e._v("Referent bearbeiten")]),e._v(" "),a("edit-speaker-form",{attrs:{"button-text":"Aktualisieren",speaker:{first_name:e.first_name,surname:e.surname,location:e.location,description:e.description,path_to_picture:e.path_to_picture}},on:{"speaker-submit":e.updateSpeaker}})],1)}),[],!1,null,null,null).exports;n.a.use(o.a);var W=new o.a({routes:[{path:"/new-event",name:"NewEvent",component:y},{path:"/edit-event",name:"EditEvent",component:T,props:!0},{path:"/:event_id/new-seminar",name:"NewSeminar",component:V},{path:"/:event_id/edit-seminar/:seminar_id",name:"EditSeminar",component:F,props:!0},{path:"/new-speaker",name:"NewSpeaker",component:K},{path:"/edit-speaker",name:"EditSpeaker",component:U,props:!0},{path:"/speakers",name:"Speakers",component:q},{path:"/",name:"Events",component:b}]});var J=function(e){var t=jQuery;let a=t("#toplevel_page_"+e),n=window.location.href,s=n.substr(n.indexOf("admin.php"));a.on("click","a",(function(){var e=t(this);t("ul.wp-submenu li",a).removeClass("current"),e.hasClass("wp-has-submenu")?t("li.wp-first-item",a).addClass("current"):e.parents("li").addClass("current")})),t("ul.wp-submenu a",a).each((function(e,a){t(a).attr("href")!==s||t(a).parent().addClass("current")}))};n.a.config.productionTip=!1,new n.a({el:"#vue-admin-app",router:W,render:e=>e(i)}),J("vue-app")}],[[62,0,1]]]);