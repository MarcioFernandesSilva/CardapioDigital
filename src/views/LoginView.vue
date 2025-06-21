<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login Administrador</v-toolbar-title>
          </v-toolbar>
          
          <v-card-text>
            <v-form @submit.prevent="fazerLogin">
              <v-text-field
                v-model="senha"
                label="Senha"
                name="senha"
                prepend-icon="mdi-lock"
                :type="showSenha ? 'text' : 'password'"
                :append-inner-icon="showSenha ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showSenha = !showSenha"
                :error-messages="erro"
                required
              />
            </v-form>
          </v-card-text>
          
          <v-card-actions>
            <v-btn text @click="voltarParaHome">Voltar para o Cardápio</v-btn>
            <v-spacer />
            <v-btn
              color="primary"
              @click="fazerLogin"
              :loading="loading"
            >
              Entrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const router = useRouter()
const adminStore = useAdminStore()

const senha = ref('')
const erro = ref('')
const loading = ref(false)
const showSenha = ref(false)

const voltarParaHome = () => {
  router.push('/')
}

const fazerLogin = async () => {
  if (!senha.value) {
    erro.value = 'Digite a senha'
    return
  }

  loading.value = true
  erro.value = ''

  // Simular delay para melhor UX
  await new Promise(resolve => setTimeout(resolve, 1000))

  const sucesso = adminStore.fazerLogin(senha.value)
  
  if (sucesso) {
    router.push('/admin')
  } else {
    erro.value = 'Senha incorreta'
  }

  loading.value = false
}
</script> 