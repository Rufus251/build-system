import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { mdi } from "vuetify/lib/iconsets/mdi";
import '@mdi/font/css/materialdesignicons.css';

import UIComponents from "@/components/UI/index.js"

import { createPinia } from "pinia"
const vuetify = createVuetify({
      components,
      directives,
      icons: {
            defaultSet: 'mdi',
            sets: {
                  mdi
            }
      },
});

const app = createApp(App)

UIComponents.forEach((component) => {
      app.component(component.name, component)
})

app
      .use(createPinia())
      .use(router)
      .use(vuetify)
      .mount('#app')
