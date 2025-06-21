import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Configuracoes {
  nomeRestaurante: string
  telefoneWhatsApp: string
  corPrimaria: string
  corSecundaria: string
  corFundo: string
  logoUrl: string
  horarioFuncionamento: string
  enderecoRestaurante: string
}

export const useAdminStore = defineStore(
  'admin',
  () => {
    const isAdmin = ref(false)
    const senhaAdmin = ref('admin123') // Senha simples para demonstração
    
    const configuracoes = ref<Configuracoes>({
      nomeRestaurante: 'Restaurante Delícias',
      telefoneWhatsApp: '5511999999999',
      corPrimaria: '#FF6B35',
      corSecundaria: '#F7931E',
      corFundo: '#FFFFFF',
      logoUrl: '/img/logo.png',
      horarioFuncionamento: 'Segunda a Domingo, das 18h às 23h',
      enderecoRestaurante: 'Rua das Flores, 123 - Centro'
    })

    // Actions
    const fazerLogin = (senha: string) => {
      if (senha === senhaAdmin.value) {
        isAdmin.value = true
        return true
      }
      return false
    }

    const fazerLogout = () => {
      isAdmin.value = false
    }

    const atualizarConfiguracoes = (novasConfiguracoes: Partial<Configuracoes>) => {
      configuracoes.value = { ...configuracoes.value, ...novasConfiguracoes }
    }

    const alterarSenha = (senhaAntiga: string, novaSenha: string) => {
      if (senhaAntiga !== senhaAdmin.value) {
        return false
      }
      
      // Validações de segurança para nova senha
      if (novaSenha.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres')
      }
      
      if (novaSenha === 'admin123' || novaSenha === '123456' || novaSenha === 'password') {
        throw new Error('Por favor, escolha uma senha mais segura')
      }
      
      // Verificar se a nova senha é muito similar à antiga
      if (novaSenha.toLowerCase().includes(senhaAntiga.toLowerCase()) || 
          senhaAntiga.toLowerCase().includes(novaSenha.toLowerCase())) {
        throw new Error('A nova senha não pode ser muito similar à senha atual')
      }
      
      senhaAdmin.value = novaSenha
      return true
    }

    const getWhatsAppUrl = (mensagem: string) => {
      return `https://wa.me/${configuracoes.value.telefoneWhatsApp}?text=${mensagem}`
    }

    return {
      // Estado
      isAdmin,
      senhaAdmin,
      configuracoes,
      
      // Actions
      fazerLogin,
      fazerLogout,
      atualizarConfiguracoes,
      alterarSenha,
      getWhatsAppUrl
    }
  },
  {
    persist: {
      key: 'admin-store',
      storage: localStorage
    }
  }
) 