# 🔒 Guia de Segurança - Cardápio Digital

## Proteções Implementadas

### 🛡️ **Proteções contra Injeção e Manipulação**

1. **Sanitização de Dados**
   - ✅ Todos os dados de entrada são sanitizados
   - ✅ Proteção contra XSS (Cross-Site Scripting)
   - ✅ Validação de URLs de imagem
   - ✅ Filtros contra caracteres perigosos

2. **Proteção de Rotas**
   - ✅ Middleware de autenticação para área admin
   - ✅ Validação de parâmetros de URL
   - ✅ Proteção contra redirecionamentos maliciosos
   - ✅ Logs de navegação para auditoria

3. **Proteção de Dados**
   - ✅ localStorage protegido contra manipulação
   - ✅ Validação de tipos de dados
   - ✅ Limites de quantidade e preços
   - ✅ Verificação de dados duplicados

### 🚫 **Limites de Segurança**

- **Carrinho**: Máximo 50 itens
- **Quantidade por item**: Máximo 20 unidades
- **Pedido mínimo**: R$ 5,00
- **Preço máximo por item**: R$ 1.000,00
- **Senha mínima**: 6 caracteres
- **Nome**: Apenas letras e espaços
- **Telefone**: 10-11 dígitos numéricos

### 🔐 **Recomendações para o Restaurante**

#### **1. Configuração Inicial**
```bash
# Altere a senha padrão imediatamente
Senha atual: admin123
Nova senha: Use uma senha forte com pelo menos 8 caracteres
```

#### **2. Hospedagem Segura**
- ✅ Use HTTPS obrigatório
- ✅ Configure headers de segurança no servidor
- ✅ Mantenha o sistema atualizado
- ✅ Faça backups regulares dos dados

#### **3. Configuração do Servidor**
```nginx
# Exemplo para Nginx
add_header X-Frame-Options "DENY";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Content-Security-Policy "default-src 'self'";
```

#### **4. Monitoramento**
- ✅ Monitore logs de acesso
- ✅ Verifique tentativas de login suspeitas
- ✅ Acompanhe alterações no cardápio
- ✅ Revise pedidos com valores anômalos

### 🚨 **Alertas de Segurança**

O sistema detecta e registra:
- Tentativas de acesso não autorizado
- Parâmetros suspeitos na URL
- Manipulação do localStorage
- Dados inválidos ou maliciosos
- Tentativas de spam no carrinho

### 📞 **Suporte de Segurança**

Em caso de suspeita de comprometimento:
1. Altere imediatamente a senha do administrador
2. Verifique os logs do navegador (F12 → Console)
3. Limpe o cache e localStorage se necessário
4. Entre em contato com o suporte técnico

### 🔄 **Atualizações de Segurança**

- Mantenha o sistema sempre atualizado
- Monitore vulnerabilidades conhecidas
- Implemente patches de segurança quando disponíveis
- Faça testes regulares de penetração

### 📋 **Checklist de Segurança**

- [ ] Senha alterada da padrão
- [ ] HTTPS configurado
- [ ] Headers de segurança ativos
- [ ] Backups configurados
- [ ] Monitoramento ativo
- [ ] Equipe treinada em segurança

---

**⚠️ IMPORTANTE**: Este sistema é projetado para uso local/pequeno negócio. Para uso em larga escala, considere implementar um backend com autenticação robusta e banco de dados seguro. 