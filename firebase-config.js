// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// SUA CONFIGURAÇÃO FIREBASE (COLE AQUI)
const firebaseConfig = {
  apiKey: "AIzaSyA-6af42JySuXGkfm-A_2Hsa3fC5RtinoA",
  authDomain: "copom-lembretes-firebase.firebaseapp.com",
  projectId: "copom-lembretes-firebase",
  storageBucket: "copom-lembretes-firebase.firebasestorage.app",
  messagingSenderId: "789960838215",
  appId: "1:789960838215:web:0cbd5016678ee87d763562",
  measurementId: "G-ZLB8WM2T47"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Login automático anônimo
signInAnonymously(auth).catch((error) => {
    console.error('Erro na autenticação:', error);
});

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
            ? '<i class="fas fa-wifi"></i><span>Conectado ao Firebase</span>'
            : '<i class="fas fa-wifi"></i><span>Offline - Dados serão sincronizados</span>';
    }
}