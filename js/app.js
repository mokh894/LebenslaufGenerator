// Main Application Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the CV Editor
    cvEditor = new CVEditor();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+S to save
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            cvEditor.saveData();
        }
        
        // Ctrl+P to print
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            cvEditor.printCV();
        }
        
        // Escape to close modal
        if (e.key === 'Escape') {
            const modal = document.getElementById('section-modal');
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        }
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('section-modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Add export/import functionality
    addExportImportFeatures();
    
    // Add responsive behavior
    handleResponsiveLayout();
    
    // Initialize tooltips and help text
    initializeHelpSystem();
    
    console.log('Lebenslauf Generator erfolgreich initialisiert!');
});

// Export/Import functionality
function addExportImportFeatures() {
    const header = document.querySelector('.header-actions');
    
    // Add export button
    const exportBtn = document.createElement('button');
    exportBtn.className = 'btn btn-secondary';
    exportBtn.textContent = 'Exportieren';
    exportBtn.onclick = exportData;
    
    // Add import button
    const importBtn = document.createElement('button');
    importBtn.className = 'btn btn-secondary';
    importBtn.textContent = 'Importieren';
    importBtn.onclick = () => document.getElementById('import-file').click();
    
    // Add hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'import-file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    fileInput.onchange = importData;
    
    header.insertBefore(exportBtn, header.firstChild);
    header.insertBefore(importBtn, header.firstChild);
    document.body.appendChild(fileInput);
}

function exportData() {
    const data = cvStorage.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `lebenslauf-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    cvEditor.showMessage('Daten erfolgreich exportiert!', 'success');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            const success = cvStorage.importData(importedData);
            
            if (success) {
                // Reload the application with new data
                location.reload();
            } else {
                cvEditor.showMessage('Fehler beim Importieren der Daten.', 'error');
            }
        } catch (error) {
            cvEditor.showMessage('Ungültige Datei. Bitte wählen Sie eine gültige JSON-Datei.', 'error');
        }
    };
    reader.readAsText(file);
}

// Responsive layout handling
function handleResponsiveLayout() {
    function checkLayout() {
        const sidebar = document.querySelector('.editor-sidebar');
        const preview = document.querySelector('.cv-preview');
        
        if (window.innerWidth <= 768) {
            // Mobile layout
            sidebar.style.order = '1';
            preview.style.order = '2';
        } else {
            // Desktop layout
            sidebar.style.order = '0';
            preview.style.order = '0';
        }
    }
    
    checkLayout();
    window.addEventListener('resize', checkLayout);
}

// Help system initialization
function initializeHelpSystem() {
    // Add help tooltips to form fields
    const helpTexts = {
        'firstName': 'Ihr Vorname',
        'lastName': 'Ihr Nachname',
        'email': 'Ihre E-Mail-Adresse für Kontaktaufnahme',
        'phone': 'Ihre Telefonnummer',
        'address': 'Ihre Straße und Hausnummer',
        'city': 'Ihre Stadt',
        'postalCode': 'Ihre Postleitzahl',
        'birthDate': 'Ihr Geburtsdatum (optional)',
        'nationality': 'Ihre Staatsangehörigkeit (optional)',
        'profile': 'Eine kurze Zusammenfassung Ihrer Qualifikationen und Ziele'
    };
    
    Object.keys(helpTexts).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.title = helpTexts[fieldId];
        }
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
function optimizePerformance() {
    // Debounce preview updates
    const originalUpdatePreview = cvEditor.updatePreview;
    cvEditor.updatePreview = debounce(originalUpdatePreview.bind(cvEditor), 300);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Anwendungsfehler:', e.error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message error';
    errorDiv.textContent = 'Ein Fehler ist aufgetreten. Bitte laden Sie die Seite neu.';
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        if (document.body.contains(errorDiv)) {
            document.body.removeChild(errorDiv);
        }
    }, 5000);
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registriert:', registration.scope);
            })
            .catch(function(error) {
                console.log('ServiceWorker Registrierung fehlgeschlagen:', error);
            });
    });
}