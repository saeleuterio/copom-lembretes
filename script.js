// Array para armazenar os lembretes
let notes = [];
let editingNoteId = null;

// Função para gerar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Função para formatar data
function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// Função para adicionar novo lembrete
function addNote() {
    const authorName = document.getElementById('authorName').value.trim();
    const noteTitle = document.getElementById('noteTitle').value.trim();
    const noteContent = document.getElementById('noteContent').value.trim();

    // Validação dos campos
    if (!authorName) {
        alert('Por favor, digite o nome do responsável!');
        document.getElementById('authorName').focus();
        return;
    }

    if (!noteTitle) {
        alert('Por favor, digite o título do lembrete!');
        document.getElementById('noteTitle').focus();
        return;
    }

    if (!noteContent) {
        alert('Por favor, digite o conteúdo do lembrete!');
        document.getElementById('noteContent').focus();
        return;
    }

    // Criar novo lembrete
    const newNote = {
        id: generateId(),
        author: authorName,
        title: noteTitle,
        content: noteContent,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    // Adicionar ao array
    notes.unshift(newNote); // unshift para adicionar no início

    // Limpar campos
    clearForm();

    // Renderizar lembretes
    renderNotes();

    // Mostrar mensagem de sucesso
    showSuccess('Lembrete adicionado com sucesso!');
}

// Função para limpar formulário
function clearForm() {
    document.getElementById('authorName').value = '';
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
}

// Função para renderizar lembretes
function renderNotes() {
    const container = document.getElementById('notesContainer');

    if (notes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-sticky-note"></i>
                <h3>Nenhum lembrete ainda</h3>
                <p>Adicione seu primeiro lembrete usando o formulário acima.<br>
                Organize suas tarefas e mantenha tudo sob controle!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = notes.map(note => `
        <div class="note-card" data-note-id="${note.id}">
            <div class="note-header">
                <div class="note-info">
                    <h3>${escapeHtml(note.title)}</h3>
                    <div class="note-author">
                        <i class="fas fa-user"></i>
                        ${escapeHtml(note.author)}
                    </div>
                </div>
                <div class="note-actions">
                    <button class="action-btn edit-btn" onclick="openEditModal('${note.id}')" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteNote('${note.id}')" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="note-content">
                ${escapeHtml(note.content).replace(/\n/g, '<br>')}
            </div>
            <div class="note-date">
                <i class="fas fa-clock"></i>
                Criado em: ${formatDate(note.createdAt)}
                ${note.updatedAt.getTime() !== note.createdAt.getTime() ? 
                    `<br><i class="fas fa-edit"></i> Editado em: ${formatDate(note.updatedAt)}` : ''}
            </div>
        </div>
    `).join('');
}

// Função para escapar HTML (prevenir XSS)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Função para abrir modal de edição
function openEditModal(noteId) {
    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    editingNoteId = noteId;
    
    document.getElementById('editAuthor').value = note.author;
    document.getElementById('editTitle').value = note.title;
    document.getElementById('editContent').value = note.content;
    
    document.getElementById('editModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll do body
}

// Função para fechar modal de edição
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll do body
    editingNoteId = null;
}

// Função para salvar edição
function saveEdit() {
    if (!editingNoteId) return;

    const editAuthor = document.getElementById('editAuthor').value.trim();
    const editTitle = document.getElementById('editTitle').value.trim();
    const editContent = document.getElementById('editContent').value.trim();

    // Validação
    if (!editAuthor || !editTitle || !editContent) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    // Encontrar e atualizar o lembrete
    const noteIndex = notes.findIndex(n => n.id === editingNoteId);
    if (noteIndex !== -1) {
        notes[noteIndex].author = editAuthor;
        notes[noteIndex].title = editTitle;
        notes[noteIndex].content = editContent;
        notes[noteIndex].updatedAt = new Date();
        
        renderNotes();
        closeEditModal();
        showSuccess('Lembrete atualizado com sucesso!');
    }
}

// Função para deletar lembrete
function deleteNote(noteId) {
    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    const confirmDelete = confirm(
        `Tem certeza que deseja excluir o lembrete "${note.title}"?\n\nEsta ação não pode ser desfeita.`
    );

    if (confirmDelete) {
        notes = notes.filter(n => n.id !== noteId);
        renderNotes();
        showSuccess('Lembrete excluído com sucesso!');
    }
}

// Função para mostrar mensagem de sucesso
function showSuccess(message) {
    // Remover notificação anterior se existir
    const existingNotification = document.querySelector('.success-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(39, 174, 96, 0.3);
        z-index: 2000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    // Adicionar animação CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar lembretes iniciais (vazio)
    renderNotes();

    // Enter no formulário
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            addNote();
        }
    });

    // Fechar modal ao clicar fora
    document.getElementById('editModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeEditModal();
        }
    });

    // Enter no modal de edição
    document.getElementById('editModal').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            saveEdit();
        }
        if (e.key === 'Escape') {
            closeEditModal();
        }
    });

    // Escape para fechar modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeEditModal();
        }
    });

    // Auto-focus no primeiro campo
    document.getElementById('authorName').focus();
});

// Função para exportar dados (funcionalidade extra)
function exportNotes() {
    if (notes.length === 0) {
        alert('Não há lembretes para exportar!');
        return;
    }

    const dataStr = JSON.stringify(notes, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `lembretes_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}