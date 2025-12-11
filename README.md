# 📝 Anotações e Lembretes - COPOM

## 📋 Sobre o Projeto

Sistema web colaborativo para **gerenciamento de anotações e lembretes** do COPOM - Centro de Operações da Polícia Militar (CPI-10). Utiliza **Supabase** como backend, oferecendo sincronização em tempo real, drag-and-drop para reorganização e interface moderna e responsiva.

![Screenshot do Sistema](./img/screenshot.png)

## ✨ Funcionalidades Principais

### 📝 Gestão de Lembretes
- **Criar Lembretes**: Nome do responsável, título e conteúdo
- **Editar Lembretes**: Modal de edição com validação
- **Visualização em Cards**: Layout em grid responsivo
- **Filtro Visual**: Cores e organização clara

### 🔄 Sincronização em Tempo Real
- **Realtime Supabase**: Atualizações instantâneas
- **Multi-usuário**: Vários acessos simultâneos
- **Auto-atualização**: Mudanças refletem automaticamente
- **Indicador de Conexão**: Status online/offline

### 🎯 Drag and Drop
- **Reordenar Cards**: Arraste para reorganizar
- **Persistência**: Ordem salva no banco
- **Feedback Visual**: Indicadores de movimento
- **Touch Support**: Funciona em mobile

### 📊 Informações Completas
- **Data de Criação**: Timestamp formatado
- **Data de Edição**: Se foi modificado
- **Responsável**: Nome do autor
- **Título e Conteúdo**: Totalmente customizáveis

### 🎨 Interface Moderna
- **Tema Verde**: Institucional COPOM
- **Design Glassmorphism**: Efeitos de vidro
- **Animações Suaves**: Transições em todos elementos
- **Responsivo**: Mobile-first design

### 🔐 Segurança
- **Escape XSS**: Prevenção contra ataques
- **Validação**: Todos os campos obrigatórios
- **Confirmações**: Exclusão com aviso
- **Supabase RLS**: Row Level Security

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: 
  - Gradientes complexos
  - Glassmorphism effects
  - Grid Layout avançado
  - Animações CSS3
  - Media queries
- **JavaScript ES6+**: 
  - Módulos ES6
  - Async/await
  - Drag & Drop API
  - Event delegation
  - DOM manipulation

### Backend/Database
- **Supabase 2.39.3**: Backend as a Service
  - **PostgreSQL**: Banco relacional
  - **Realtime**: WebSocket subscriptions
  - **Storage**: Armazenamento de dados
  - **Row Level Security**: Segurança por linha

### Bibliotecas
- **Font Awesome 6.0**: Ícones vetoriais
- **Supabase JS Client**: SDK oficial

## 📁 Estrutura do Projeto

```
lembretes-copom/
│
├── index.html           # Interface do usuário
├── styles.css           # Estilos e animações
├── script.js            # Lógica principal
├── supabase-config.js   # Configuração Supabase
├── README.md            # Documentação
│
└── img/
    ├── favicon.png         # Ícone da página
    ├── copom.png           # Logo COPOM
    └── screenshot.png      # Screenshot do projeto
```

## 🚀 Como Usar

### Pré-requisitos

1. **Conta Supabase**: Gratuita em https://supabase.com
2. **Navegador moderno**: Chrome, Firefox, Edge
3. **Conexão internet**: Para Supabase

### Configuração do Supabase

#### 1. Criar Projeto no Supabase

1. **Acesse**: https://supabase.com
2. **Faça login** ou crie conta gratuita
3. **Clique em**: "New Project"
4. **Preencha**:
   - **Name**: Lembretes COPOM
   - **Database Password**: Crie uma senha forte
   - **Region**: Escolha o mais próximo (ex: South America - São Paulo)
5. **Clique em**: "Create new project"
6. **Aguarde**: 1-2 minutos para provisionar

#### 2. Criar Tabela no Banco de Dados

1. **No menu lateral**, clique em **"Table Editor"**
2. **Clique em**: "Create a new table"
3. **Configure a tabela**:

```sql
-- Nome da tabela: lembretes
-- Colunas:
```

| Coluna | Tipo | Default | Null? | Descrição |
|--------|------|---------|-------|-----------|
| id | uuid | gen_random_uuid() | NO | Chave primária |
| created_at | timestamptz | now() | NO | Data criação |
| updated_at | timestamptz | now() | YES | Data edição |
| author | text | - | NO | Nome responsável |
| title | text | - | NO | Título |
| content | text | - | NO | Conteúdo |
| position | int4 | 0 | NO | Ordem/posição |

4. **SQL direto** (alternativa):

```sql
-- Criar tabela
CREATE TABLE lembretes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now(),
    author text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    position integer DEFAULT 0 NOT NULL
);

-- Habilitar Row Level Security
ALTER TABLE lembretes ENABLE ROW LEVEL SECURITY;

-- Criar políticas (permitir tudo - AJUSTE EM PRODUÇÃO)
CREATE POLICY "Permitir leitura pública" 
ON lembretes FOR SELECT 
USING (true);

CREATE POLICY "Permitir inserção pública" 
ON lembretes FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Permitir atualização pública" 
ON lembretes FOR UPDATE 
USING (true);

CREATE POLICY "Permitir exclusão pública" 
ON lembretes FOR DELETE 
USING (true);
```

#### 3. Habilitar Realtime

1. **No menu**, clique em **"Database"** → **"Replication"**
2. **Encontre a tabela** "lembretes"
3. **Toggle ON** o Realtime
4. **Salve as alterações**

#### 4. Obter Credenciais

1. **No menu**, clique no ícone **"Settings"** (engrenagem)
2. **Clique em**: "API"
3. **Copie**:
   - **Project URL**: `https://seu-projeto.supabase.co`
   - **anon/public key**: Chave grande começando com `eyJ...`

#### 5. Configurar o Projeto

Edite o arquivo `supabase-config.js`:

```javascript
// ⚠️ SUBSTITUA COM SUAS CREDENCIAIS
const SUPABASE_URL = 'https://seu-projeto.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGc...sua-chave-aqui';
```

### Instalação Local

#### 1. Clone/Baixe o projeto
```bash
git clone https://github.com/seu-usuario/lembretes-copom.git
cd lembretes-copom
```

#### 2. Inicie um servidor local

**Opção A: Python 3**
```bash
python -m http.server 8000
```

**Opção B: Node.js**
```bash
npx http-server -p 8000
```

**Opção C: VS Code Live Server**
- Instale extensão "Live Server"
- Clique direito em `index.html` → "Open with Live Server"

#### 3. Acesse no navegador
```
http://localhost:8000
```

## 📊 Uso do Sistema

### Adicionar Lembrete

1. **Preencha os campos**:
   - Nome do responsável
   - Título do lembrete
   - Conteúdo

2. **Clique em "Adicionar Lembrete"**

3. **Card aparece** automaticamente na grade

4. **Atalho**: `Ctrl + Enter` para adicionar rapidamente

### Editar Lembrete

1. **Clique no ícone de edição** (lápis) no card

2. **Modal abre** com dados preenchidos

3. **Modifique** o que desejar

4. **Clique em "Salvar"**

5. **Atalho**: `Esc` para fechar modal

### Reorganizar Lembretes

1. **Clique e segure** no ícone de grip (≡≡) no topo do card

2. **Arraste** o card para a posição desejada

3. **Solte** o mouse

4. **Ordem salva** automaticamente no Supabase

### Excluir Lembrete

> **Nota**: Botão de exclusão está comentado no código por segurança. Para habilitar:

1. Abra `script.js`
2. Descomente as linhas do botão delete em `renderNotes()`
3. Função `deleteNote()` já está pronta

## 🔧 Estrutura do Supabase

### Tabela: `lembretes`

Cada registro contém:

```javascript
{
  id: "123e4567-e89b-12d3-a456-426614174000",  // UUID
  created_at: "2025-01-15T10:30:00.000Z",      // Timestamp
  updated_at: "2025-01-15T14:20:00.000Z",      // Timestamp (null se não editado)
  author: "Cabo Silva",                         // String
  title: "Reunião importante",                  // String
  content: "Detalhes da reunião...",            // String
  position: 0                                   // Integer
}
```

### Políticas de Segurança (RLS)

#### Desenvolvimento/Teste (atual):
```sql
-- Permite tudo (não recomendado para produção)
CREATE POLICY "Acesso público total" 
ON lembretes 
FOR ALL 
USING (true);
```

#### Produção (recomendado):
```sql
-- Leitura pública, escrita autenticada
CREATE POLICY "Leitura pública" 
ON lembretes FOR SELECT 
USING (true);

CREATE POLICY "Escrita autenticada" 
ON lembretes FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Atualização apenas do autor" 
ON lembretes FOR UPDATE 
USING (auth.uid() = user_id); -- adicionar coluna user_id

CREATE POLICY "Exclusão apenas do autor" 
ON lembretes FOR DELETE 
USING (auth.uid() = user_id);
```

## 🎨 Design e Interface

### Paleta de Cores - Tema Verde COPOM

```css
/* Cores Principais */
--primary-dark: #2d5016      /* Verde escuro */
--primary-light: #4a7c59     /* Verde médio */

/* Gradiente Principal */
background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)

/* Cores de Ação */
--edit-color: rgba(45, 80, 22, 0.1)    /* Verde claro */
--delete-color: rgba(231, 76, 60, 0.1) /* Vermelho claro */

/* Tons Neutros */
--text-dark: #333           /* Texto escuro */
--text-medium: #444         /* Texto médio */
--text-light: #666          /* Texto claro */
--border: rgba(0,0,0,0.05)  /* Borda sutil */
```

### Efeitos Visuais

#### Glassmorphism
```css
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.2);
```

#### Card Hover
```css
.note-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}
```

#### Drag State
```css
.note-card.dragging {
    opacity: 0.5;
    cursor: move;
}

.note-card.drag-over {
    border: 2px dashed #2d5016;
    background: rgba(45, 80, 22, 0.05);
}
```

### Animações

#### Modal Slide In
```css
@keyframes modalSlideIn {
    from { transform: translateY(-50px); opacity: 0 }
    to { transform: translateY(0); opacity: 1 }
}
```

#### Notification Slide
```css
@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0 }
    to { transform: translateX(0); opacity: 1 }
}
```

### Responsividade

| Breakpoint | Layout | Ajustes |
|------------|--------|---------|
| 1600px+ | 4-5 colunas | Cards 400px |
| 1200px+ | 3-4 colunas | Cards 350px |
| 768px | 1 coluna | Header vertical |
| 480px | 1 coluna | Padding reduzido |
| 320px | 1 coluna | Logos 45px |

## 🔄 Funcionamento Técnico

### Fluxo de Dados

```
1. Usuário preenche formulário
   ↓
2. Validação JavaScript
   ↓
3. addNote() chamada
   ↓
4. Supabase INSERT
   ├─ .from('lembretes')
   ├─ .insert([data])
   └─ .select()
   ↓
5. Realtime detecta mudança
   ↓
6. onSnapshot callback
   ↓
7. loadNotes() recarrega
   ↓
8. renderNotes() atualiza DOM
   ↓
9. setupDragAndDrop() ativa
```

### Realtime Subscription

```javascript
realtimeChannel = supabase
    .channel('public:lembretes')
    .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'lembretes'
    }, payload => loadNotes())
    .subscribe()
```

### Drag and Drop

```javascript
// 1. Usuário clica e arrasta
handleDragStart() → armazena elemento

// 2. Passa sobre outro card
handleDragOver() → permite drop

// 3. Solta o card
handleDrop() → 
  ├─ Reordena array local
  ├─ Atualiza positions no Supabase
  └─ Re-renderiza
```

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 90+ (Recomendado)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+
- ⚠️ IE11 (Não suportado - ES6 Modules)

### Recursos Necessários
- JavaScript habilitado
- ES6 Modules support
- Drag and Drop API
- WebSocket (Realtime)
- Conexão internet

### Limitações Supabase (Plano Gratuito)
- **Database**: 500 MB
- **Storage**: 1 GB
- **Bandwidth**: 2 GB/mês
- **Realtime**: Ilimitado
- **API Requests**: Ilimitado

## 🐛 Solução de Problemas

### Erro: "Failed to fetch"

**Causa**: Credenciais incorretas ou projeto pausado

**Solução**:
1. Verifique `SUPABASE_URL` e `SUPABASE_ANON_KEY`
2. Confirme que projeto está ativo no dashboard
3. Verifique conexão com internet

### Realtime não funciona

**Causas possíveis**:
1. Realtime não habilitado na tabela
2. Políticas RLS muito restritivas
3. WebSocket bloqueado

**Soluções**:
1. Database → Replication → Enable Realtime
2. Ajuste políticas RLS
3. Verifique firewall/proxy

### Drag and Drop não funciona

**Verificar**:
1. Atributo `draggable="true"` nos cards
2. Event listeners configurados
3. Console por erros JavaScript
4. Touch support em mobile

### Cards não aparecem

**Verificar**:
1. Tabela "lembretes" existe
2. Dados no banco (Table Editor)
3. Console por erros SQL
4. Políticas RLS permitem SELECT

### Modal não abre

**Verificar**:
1. ID do lembrete correto
2. Função `openEditModal()` global
3. CSS do modal (`display: none` → `block`)
4. Console por erros

## 🚀 Melhorias Futuras

### Funcionalidades
- [ ] Categorias/Tags para lembretes
- [ ] Filtro por responsável
- [ ] Busca em tempo real
- [ ] Cores personalizáveis por card
- [ ] Anexar arquivos (Supabase Storage)
- [ ] Lembretes com prazo/alarme
- [ ] Notificações push
- [ ] Markdown support
- [ ] Histórico de versões
- [ ] Compartilhar lembretes

### Técnicas
- [ ] Service Worker (PWA)
- [ ] Offline-first com sync
- [ ] Autenticação de usuários
- [ ] Permissões granulares
- [ ] Backup automático
- [ ] Export para PDF/Excel
- [ ] Dark mode
- [ ] Testes automatizados
- [ ] CI/CD pipeline
- [ ] Docker containerização

## 🔐 Segurança

### Recomendações para Produção

#### 1. Habilitar Autenticação
```javascript
// Adicionar login
const { user, session, error } = await supabase.auth.signInWithPassword({
  email: 'user@exemplo.com',
  password: 'senha123'
});
```

#### 2. Políticas RLS Estritas
```sql
-- Apenas usuários autenticados podem escrever
CREATE POLICY "Escrita autenticada" 
ON lembretes FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);
```

#### 3. Validação Backend
```sql
-- Adicionar constraints
ALTER TABLE lembretes 
ADD CONSTRAINT author_not_empty 
CHECK (char_length(author) > 0);
```

#### 4. Rate Limiting
```javascript
// Implementar throttle nas funções
const throttledAddNote = throttle(addNote, 1000);
```

#### 5. Sanitização de Inputs
```javascript
// Já implementado com escapeHtml()
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Diretrizes
- Mantenha código limpo e comentado
- Teste em múltiplos navegadores
- Documente novas features
- Siga padrões ES6+
- Otimize queries Supabase
- Não exponha credenciais

## 📄 Licença

Este projeto é de uso interno da **Polícia Militar do Estado de São Paulo - COPOM/CPI-10**.

Todos os direitos reservados.

## ⚠️ Avisos Importantes

- Sistema para uso operacional
- Dados salvos permanentemente no Supabase
- Backup regular recomendado
- Não compartilhe credenciais
- Configure RLS adequadamente
- Monitore limites do plano gratuito

---

## 👨‍💻 Desenvolvedor

**Saulo Eleutério**
- **Unidade**: COPOM Araçatuba - CPI-10
- **Email**: sauloeleuterio@policiamilitar.sp.gov.br
- **Telefone**: (18) 98804-0181

---

## 🙏 Agradecimentos

Agradecimento especial a:
- **Equipe COPOM/CPI-10** pelo feedback contínuo
- **Supabase** pela plataforma incrível
- **Comunidade Open Source** por tutoriais e suporte

---

## 📞 Suporte Técnico

### Para dúvidas sobre o sistema:
- **Email**: sauloeleuterio@policiamilitar.sp.gov.br
- **Telefone/WhatsApp**: (18) 98804-0181
- **Horário**: Segunda a Sexta, 8h às 18h

### Para questões do Supabase:
- **Documentação**: https://supabase.com/docs
- **Dashboard**: https://app.supabase.com
- **Discord**: https://discord.supabase.com

---

<div align="center">

### 📝 Anotações e Lembretes - COPOM

**© 2025 | Desenvolvido por Saulo Eleutério**

*"Organização e colaboração em tempo real"*

[![COPOM](https://img.shields.io/badge/COPOM-CPI--10-green?style=for-the-badge)]()
[![Supabase](https://img.shields.io/badge/Supabase-2.39.3-brightgreen?style=for-the-badge)]()
[![PM-SP](https://img.shields.io/badge/PM-SP-blue?style=for-the-badge)]()
[![Status](https://img.shields.io/badge/Status-Ativo-success?style=for-the-badge)]()
[![Realtime](https://img.shields.io/badge/Realtime-Enabled-orange?style=for-the-badge)]()

---

**Sistema desenvolvido para uso interno do COPOM - Araçatuba/SP**

*Polícia Militar do Estado de São Paulo*

**Tecnologia**: Supabase Realtime Database

</div>