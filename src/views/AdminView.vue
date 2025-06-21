<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>{{ configuracoes.nomeRestaurante }} - Admin</v-app-bar-title>
      <v-spacer />
      <v-btn icon @click="fazerLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container fluid>
      <v-tabs v-model="tabAtiva" color="primary">
        <v-tab value="cardapio">Cardápio</v-tab>
        <v-tab value="configuracoes">Configurações</v-tab>
        <v-tab value="seguranca">Segurança</v-tab>
      </v-tabs>

      <v-window v-model="tabAtiva">
        <!-- Aba do Cardápio -->
        <v-window-item value="cardapio">
          <v-container>
            <v-row>
              <v-col cols="12">
                <h2>Gerenciar Cardápio</h2>
              </v-col>
            </v-row>

            <!-- Pratos Fixos -->
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    Pratos Fixos
                    <v-spacer />
                    <v-btn color="primary" @click="dialogPratoFixo = true">
                      <v-icon>mdi-plus</v-icon>
                      Adicionar Prato
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <v-list>
                      <v-list-item v-for="prato in pratosFixos" :key="prato.id">
                        <v-list-item-content>
                          <v-list-item-title>{{ prato.nome }}</v-list-item-title>
                          <v-list-item-subtitle>R$ {{ prato.preco.toFixed(2) }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn icon @click="editarPratoFixo(prato)">
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                          <v-btn icon @click="removerPratoFixo(prato.id)" color="error">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Bebidas -->
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    Bebidas
                    <v-spacer />
                    <v-btn color="primary" @click="dialogBebida = true">
                      <v-icon>mdi-plus</v-icon>
                      Adicionar Bebida
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <v-list>
                      <v-list-item v-for="bebida in bebidas" :key="bebida.id">
                        <v-list-item-content>
                          <v-list-item-title>{{ bebida.nome }}</v-list-item-title>
                          <v-list-item-subtitle>R$ {{ bebida.preco.toFixed(2) }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn icon @click="editarBebida(bebida)">
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                          <v-btn icon @click="removerBebida(bebida.id)" color="error">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Sobremesas -->
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    Sobremesas
                    <v-spacer />
                    <v-btn color="primary" @click="dialogSobremesa = true">
                      <v-icon>mdi-plus</v-icon>
                      Adicionar Sobremesa
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <v-list>
                      <v-list-item v-for="sobremesa in sobremesas" :key="sobremesa.id">
                        <v-list-item-content>
                          <v-list-item-title>{{ sobremesa.nome }}</v-list-item-title>
                          <v-list-item-subtitle>R$ {{ sobremesa.preco.toFixed(2) }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn icon @click="editarSobremesa(sobremesa)">
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                          <v-btn icon @click="removerItem('sobremesa', sobremesa.id)" color="error">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Ingredientes -->
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    Ingredientes (Monte Seu Prato)
                    <v-spacer />
                    <v-btn color="primary" @click="dialogIngrediente = true">
                      <v-icon>mdi-plus</v-icon>
                      Adicionar Ingrediente
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <v-list>
                      <v-list-item v-for="ingrediente in ingredientes" :key="ingrediente.id">
                        <v-list-item-content>
                          <v-list-item-title>{{ ingrediente.nome }}</v-list-item-title>
                          <v-list-item-subtitle>R$ {{ ingrediente.preco.toFixed(2) }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn icon @click="editarIngrediente(ingrediente)">
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                          <v-btn icon @click="removerIngrediente(ingrediente.id)" color="error">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>

        <!-- Aba de Configurações -->
        <v-window-item value="configuracoes">
          <v-container>
            <v-row>
              <v-col cols="12">
                <h2>Configurações do Site</h2>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title>Informações Básicas</v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="configuracoes.nomeRestaurante"
                      label="Nome do Restaurante"
                      @change="salvarConfiguracoes"
                    />
                    <v-text-field
                      v-model="configuracoes.telefoneWhatsApp"
                      label="Telefone WhatsApp"
                      @change="salvarConfiguracoes"
                      hint="Formato: 5511999999999"
                    />
                    <v-text-field
                      v-model="configuracoes.horarioFuncionamento"
                      label="Horário de Funcionamento"
                      @change="salvarConfiguracoes"
                    />
                    <v-text-field
                      v-model="configuracoes.enderecoRestaurante"
                      label="Endereço do Restaurante"
                      @change="salvarConfiguracoes"
                    />
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title>Personalização</v-card-title>
                  <v-card-text>
                    <!-- Primeira linha: Cor Primária e Cor Secundária -->
                    <v-row>
                      <v-col cols="6">
                        <v-color-picker
                          v-model="configuracoes.corPrimaria"
                          @update:model-value="salvarConfiguracoes"
                          label="Cor Primária"
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-color-picker
                          v-model="configuracoes.corSecundaria"
                          @update:model-value="salvarConfiguracoes"
                          label="Cor Secundária"
                        />
                      </v-col>
                    </v-row>
                    
                    <!-- Segunda linha: Cor de Fundo e Upload da Logo -->
                    <v-row align="center">
                      <v-col cols="6">
                        <v-color-picker
                          v-model="configuracoes.corFundo"
                          @update:model-value="salvarConfiguracoes"
                          label="Cor de Fundo"
                        />
                      </v-col>
                      <v-col cols="6">
                        <div>
                          <v-file-input
                            label="Upload da Logo"
                            accept="image/*"
                            @change="handleLogoUpload"
                            prepend-icon="mdi-camera"
                            density="compact"
                            style="max-width: 300px;"
                          />
                          <v-img
                            v-if="configuracoes.logoUrl"
                            :src="configuracoes.logoUrl"
                            max-height="80"
                            max-width="300"
                            contain
                            class="mt-2"
                          />
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>

        <!-- Aba de Segurança -->
        <v-window-item value="seguranca">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title>Alterar Senha</v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="senhaAtual"
                      label="Senha Atual"
                      :type="showSenhaAtual ? 'text' : 'password'"
                      :append-inner-icon="showSenhaAtual ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append-inner="showSenhaAtual = !showSenhaAtual"
                      :error-messages="erroSenhaAtual"
                    />
                    <v-text-field
                      v-model="novaSenha"
                      label="Nova Senha"
                      :type="showNovaSenha ? 'text' : 'password'"
                      :append-inner-icon="showNovaSenha ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append-inner="showNovaSenha = !showNovaSenha"
                      :error-messages="erroNovaSenha"
                    />
                    <v-text-field
                      v-model="confirmarNovaSenha"
                      label="Confirmar Nova Senha"
                      :type="showConfirmarNovaSenha ? 'text' : 'password'"
                      :append-inner-icon="showConfirmarNovaSenha ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append-inner="showConfirmarNovaSenha = !showConfirmarNovaSenha"
                      :error-messages="erroConfirmarNovaSenha"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" @click="salvarNovaSenha">Salvar Nova Senha</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
      </v-window>
    </v-container>

    <!-- Dialog para adicionar/editar prato fixo -->
    <v-dialog v-model="dialogPratoFixo" max-width="800px">
      <v-card>
        <v-card-title>
          {{ editandoPrato ? 'Editar Prato' : 'Adicionar Prato' }}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="novoPrato.nome" label="Nome do Prato" />
          <v-textarea v-model="novoPrato.descricao" label="Descrição" />
          <v-text-field
            v-model.number="novoPrato.preco"
            label="Preço"
            type="number"
            step="0.01"
          />
          <v-file-input
            label="Foto do Prato"
            accept="image/*"
            @change="handleImageUpload($event, novoPrato)"
            prepend-icon="mdi-camera"
          />
          <v-img v-if="novoPrato.imagem" :src="novoPrato.imagem" max-height="150" contain class="mt-4" />
          
          <!-- Opções de Carne -->
          <v-divider class="my-4" />
          <h3 class="mb-3">Opções de Carne</h3>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="novaOpcaoCarne.nome"
                label="Nome da Carne"
                placeholder="Ex: Carne de Boi"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="novaOpcaoCarne.preco"
                label="Preço Adicional"
                type="number"
                step="0.01"
                placeholder="0.00"
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-btn 
                color="primary" 
                @click="adicionarOpcaoCarne"
                :disabled="!novaOpcaoCarne.nome"
                class="mt-4"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          
          <!-- Lista de carnes -->
          <v-chip-group v-if="novoPrato.opcoes.carne && novoPrato.opcoes.carne.length > 0">
            <v-chip
              v-for="carne in novoPrato.opcoes.carne"
              :key="carne.id"
              closable
              @click:close="removerOpcaoCarne(carne.id)"
              color="primary"
            >
              {{ carne.nome }} {{ carne.preco > 0 ? `(+R$ ${carne.preco.toFixed(2)})` : '' }}
            </v-chip>
          </v-chip-group>
          
          <!-- Opções de Salada -->
          <v-divider class="my-4" />
          <h3 class="mb-3">Opções de Salada</h3>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="novaOpcaoSalada.nome"
                label="Nome da Salada"
                placeholder="Ex: Alface"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="novaOpcaoSalada.preco"
                label="Preço Adicional"
                type="number"
                step="0.01"
                placeholder="0.00"
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-btn 
                color="primary" 
                @click="adicionarOpcaoSalada"
                :disabled="!novaOpcaoSalada.nome"
                class="mt-4"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          
          <!-- Lista de saladas -->
          <v-chip-group v-if="novoPrato.opcoes.salada && novoPrato.opcoes.salada.length > 0">
            <v-chip
              v-for="salada in novoPrato.opcoes.salada"
              :key="salada.id"
              closable
              @click:close="removerOpcaoSalada(salada.id)"
              color="success"
            >
              {{ salada.nome }} {{ salada.preco > 0 ? `(+R$ ${salada.preco.toFixed(2)})` : '' }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialogPratoFixo = false">Cancelar</v-btn>
          <v-btn color="primary" @click="salvarPratoFixo">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog para adicionar/editar bebida -->
    <v-dialog v-model="dialogBebida" max-width="600px">
      <v-card>
        <v-card-title>
          {{ editandoBebida ? 'Editar Bebida' : 'Adicionar Bebida' }}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="novaBebida.nome" label="Nome da Bebida" />
          <v-text-field v-model="novaBebida.descricao" label="Descrição" />
          <v-text-field
            v-model.number="novaBebida.preco"
            label="Preço"
            type="number"
            step="0.01"
          />
          <v-file-input
            label="Foto da Bebida"
            accept="image/*"
            @change="handleImageUpload($event, novaBebida)"
            prepend-icon="mdi-camera"
          />
          <v-img v-if="novaBebida.imagem" :src="novaBebida.imagem" max-height="150" contain class="mt-4" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialogBebida = false">Cancelar</v-btn>
          <v-btn color="primary" @click="salvarBebida">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog para adicionar/editar sobremesa -->
    <v-dialog v-model="dialogSobremesa" max-width="600px">
      <v-card>
        <v-card-title>
          {{ editandoSobremesa ? 'Editar Sobremesa' : 'Adicionar Sobremesa' }}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="novaSobremesa.nome" label="Nome da Sobremesa" />
          <v-text-field v-model="novaSobremesa.descricao" label="Descrição" />
          <v-text-field
            v-model.number="novaSobremesa.preco"
            label="Preço"
            type="number"
            step="0.01"
          />
          <v-file-input
            label="Foto da Sobremesa"
            accept="image/*"
            @change="handleImageUpload($event, novaSobremesa)"
            prepend-icon="mdi-camera"
          />
          <v-img v-if="novaSobremesa.imagem" :src="novaSobremesa.imagem" max-height="150" contain class="mt-4" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialogSobremesa = false">Cancelar</v-btn>
          <v-btn color="primary" @click="salvarSobremesa">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog para adicionar/editar ingrediente -->
    <v-dialog v-model="dialogIngrediente" max-width="600px">
      <v-card>
        <v-card-title>
          {{ editandoIngrediente ? 'Editar Ingrediente' : 'Adicionar Ingrediente' }}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="novoIngrediente.nome" label="Nome do Ingrediente" />
          <v-text-field v-model="novoIngrediente.descricao" label="Descrição" />
          <v-text-field
            v-model.number="novoIngrediente.preco"
            label="Preço"
            type="number"
            step="0.01"
          />
          <v-file-input
            label="Foto do Ingrediente"
            accept="image/*"
            @change="handleImageUpload($event, novoIngrediente)"
            prepend-icon="mdi-camera"
          />
          <v-img v-if="novoIngrediente.imagem" :src="novoIngrediente.imagem" max-height="150" contain class="mt-4" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialogIngrediente = false">Cancelar</v-btn>
          <v-btn color="primary" @click="salvarIngrediente">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAdminStore } from '@/stores/admin'
import { useCardapioStore, type Item, type PratoFixo } from '@/stores/cardapio'

const router = useRouter()
const adminStore = useAdminStore()
const cardapioStore = useCardapioStore()

const tabAtiva = ref('cardapio')
const dialogPratoFixo = ref(false)
const dialogBebida = ref(false)
const dialogSobremesa = ref(false)
const dialogIngrediente = ref(false)
const editandoPrato = ref(false)
const editandoBebida = ref(false)
const editandoSobremesa = ref(false)
const editandoIngrediente = ref(false)
const senhaAtual = ref('')
const novaSenha = ref('')
const confirmarNovaSenha = ref('')
const erroSenhaAtual = ref('')
const erroNovaSenha = ref('')
const erroConfirmarNovaSenha = ref('')
const showSenhaAtual = ref(false)
const showNovaSenha = ref(false)
const showConfirmarNovaSenha = ref(false)

const novoPrato = reactive({
  id: null as number | null,
  nome: '',
  descricao: '',
  preco: 0,
  imagem: '',
  opcoes: {
    carne: [] as Item[],
    salada: [] as Item[]
  }
})

const novaBebida = reactive({
  id: null as number | null,
  nome: '',
  descricao: '',
  preco: 0,
  imagem: ''
})

const novaSobremesa = reactive({
  id: null as number | null,
  nome: '',
  descricao: '',
  preco: 0,
  imagem: ''
})

const novoIngrediente = reactive({
  id: null as number | null,
  nome: '',
  descricao: '',
  preco: 0,
  imagem: ''
})

const novaOpcaoCarne = reactive({
  nome: '',
  preco: 0
})

const novaOpcaoSalada = reactive({
  nome: '',
  preco: 0
})

// Pinia state and getters
const { configuracoes, isAdmin } = storeToRefs(adminStore)
const { pratosFixos, bebidas, sobremesas, ingredientes } = storeToRefs(cardapioStore)

// Pinia actions
const { fazerLogout: logoutAction, atualizarConfiguracoes } = adminStore
const { adicionarPratoFixo, adicionarItem, removerPratoFixo, removerItem, removerIngrediente } = cardapioStore

onMounted(() => {
  if (!isAdmin.value) {
    router.push('/login')
  }
})

const fazerLogout = () => {
  logoutAction()
  router.push('/')
}

const salvarConfiguracoes = () => {
  atualizarConfiguracoes(configuracoes.value)
}

const editarPratoFixo = (prato: PratoFixo) => {
  editandoPrato.value = true;
  // Limpa o objeto reativo e preenche com os novos dados
  Object.assign(novoPrato, { ...prato, opcoes: { carne: prato.opcoes?.carne || [], salada: prato.opcoes?.salada || [] } });
  dialogPratoFixo.value = true;
};

const salvarPratoFixo = () => {
  if (editandoPrato.value) {
    const pratoAtualizado: PratoFixo = {
      id: novoPrato.id!,
      nome: novoPrato.nome,
      descricao: novoPrato.descricao,
      preco: novoPrato.preco,
      ingredientes: [],
      opcoes: novoPrato.opcoes,
      disponivel: true,
      imagem: novoPrato.imagem
    }
    cardapioStore.atualizarPratoFixo(novoPrato.id!, pratoAtualizado)
  } else {
    const novoPratoCompleto: PratoFixo = {
      id: Date.now(),
      nome: novoPrato.nome,
      descricao: novoPrato.descricao,
      preco: novoPrato.preco,
      ingredientes: [],
      opcoes: novoPrato.opcoes,
      disponivel: true,
      imagem: novoPrato.imagem
    }
    cardapioStore.adicionarPratoFixo(novoPratoCompleto)
  }
  
  // Limpar formulário
  Object.assign(novoPrato, {
    id: null,
    nome: '',
    descricao: '',
    preco: 0,
    imagem: '',
    opcoes: {
      carne: [],
      salada: []
    }
  })
  
  dialogPratoFixo.value = false
  editandoPrato.value = false
}

const editarBebida = (bebida: Item) => {
  editandoBebida.value = true
  Object.assign(novaBebida, bebida)
  dialogBebida.value = true
}

const salvarBebida = () => {
  if (editandoBebida.value && novaBebida.id) {
    const { id, ...bebidaSemId } = novaBebida
    cardapioStore.atualizarItem(novaBebida.id, bebidaSemId)
  } else {
    const bebida: Item = {
      id: Date.now(),
      nome: novaBebida.nome,
      descricao: novaBebida.descricao,
      preco: novaBebida.preco,
      categoria: 'bebida',
      disponivel: true
    }
    adicionarItem(bebida)
  }
  
  // Limpar formulário
  Object.assign(novaBebida, { id: null, nome: '', descricao: '', preco: 0, imagem: '' })
  editandoBebida.value = false
  dialogBebida.value = false
}

const removerBebida = (id: number) => {
  cardapioStore.removerItem('bebida', id)
}

const handleImageUpload = (event: Event, targetObject: { imagem: string }) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        targetObject.imagem = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
};

const handleLogoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === 'string') {
        configuracoes.value.logoUrl = result
      }
    }
    reader.readAsDataURL(file)
  }
}

const editarSobremesa = (sobremesa: Item) => {
  editandoSobremesa.value = true
  Object.assign(novaSobremesa, sobremesa)
  dialogSobremesa.value = true
}

const salvarSobremesa = () => {
  if (editandoSobremesa.value && novaSobremesa.id) {
    const { id, ...sobremesaSemId } = novaSobremesa
    cardapioStore.atualizarItem(novaSobremesa.id, sobremesaSemId)
  } else {
    const sobremesa: Item = {
      id: Date.now(),
      nome: novaSobremesa.nome,
      descricao: novaSobremesa.descricao,
      preco: novaSobremesa.preco,
      imagem: novaSobremesa.imagem,
      categoria: 'sobremesa',
      disponivel: true
    }
    adicionarItem(sobremesa)
  }
  Object.assign(novaSobremesa, { id: null, nome: '', descricao: '', preco: 0, imagem: '' })
  editandoSobremesa.value = false
  dialogSobremesa.value = false
}

const editarIngrediente = (ingrediente: Item) => {
  editandoIngrediente.value = true
  Object.assign(novoIngrediente, ingrediente)
  dialogIngrediente.value = true
}

const salvarIngrediente = () => {
  if (editandoIngrediente.value && novoIngrediente.id) {
    const { id, ...ingredienteSemId } = novoIngrediente
    cardapioStore.atualizarItem(novoIngrediente.id, ingredienteSemId)
  } else {
    const ingrediente: Item = {
      id: Date.now(),
      nome: novoIngrediente.nome,
      descricao: novoIngrediente.descricao,
      preco: novoIngrediente.preco,
      categoria: 'ingrediente',
      disponivel: true
    }
    adicionarItem(ingrediente)
  }
  Object.assign(novoIngrediente, { id: null, nome: '', descricao: '', preco: 0, imagem: '' })
  editandoIngrediente.value = false
  dialogIngrediente.value = false
}

const adicionarOpcaoCarne = () => {
  if (novaOpcaoCarne.nome.trim()) {
    const carne: Item = {
      id: Date.now(),
      nome: novaOpcaoCarne.nome,
      descricao: novaOpcaoCarne.nome,
      preco: novaOpcaoCarne.preco,
      categoria: 'ingrediente',
      disponivel: true
    }
    novoPrato.opcoes.carne.push(carne)
    novaOpcaoCarne.nome = ''
    novaOpcaoCarne.preco = 0
  }
}

const removerOpcaoCarne = (id: number) => {
  const index = novoPrato.opcoes.carne.findIndex(carne => carne.id === id)
  if (index !== -1) {
    novoPrato.opcoes.carne.splice(index, 1)
  }
}

const adicionarOpcaoSalada = () => {
  if (novaOpcaoSalada.nome.trim()) {
    const salada: Item = {
      id: Date.now(),
      nome: novaOpcaoSalada.nome,
      descricao: novaOpcaoSalada.nome,
      preco: novaOpcaoSalada.preco,
      categoria: 'ingrediente',
      disponivel: true
    }
    novoPrato.opcoes.salada.push(salada)
    novaOpcaoSalada.nome = ''
    novaOpcaoSalada.preco = 0
  }
}

const removerOpcaoSalada = (id: number) => {
  const index = novoPrato.opcoes.salada.findIndex(salada => salada.id === id)
  if (index !== -1) {
    novoPrato.opcoes.salada.splice(index, 1)
  }
}

const salvarNovaSenha = () => {
  erroSenhaAtual.value = ''
  erroNovaSenha.value = ''
  erroConfirmarNovaSenha.value = ''
  if (novaSenha.value !== confirmarNovaSenha.value) {
    erroConfirmarNovaSenha.value = 'As senhas não coincidem.'
    return
  }

  try {
    const sucesso = adminStore.alterarSenha(senhaAtual.value, novaSenha.value)
    if (sucesso) {
      senhaAtual.value = ''
      novaSenha.value = ''
      confirmarNovaSenha.value = ''
      alert('Senha alterada com sucesso!')
    } else {
      erroSenhaAtual.value = 'Senha atual incorreta.'
    }
  } catch (error) {
    if (error instanceof Error) {
      erroNovaSenha.value = error.message
    } else {
      erroNovaSenha.value = 'Ocorreu um erro desconhecido ao alterar a senha.'
    }
  }
}
</script> 