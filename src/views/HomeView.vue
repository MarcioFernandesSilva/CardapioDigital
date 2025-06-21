<template>
  <div>
    <!-- App Bar -->
    <v-app-bar color="primary" dark>
      <v-img
        v-if="configuracoes.logoUrl"
        :src="configuracoes.logoUrl"
        max-height="40"
        max-width="40"
        contain
        class="ml-2 mr-3"
      />
      <v-app-bar-title>
        {{ configuracoes.nomeRestaurante }}
      </v-app-bar-title>
      <v-spacer />
      <v-btn icon @click="abrirCarrinho" class="position-relative">
        <v-badge :content="totalItens" :model-value="totalItens > 0" color="secondary">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
        <!-- Indicador de novos itens -->
        <div 
          v-if="novosItensAdicionados > 0" 
          class="novo-item-indicator"
          :style="{ animation: 'pulse 1s infinite' }"
        ></div>
      </v-btn>
      <v-btn icon @click="$router.push('/login')">
        <v-icon>mdi-account-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container fluid>
      <!-- Informações do Restaurante -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-text class="text-center">
              <h3>{{ configuracoes.nomeRestaurante }}</h3>
              <p>{{ configuracoes.horarioFuncionamento }}</p>
              <p>{{ configuracoes.enderecoRestaurante }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Tabs do Cardápio -->
      <v-row>
        <v-col cols="12">
          <v-tabs v-model="tabAtiva" color="primary" grow>
            <v-tab value="pratos-fixos">Pratos Fixos</v-tab>
            <v-tab value="pratos-montaveis">Monte Seu Prato</v-tab>
            <v-tab value="bebidas">Bebidas</v-tab>
            <v-tab value="sobremesas">Sobremesas</v-tab>
          </v-tabs>
        </v-col>
      </v-row>

      <!-- Conteúdo das Tabs -->
      <v-window v-model="tabAtiva">
        <!-- Pratos Fixos -->
        <v-window-item value="pratos-fixos">
          <v-row>
            <v-col
              v-for="prato in getPratosFixosDisponiveis"
              :key="prato.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card @click="selecionarPratoFixo(prato)" class="item-card">
                <v-img
                  :src="prato.imagem || '/img/default-food.jpg'"
                  height="200"
                  cover
                />
                <v-card-title>{{ prato.nome }}</v-card-title>
                <v-card-text>
                  <p>{{ prato.descricao }}</p>
                  <p class="text-h6 font-weight-bold">R$ {{ prato.preco.toFixed(2) }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <!-- Pratos Montáveis -->
        <v-window-item value="pratos-montaveis">
          <v-row>
            <v-col cols="12">
              <v-alert type="info" class="mb-4">
                <strong>Monte Seu Prato:</strong> Escolha os ingredientes que deseja para montar seu prato personalizado!
              </v-alert>
            </v-col>
            
            <v-col cols="12" class="mb-4">
              <v-btn 
                color="primary" 
                size="large" 
                block
                @click="finalizarPratoMontavel"
                :disabled="ingredientesSelecionados.length === 0"
              >
                <v-icon class="mr-2">mdi-check</v-icon>
                Adicionar Prato Personalizado ao Carrinho
              </v-btn>
            </v-col>
            
            <v-col
              v-for="ingrediente in getIngredientesDisponiveis"
              :key="ingrediente.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card 
                @click="selecionarIngrediente(ingrediente)"
                :class="{ 'selected-ingredient': ingredientesSelecionados.find(ing => ing.id === ingrediente.id) }"
                class="item-card"
              >
                <v-img
                  :src="ingrediente.imagem || '/img/default-ingredient.jpg'"
                  height="200"
                  cover
                />
                <v-card-title>{{ ingrediente.nome }}</v-card-title>
                <v-card-text>
                  <p>{{ ingrediente.descricao }}</p>
                  <p class="text-h6 font-weight-bold">R$ {{ ingrediente.preco.toFixed(2) }}</p>
                </v-card-text>
                <div v-if="ingredientesSelecionados.find(ing => ing.id === ingrediente.id)" class="selection-indicator">
                  <v-icon color="white">mdi-check</v-icon>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <!-- Bebidas -->
        <v-window-item value="bebidas">
          <v-row>
            <v-col
              v-for="bebida in getBebidasDisponiveis"
              :key="bebida.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card @click="adicionarAoCarrinho(bebida)" class="item-card">
                <v-img
                  :src="bebida.imagem || '/img/default-drink.jpg'"
                  height="200"
                  cover
                />
                <v-card-title>{{ bebida.nome }}</v-card-title>
                <v-card-text>
                  <p>{{ bebida.descricao }}</p>
                  <p class="text-h6 font-weight-bold">R$ {{ bebida.preco.toFixed(2) }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <!-- Sobremesas -->
        <v-window-item value="sobremesas">
          <v-row>
            <v-col
              v-for="sobremesa in getSobremesasDisponiveis"
              :key="sobremesa.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card @click="adicionarAoCarrinho(sobremesa)" class="item-card">
                <v-img
                  :src="sobremesa.imagem || '/img/default-dessert.jpg'"
                  height="200"
                  cover
                />
                <v-card-title>{{ sobremesa.nome }}</v-card-title>
                <v-card-text>
                  <p>{{ sobremesa.descricao }}</p>
                  <p class="text-h6 font-weight-bold">R$ {{ sobremesa.preco.toFixed(2) }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-container>

    <!-- Carrinho Lateral -->
    <v-navigation-drawer
      v-model="mostrarCarrinho"
      location="right"
      width="400"
      temporary
    >
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-cart</v-icon>
        Carrinho ({{ totalItens }})
        <v-spacer />
        <v-btn icon @click="limparCarrinho" color="error" class="mr-2">
          <v-icon>mdi-delete-sweep</v-icon>
        </v-btn>
        <v-btn icon @click="mostrarCarrinho = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text style="height: calc(100vh - 200px); overflow-y: auto;">
        <div v-if="carrinhoVazio" class="text-center pa-4">
          <v-icon size="64" color="grey">mdi-cart-outline</v-icon>
          <p class="mt-2">Seu carrinho está vazio</p>
        </div>

        <div v-else>
          <v-list>
            <v-list-item v-for="item in itens" :key="item.id">
              <v-list-item-content>
                <v-list-item-title>{{ item.nome }}</v-list-item-title>
                <v-list-item-subtitle>
                  R$ {{ item.preco.toFixed(2) }}
                  <span v-if="item.modificacoes?.carne"> - {{ item.modificacoes.carne }}</span>
                  <span v-if="item.modificacoes?.salada?.length"> - {{ item.modificacoes.salada.join(', ') }}</span>
                   <span v-if="item.modificacoes?.ingredientes?.length"> - {{ item.modificacoes.ingredientes.join(', ') }}</span>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn-group>
                  <v-btn icon small @click="diminuirQuantidade(item.id)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="mx-2">{{ item.quantidade }}</span>
                  <v-btn icon small @click="aumentarQuantidade(item.id)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-btn-group>
              </v-list-item-action>
              <v-list-item-action>
                <v-btn icon small color="warning" @click="editarItem(item)" class="mr-1">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon small color="error" @click="removerItem(item.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider class="my-4" />

          <div class="text-h6 font-weight-bold text-right">
            Total: R$ {{ totalPreco.toFixed(2) }}
          </div>

          <v-btn
            block
            color="primary"
            size="large"
            class="mt-4"
            @click="finalizarPedido"
          >
            Finalizar Pedido
          </v-btn>
        </div>
      </v-card-text>
    </v-navigation-drawer>

    <!-- Dialog para Prato Fixo -->
    <v-dialog v-model="dialogPratoFixo" max-width="600px" @update:model-value="!$event && limparDialogs()">
      <v-card>
        <v-card-title>{{ pratoSelecionado?.nome }}</v-card-title>
        <v-card-text>
          <p>{{ pratoSelecionado?.descricao }}</p>
          <p class="text-h6 font-weight-bold">
            Preço Final: R$ {{ precoCalculadoPratoFixo.toFixed(2) }}
          </p>

          <!-- Opções de Carne -->
          <v-select
            v-if="pratoSelecionado?.opcoes?.carne?.length"
            v-model="modificacoes.carne"
            :items="pratoSelecionado.opcoes.carne"
            item-title="nome"
            item-value="nome"
            label="Tipo de Carne"
            clearable
          />

          <!-- Opções de Salada -->
          <v-select
            v-if="pratoSelecionado?.opcoes?.salada?.length"
            v-model="modificacoes.salada"
            :items="pratoSelecionado.opcoes.salada"
            item-title="nome"
            item-value="nome"
            label="Salada"
            multiple
            chips
            clearable
          />

          <v-textarea
            v-model="observacoes"
            label="Observações"
            placeholder="Alguma observação especial?"
            rows="2"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialogPratoFixo = false">Cancelar</v-btn>
          <v-btn color="primary" @click="confirmarPratoFixo">
            {{ itemEmEdicao ? 'Atualizar' : 'Adicionar ao Carrinho' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog para Finalizar Pedido -->
    <v-dialog v-model="dialogFinalizarPedido" max-width="600px">
      <v-card>
        <v-card-title>Finalizar Pedido</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="dadosCliente.nome"
            label="Seu Nome"
            required
          />
          <v-text-field
            v-model="dadosCliente.telefone"
            label="Telefone"
            required
          />
          <v-textarea
            v-model="dadosCliente.endereco"
            label="Endereço Completo"
            required
            placeholder="Rua, número, bairro, cidade - CEP"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialogFinalizarPedido = false">Cancelar</v-btn>
          <v-btn color="success" @click="enviarParaWhatsApp">
            Enviar para WhatsApp
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog para Editar Bebida -->
    <v-dialog v-model="dialogBebida" max-width="600px" @update:model-value="!$event && limparDialogs()">
      <v-card>
        <v-card-title>Editar Bebida</v-card-title>
        <v-card-text>
          <p class="mb-4">Escolha a nova bebida:</p>
          <v-row>
            <v-col v-for="bebida in getBebidasDisponiveis" :key="bebida.id" cols="12" sm="6">
              <v-card @click="selecionarNovoItem(bebida)" :class="{ 'selected-item': itemSelecionado?.id === bebida.id }" class="item-card">
                <v-img :src="bebida.imagem || '/img/default-drink.jpg'" height="120" cover />
                <v-card-title class="text-subtitle-2">{{ bebida.nome }}</v-card-title>
                <v-card-text class="pa-2">
                  <p class="text-h6 font-weight-bold">R$ {{ bebida.preco.toFixed(2) }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-textarea v-model="observacoes" label="Observações" rows="2" class="mt-4" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialogBebida = false">Cancelar</v-btn>
          <v-btn color="primary" @click="confirmarBebidaSobremesa" :disabled="!itemSelecionado">Atualizar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog para Editar Sobremesa -->
    <v-dialog v-model="dialogSobremesa" max-width="600px" @update:model-value="!$event && limparDialogs()">
      <v-card>
        <v-card-title>Editar Sobremesa</v-card-title>
        <v-card-text>
          <p class="mb-4">Escolha a nova sobremesa:</p>
          <v-row>
            <v-col v-for="sobremesa in getSobremesasDisponiveis" :key="sobremesa.id" cols="12" sm="6">
              <v-card @click="selecionarNovoItem(sobremesa)" :class="{ 'selected-item': itemSelecionado?.id === sobremesa.id }" class="item-card">
                <v-img :src="sobremesa.imagem || '/img/default-dessert.jpg'" height="120" cover />
                <v-card-title class="text-subtitle-2">{{ sobremesa.nome }}</v-card-title>
                <v-card-text class="pa-2">
                  <p class="text-h6 font-weight-bold">R$ {{ sobremesa.preco.toFixed(2) }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-textarea v-model="observacoes" label="Observações" rows="2" class="mt-4" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialogSobremesa = false">Cancelar</v-btn>
          <v-btn color="primary" @click="confirmarBebidaSobremesa" :disabled="!itemSelecionado">Atualizar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog para Editar Prato Montável -->
    <v-dialog v-model="dialogPratoMontavel" max-width="800px" @update:model-value="!$event && limparDialogs()">
      <v-card>
        <v-card-title>Editar Prato Personalizado</v-card-title>
        <v-card-text>
          <p class="mb-4">Altere os ingredientes do seu prato:</p>
          <p class="text-h6 font-weight-bold">
            Preço Final: R$ {{ precoCalculadoPratoMontavel.toFixed(2) }}
          </p>
          <v-row>
            <v-col
              v-for="ingrediente in getIngredientesDisponiveis"
              :key="ingrediente.id"
              cols="12" sm="6" md="4"
            >
              <v-card 
                @click="selecionarIngrediente(ingrediente)"
                :class="{ 'selected-ingredient': ingredientesSelecionados.find(ing => ing.id === ingrediente.id) }"
                class="item-card"
              >
                <v-img :src="ingrediente.imagem || '/img/default-ingredient.jpg'" height="120" cover />
                <v-card-title class="text-subtitle-1">{{ ingrediente.nome }}</v-card-title>
                <v-card-text class="pa-2">
                  <p class="text-h6 font-weight-bold">R$ {{ ingrediente.preco.toFixed(2) }}</p>
                </v-card-text>
                <div v-if="ingredientesSelecionados.find(ing => ing.id === ingrediente.id)" class="selection-indicator">
                  <v-icon color="white">mdi-check</v-icon>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <v-textarea
            v-model="observacoes"
            label="Observações"
            rows="2"
            class="mt-4"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialogPratoMontavel = false">Cancelar</v-btn>
          <v-btn color="primary" @click="confirmarEdicaoPratoMontavel">Atualizar Prato</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useCardapioStore, type Item, type PratoFixo } from '@/stores/cardapio'
import { useCarrinhoStore, type ItemCarrinho } from '@/stores/carrinho'
import { useAdminStore } from '@/stores/admin'
import { storeToRefs } from 'pinia'

// --- Stores ---
const cardapioStore = useCardapioStore()
const carrinhoStore = useCarrinhoStore()
const adminStore = useAdminStore()

// --- Refs from Stores ---
const { getPratosFixosDisponiveis, getIngredientesDisponiveis, getBebidasDisponiveis, getSobremesasDisponiveis } = storeToRefs(cardapioStore)
const { itens, totalItens, totalPreco, carrinhoVazio } = storeToRefs(carrinhoStore)
const { configuracoes } = storeToRefs(adminStore)

// --- State ---
const tabAtiva = ref('pratos-fixos')
const mostrarCarrinho = ref(false)
const novosItensAdicionados = ref(0)

// Dialogs
const dialogPratoFixo = ref(false)
const dialogPratoMontavel = ref(false)
const dialogBebida = ref(false)
const dialogSobremesa = ref(false)
const dialogFinalizarPedido = ref(false)

// Shared State for Dialogs
const itemEmEdicao = ref<ItemCarrinho | null>(null)
const observacoes = ref('')

// Prato Fixo State
const pratoSelecionado = ref<PratoFixo | null>(null)
const modificacoes = reactive({
  carne: '',
  salada: [] as string[],
})

// Prato Montável State
const ingredientesSelecionados = ref<Item[]>([])

// Edição de Bebida/Sobremesa
const itemSelecionado = ref<Item | null>(null)

// Finalizar Pedido
const dadosCliente = reactive({
  nome: '',
  telefone: '',
  endereco: '',
})

// --- Computed Properties ---
const precoCalculadoPratoFixo = computed(() => {
  if (!pratoSelecionado.value) return 0

  const pratoBase = pratoSelecionado.value
  const custoCarne = pratoBase.opcoes?.carne?.find(o => o.nome === modificacoes.carne)?.preco || 0
  const custoSalada = pratoBase.opcoes?.salada
    ?.filter(o => modificacoes.salada.includes(o.nome))
    .reduce((total, s) => total + s.preco, 0) || 0

  return pratoBase.preco + custoCarne + custoSalada
})

const precoCalculadoPratoMontavel = computed(() => {
  if (ingredientesSelecionados.value.length === 0) return 0;
  return ingredientesSelecionados.value.reduce((total, ing) => total + ing.preco, 0);
});

// --- Funções ---

const limparDialogs = () => {
    itemEmEdicao.value = null;
    observacoes.value = '';
    pratoSelecionado.value = null;
    modificacoes.carne = '';
    modificacoes.salada = [];
    ingredientesSelecionados.value = [];
    itemSelecionado.value = null;
};

const selecionarPratoFixo = (prato: PratoFixo) => {
  limparDialogs();
  pratoSelecionado.value = prato;
  dialogPratoFixo.value = true;
};

const adicionarAoCarrinho = (item: Item) => {
  carrinhoStore.adicionarItem(item);
  mostrarNotificacao(`${item.nome} adicionado ao carrinho!`);
  novosItensAdicionados.value++;
};

const confirmarPratoFixo = () => {
  if (!pratoSelecionado.value) return;

  const precoFinal = precoCalculadoPratoFixo.value;
  const modsFormatado = {
    carne: modificacoes.carne || undefined,
    salada: modificacoes.salada.length > 0 ? modificacoes.salada.sort() : undefined,
  };

  if (itemEmEdicao.value) {
    carrinhoStore.atualizarItem(itemEmEdicao.value.id, {
      preco: precoFinal,
      modificacoes: modsFormatado,
      observacoes: observacoes.value || undefined,
    });
    mostrarNotificacao(`${pratoSelecionado.value.nome} atualizado!`);
  } else {
    carrinhoStore.adicionarPratoFixo(pratoSelecionado.value, precoFinal, modsFormatado, observacoes.value || undefined);
    mostrarNotificacao(`${pratoSelecionado.value.nome} adicionado!`);
    novosItensAdicionados.value++;
  }
  
  dialogPratoFixo.value = false;
  limparDialogs();
};

const selecionarIngrediente = (ingrediente: Item) => {
  const index = ingredientesSelecionados.value.findIndex(ing => ing.id === ingrediente.id);
  if (index > -1) {
    ingredientesSelecionados.value.splice(index, 1);
  } else {
    ingredientesSelecionados.value.push(ingrediente);
  }
};

const finalizarPratoMontavel = () => {
  if (ingredientesSelecionados.value.length === 0) return;

  const precoFinal = precoCalculadoPratoMontavel.value;
  const ingredientesNomes = ingredientesSelecionados.value.map(i => i.nome);
  
  carrinhoStore.adicionarPratoMontavel(precoFinal, ingredientesNomes, observacoes.value || undefined);
  
  mostrarNotificacao('Prato personalizado adicionado!');
  novosItensAdicionados.value++;
  ingredientesSelecionados.value = [] // Limpa a seleção após adicionar
  observacoes.value = ''
};

const confirmarEdicaoPratoMontavel = () => {
  if (!itemEmEdicao.value) return;

  const precoFinal = precoCalculadoPratoMontavel.value;
  const ingredientesNomes = ingredientesSelecionados.value.map(i => i.nome);
  
  carrinhoStore.atualizarItem(itemEmEdicao.value.id, {
    preco: precoFinal,
    modificacoes: { ingredientes: ingredientesNomes },
    observacoes: observacoes.value || undefined,
  });

  mostrarNotificacao('Prato personalizado atualizado!');
  dialogPratoMontavel.value = false;
  limparDialogs();
};


const confirmarBebidaSobremesa = () => {
  if (!itemEmEdicao.value || !itemSelecionado.value) return;

  carrinhoStore.atualizarItem(itemEmEdicao.value.id, {
    nome: itemSelecionado.value.nome,
    preco: itemSelecionado.value.preco,
    observacoes: observacoes.value || undefined,
  });

  mostrarNotificacao('Item atualizado com sucesso!');
  dialogBebida.value = false;
  dialogSobremesa.value = false;
  limparDialogs();
};

const editarItem = (item: ItemCarrinho) => {
  limparDialogs();
  itemEmEdicao.value = item;
  observacoes.value = item.observacoes || '';

  switch (item.tipo) {
    case 'prato-fixo': {
      const pratoOriginal = cardapioStore.pratosFixos.find(p => p.nome === item.nome);
      if (pratoOriginal) {
        pratoSelecionado.value = pratoOriginal;
        modificacoes.carne = item.modificacoes?.carne || '';
        modificacoes.salada = item.modificacoes?.salada || [];
        dialogPratoFixo.value = true;
      }
      break;
    }
    case 'prato-montavel': {
      const ingredientesNomes = item.modificacoes?.ingredientes || [];
      ingredientesSelecionados.value = cardapioStore.ingredientes.filter(ing => 
        ingredientesNomes.includes(ing.nome)
      );
      dialogPratoMontavel.value = true;
      break;
    }
    case 'item': {
      const itemOriginal = [...cardapioStore.bebidas, ...cardapioStore.sobremesas].find(i => i.nome === item.nome);
      if (itemOriginal) {
          itemSelecionado.value = itemOriginal;
          if (itemOriginal.categoria === 'bebida') dialogBebida.value = true;
          else dialogSobremesa.value = true;
      }
      break;
    }
  }
};

const selecionarNovoItem = (item: Item) => {
  itemSelecionado.value = item;
}

const { aumentarQuantidade, diminuirQuantidade, removerItem, limparCarrinho } = carrinhoStore;

const mostrarNotificacao = (mensagem: string, tipo: 'success' | 'error' = 'success') => {
  const notificacao = document.createElement('div');
  notificacao.className = `notificacao ${tipo}`;
  notificacao.textContent = mensagem;
  notificacao.style.cssText = `
    padding: 12px 20px; 
    border-radius: 8px; 
    color: white; 
    font-weight: 500; 
    animation: slideIn 0.3s ease-out; 
    ${tipo === 'success' ? 'background-color: #4CAF50;' : 'background-color: #f44336;'}
  `;
  
  let notificacoesContainer = document.getElementById('notificacoes-container');
  if (!notificacoesContainer) {
    notificacoesContainer = document.createElement('div');
    notificacoesContainer.id = 'notificacoes-container';
    notificacoesContainer.style.cssText = `
      position: fixed; 
      bottom: 20px; 
      right: 20px; 
      z-index: 9999; 
      display: flex; 
      flex-direction: column; 
      align-items: flex-end; 
      gap: 10px;
    `;
    document.body.appendChild(notificacoesContainer);
  }
  
  notificacoesContainer.appendChild(notificacao);
  
  setTimeout(() => {
    notificacao.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      if (notificacao.parentNode) {
        notificacao.parentNode.removeChild(notificacao);
      }
    }, 300);
  }, 3000);
};

const abrirCarrinho = () => {
  mostrarCarrinho.value = true;
  novosItensAdicionados.value = 0;
};

const finalizarPedido = () => {
  if (carrinhoVazio.value) {
    mostrarNotificacao('Seu carrinho está vazio!', 'error');
    return;
  }
  dialogFinalizarPedido.value = true;
};

const enviarParaWhatsApp = () => {
  if (!dadosCliente.nome || !dadosCliente.telefone || !dadosCliente.endereco) {
    alert('Por favor, preencha todos os campos');
    return;
  }

  let mensagem = `*Novo Pedido*\n\n`;
  mensagem += `*Cliente:* ${dadosCliente.nome}\n`;
  mensagem += `*Telefone:* ${dadosCliente.telefone}\n`;
  mensagem += `*Endereço:* ${dadosCliente.endereco}\n\n`;
  mensagem += `*Itens do Pedido:*\n`;

  itens.value.forEach(item => {
    mensagem += `*${item.quantidade}x ${item.nome}* - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    if (item.tipo === 'prato-fixo' && item.modificacoes) {
      if (item.modificacoes.carne) mensagem += `  - Carne: ${item.modificacoes.carne}\n`;
      if (item.modificacoes.salada?.length) mensagem += `  - Salada: ${item.modificacoes.salada.join(', ')}\n`;
    }
    if (item.tipo === 'prato-montavel' && item.modificacoes?.ingredientes) {
      mensagem += `  - Ingredientes: ${item.modificacoes.ingredientes.join(', ')}\n`;
    }
    if (item.observacoes) {
      mensagem += `  - Obs: ${item.observacoes}\n`;
    }
  });

  mensagem += `\n*Total do Pedido: R$ ${totalPreco.value.toFixed(2)}*`;

  const urlWhatsApp = adminStore.getWhatsAppUrl(encodeURIComponent(mensagem));
  window.open(urlWhatsApp, '_blank');

  dialogFinalizarPedido.value = false;
  mostrarCarrinho.value = false;
  
  limparCarrinho();
  
  dadosCliente.nome = '';
  dadosCliente.telefone = '';
  dadosCliente.endereco = '';
};
</script>

<style>
.novo-item-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 10px;
  height: 10px;
  background-color: #FF5252;
  border-radius: 50%;
  border: 2px solid white;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.selected-ingredient, .selected-item {
  border: 3px solid #FF6B35;
  box-shadow: 0 0 10px rgba(255, 107, 53, 0.7);
  position: relative;
}

.selection-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #FF6B35;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
}

.item-card {
  transition: transform 0.2s;
}
.item-card:hover {
  transform: translateY(-5px);
}
</style> 