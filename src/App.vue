<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import { watch, onMounted } from 'vue'
import { useTheme } from 'vuetify'

const adminStore = useAdminStore()
const theme = useTheme()

// Função para atualizar o tema
const updateTheme = () => {
  const lightTheme = theme.themes.value.light
  if (lightTheme) {
    lightTheme.colors.primary = adminStore.configuracoes.corPrimaria
    lightTheme.colors.secondary = adminStore.configuracoes.corSecundaria
    lightTheme.colors.background = adminStore.configuracoes.corFundo
  }
}

// "Escuta" as mudanças de cor no admin e aplica no tema do Vuetify
watch(
  () => adminStore.configuracoes,
  () => {
    updateTheme()
  },
  { deep: true } // "Escuta" mudanças dentro do objeto
)

// Aplicar tema inicial quando o componente for montado
onMounted(() => {
  updateTheme()
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
:root {
  --cor-primaria: #FF6B35;
  --cor-secundaria: #F7931E;
  --cor-fundo: #FFFFFF;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}

html {
  overflow-y: auto !important;
}

.v-card-title {
  word-break: break-word;
}
</style>
