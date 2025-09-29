// script.js
import { db } from './firebase-config.js';
import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc, 
    onSnapshot,
    orderBy,
    query,
    serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Variáveis globais
let editingNoteId = null;
let unsubscribe = null;

// Função para formatar data
function formatDate(timestamp) {
    if (!timestamp) return 'Data inválida';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// Função para adicionar novo lembrete
async function addNote() {
    const authorName = document.getElementById('authorName').value.trim();
    const noteTitle = document.getElementById('noteTitle').value.trim();
    const noteContent = document.getElementById('noteContent').value.trim();
    const addBtn = document.getElementById('addBtn');

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

    // Desabilitar botão durante salvamento
    if (addBtn) {
        addBtn.disabled = true;
        addBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
    }

    try {
        // Salvar no Firestore
        await addDoc(collection(db, 'lembretes'), {
            author: authorName,
            title: noteTitle,
            content: noteContent,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        // Limpar campos
        clearForm();
        showSuccess('Lembrete adicionado com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar lembrete:', error);
        showError('Erro ao salvar lembrete. Tente novamente.');
    } finally {
        // Reabilitar botão
        if (addBtn) {
            addBtn.disabled = false;
            addBtn.innerHTML = '<i class="fas fa-plus"></i> Adicionar Lembrete';
        }
    }
}

// Função para limpar formulário
function clearForm() {
    document.getElementById('authorName').value = '';
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
}

// Função para escutar lembretes em tempo real
function setupRealtimeListener() {
    const q = query(collection(db, 'lembretes'), orderBy('createdAt', 'desc'));
    
    unsubscribe = onSnapshot(q, (snapshot) => {
        const notes = [];
        snapshot.forEach((doc) => {
            notes.push({
                id: doc.id,
                ...doc.data()
            });
        });
        renderNotes(notes);
    }, (error) => {
        console.error('Erro ao escutar mudanças:', error);
        showError('Erro na conexão com o banco de dados');
    });
}

// Função para renderizar lembretes
function renderNotes(notes) {
    const container = document.getElementById('notesContainer');

    if (notes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-sticky-note"></i>
                <h3>Nenhum lembrete ainda</h3>
                <p>Adicione seu primeiro lembrete usando o formulário acima.<br>
                Os dados serão salvos permanentemente no Firebase!</p>
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
                ${note.updatedAt && note.updatedAt !== note.createdAt ? 
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
async function openEditModal(noteId) {
    try {
        const noteDoc = await getDocs(query(collection(db, 'lembretes')));
        let noteData = null;
        
        noteDoc.forEach((doc) => {
            if (doc.id === noteId) {
                noteData = { id: doc.id, ...doc.data() };
            }
        });

        if (!noteData) return;

        editingNoteId = noteId;
        
        document.getElementById('editAuthor').value = noteData.author;
        document.getElementById('editTitle').value = noteData.title;
        document.getElementById('editContent').value = noteData.content;
        
        document.getElementById('editModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Erro ao abrir modal de edição:', error);
        showError('Erro ao carregar dados do lembrete');
    }
}

// Função para fechar modal de edição
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    editingNoteId = null;
}

// Função para salvar edição
async function saveEdit() {
    if (!editingNoteId) return;

    const editAuthor = document.getElementById('editAuthor').value.trim();
    const editTitle = document.getElementById('editTitle').value.trim();
    const editContent = document.getElementById('editContent').value.trim();
    const saveBtn = document.getElementById('saveBtn');

    // Validação
    if (!editAuthor || !editTitle || !editContent) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    // Desabilitar botão durante salvamento
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
    }

    try {
        // Atualizar no Firestore
        await updateDoc(doc(db, 'lembretes', editingNoteId), {
            author: editAuthor,
            title: editTitle,
            content: editContent,
            updatedAt: serverTimestamp()
        });

        closeEditModal();
        showSuccess('Lembrete atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar lembrete:', error);
        showError('Erro ao atualizar lembrete. Tente novamente.');
    } finally {
        // Reabilitar botão
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i class="fas fa-save"></i> Salvar';
        }
    }
}

// Função para deletar lembrete
async function deleteNote(noteId) {
    const confirmDelete = confirm(
        'Tem certeza que deseja excluir este lembrete?\n\nEsta ação não pode ser desfeita.'
    );

    if (!confirmDelete) return;

    try {
        await deleteDoc(doc(db, 'lembretes', noteId));
        showSuccess('Lembrete excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir lembrete:', error);
        showError('Erro ao excluir lembrete. Tente novamente.');
    }
}

// Função para mostrar mensagem de sucesso
function showSuccess(message) {
    showNotification(message, 'success');
}

// Função para mostrar mensagem de erro
function showError(message) {
    showNotification(message, 'error');
}

// Função para mostrar notificações
function showNotification(message, type = 'success') {
    // Remover notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    // Estilos da notificação
    const bgColor = type === 'success' 
        ? 'linear-gradient(135deg, #2d5016, #4a7c59)'
        : 'linear-gradient(135deg, #c0392b, #e74c3c)';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Remover após 4 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 4000);
}

// Tornar funções globais para uso nos botões HTML
window.addNote = addNote;
window.openEditModal = openEditModal;
window.closeEditModal = closeEditModal;
window.saveEdit = saveEdit;
window.deleteNote = deleteNote;

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar listener em tempo real
    setupRealtimeListener();

    // Enter no formulário
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            addNote();
        }
    });

    // Fechar modal ao clicar fora
    document.getElementById('editModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
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
    const authorField = document.getElementById('authorName');
    if (authorField) {
        authorField.focus();
    }
});

// Limpar listener ao sair da página
window.addEventListener('beforeunload', () => {
    if (unsubscribe) {
        unsubscribe();
    }
});