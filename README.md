# 📝 Sistema de Lembretes - Passagem e Serviço

Sistema completo de gerenciamento de lembretes para anotações de passagem e serviço, com atualização em tempo real usando Supabase.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

## ✨ Funcionalidades

- ✅ **Criar lembretes** com título, conteúdo e autor
- ✏️ **Editar lembretes** existentes
- 🗑️ **Excluir lembretes** com confirmação
- 🔄 **Atualização em tempo real** - sem necessidade de recarregar a página
- 💾 **Persistência de dados** - salvamento permanente no Supabase
- 📱 **Design responsivo** - funciona em desktop, tablet e mobile
- 🎨 **Interface moderna** - com gradientes e animações suaves
- 🔔 **Notificações** - feedback visual para todas as ações
- 🌐 **Suporte offline** - indicador de status de conexão

## 🚀 Demo

![Screenshot do Sistema](https://via.placeholder.com/800x400/2d5016/ffffff?text=Sistema+de+Lembretes)

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
  - HTML5
  - CSS3 (Grid, Flexbox, Animations)
  - JavaScript ES6+ (Modules)
  - Font Awesome (Ícones)

- **Backend:**
  - Supabase (PostgreSQL)
  - Supabase Realtime (WebSockets)

## 📋 Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Conta gratuita no [Supabase](https://supabase.com)
- Servidor web local ou hospedagem web

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/sistema-lembretes.git
cd sistema-lembretes
```

### 2. Configure o Supabase

#### 2.1. Crie uma conta no Supabase
- Acesse [supabase.com](https://supabase.com)
- Crie uma conta gratuita
- Crie um novo projeto

#### 2.2. Crie a tabela no banco de dados
No **SQL Editor** do Supabase, execute o seguinte código:

```sql
-- Criar tabela de lembretes
CREATE TABLE lembretes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE lembretes ENABLE ROW LEVEL SECURITY;

-- Permitir leitura para todos
CREATE POLICY "Permitir leitura para todos" ON lembretes
  FOR SELECT USING (true);

-- Permitir inserção para todos
CREATE POLICY "Permitir inserção para todos" ON lembretes
  FOR INSERT WITH CHECK (true);

-- Permitir atualização para todos
CREATE POLICY "Permitir atualização para todos" ON lembretes
  FOR UPDATE USING (true);

-- Permitir exclusão para todos
CREATE POLICY "Permitir exclusão para todos" ON lembretes
  FOR DELETE USING (true);
```

#### 2.3. Obtenha suas credenciais
- Vá em **Settings** → **API**
- Copie:
  - **Project URL** (ex: `https://xxxxx.supabase.co`)
  - **anon public key**

### 3. Configure o projeto

Abra o arquivo `supabase-config.js` e substitua as credenciais:

```javascript
const SUPABASE_URL = 'https://seu-projeto.supabase.co'; // Cole sua URL aqui
const SUPABASE_ANON_KEY = 'sua-chave-anon-aqui'; // Cole sua chave aqui
```

### 4. Execute o projeto

#### Opção 1: Usando Python (recomendado)
```bash
python -m http.server 8000
```

#### Opção 2: Usando Node.js
```bash
npx http-server
```

#### Opção 3: Usando Live Server (VS Code)
- Instale a extensão "Live Server"
- Clique com botão direito no `index.html`
- Selecione "Open with Live Server"

Acesse: `http://localhost:8000`

## 📁 Estrutura do Projeto

```
sistema-lembretes/
├── index.html              # Página principal
├── script.js               # Lógica da aplicação
├── supabase-config.js      # Configuração do Supabase
├── styles.css              # Estilos CSS
├── img/
│   └── copom.png          # Logo do COPOM
└── README.md              # Documentação
```

## 🎯 Como Usar

### Adicionar um Lembrete
1. Preencha o **nome do responsável**
2. Digite o **título do lembrete**
3. Escreva o **conteúdo**
4. Clique em **"Adicionar Lembrete"**

### Editar um Lembrete
1. Clique no ícone de **edição** (✏️) no card do lembrete
2. Modifique os campos desejados
3. Clique em **"Salvar"**

### Excluir um Lembrete
1. Clique no ícone de **exclusão** (🗑️) no card do lembrete
2. Confirme a exclusão

### Atalhos de Teclado
- **Ctrl + Enter** - Adicionar lembrete rapidamente
- **Esc** - Fechar modal de edição

## 🌐 Deploy

### Netlify
1. Faça login no [Netlify](https://netlify.com)
2. Arraste a pasta do projeto para o Netlify Drop
3. Configure as variáveis de ambiente (opcional)

### Vercel
```bash
npm i -g vercel
vercel
```

### GitHub Pages
1. Vá em **Settings** → **Pages**
2. Selecione a branch `main`
3. Clique em **Save**

## 🔐 Segurança

- ✅ **Row Level Security (RLS)** habilitado no Supabase
- ✅ **Escape de HTML** para prevenir XSS
- ✅ **Validação de campos** no frontend
- ✅ **Confirmação de exclusão** para prevenir perdas acidentais

## 📊 Limites do Plano Gratuito (Supabase)

| Recurso | Limite |
|---------|--------|
| Banco de dados | 500MB |
| Requisições API | 500k/mês |
| Realtime | Incluído |
| Armazenamento | 1GB |
| Banda | 5GB/mês |

## 🐛 Problemas Conhecidos

- O Realtime pode ter latência de 1-2 segundos em conexões lentas
- Imagens do logo devem estar na pasta `img/`

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- Email: seu-email@exemplo.com

## 🙏 Agradecimentos

- [Supabase](https://supabase.com) - Backend as a Service
- [Font Awesome](https://fontawesome.com) - Ícones
- Equipe COPOM - Inspiração do projeto

## 📞 Suporte

Se você tiver alguma dúvida ou problema:

1. Abra uma [Issue](https://github.com/seu-usuario/sistema-lembretes/issues)
2. Consulte a [Documentação do Supabase](https://supabase.com/docs)
3. Entre em contato pelo email

---

⭐ **Se este projeto foi útil para você, deixe uma estrela!** ⭐