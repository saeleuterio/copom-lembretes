// supabase-config.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/+esm';

// ⚠️ SUBSTITUA COM SUAS CREDENCIAIS DO SUPABASE
// Encontre em: Project Settings > API
const SUPABASE_URL = 'https://fuzahmzraqhivaxizxor.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1emFobXpyYXFoaXZheGl6eG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzQyMDgsImV4cCI6MjA3NDc1MDIwOH0.xvgwaSBl0n3IV13ULpbBuQni6yoGhtLMGhSxPq9sijU';

// Criar cliente Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Status de conexão
window.addEventListener('online', () => {
    updateConnectionStatus(true);
});

window.addEventListener('offline', () => {
    updateConnectionStatus(false);
});

function updateConnectionStatus(isOnline) {
    const status = document.getElementById('connectionStatus');
    if (status) {
        status.className = `connection-status ${isOnline ? 'online' : 'offline'}`;
        status.innerHTML = isOnline 
            ? '<i class="fas fa-wifi"></i><span>Conectado ao Supabase</span>'
            : '<i class="fas fa-wifi"></i><span>Offline - Dados serão sincronizados</span>';
    }
}

// Verificar conexão inicial
updateConnectionStatus(navigator.onLine);