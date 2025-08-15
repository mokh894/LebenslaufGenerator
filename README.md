# Lebenslauf Generator Pro

Ein moderner, professioneller Lebenslauf-Generator für deutsche CVs mit erweiterten Funktionen und flexibler Anpassung.

![Lebenslauf Generator Pro](assets/app-overview.png)

## 🌟 Funktionen

### ✨ Moderne Benutzeroberfläche
- **Professionelles Design** mit sauberer, intuitiver Benutzeroberfläche
- **Tabbed Interface** für organisierte Bearbeitung (Design, Inhalt, Layout)
- **Responsive Design** - funktioniert perfekt auf Desktop, Tablet und Mobil
- **Dunkle/Helle Farbschemata** mit anpassbaren Farben
- **Smooth Animationen** für eine premium Benutzererfahrung

### 📝 Umfassende CV-Erstellung
- **11+ Abschnittstypen**: Berufserfahrung, Ausbildung, Fähigkeiten, Sprachen, Projekte, Zertifikate, Ehrenamt, Auszeichnungen, Publikationen, Interessen, Referenzen
- **Rich-Text-Editor** mit Formatierungsoptionen (Fett, Kursiv, Listen)
- **Foto-Upload** mit Vorschau und automatischer Größenanpassung
- **Drag & Drop** zum Neuordnen der Abschnitte
- **Benutzerdefinierte Abschnitte** mit eigenen Titeln und Icons

### 🎨 Erweiterte Anpassung
- **4 Professionelle Vorlagen**: Modern, Professionell, Minimal, Kreativ
- **Flexible Layouts**: Einspaltig, Zweispaltig, Seitenleiste
- **Anpassbare Farben** mit Farbvoreinstellungen
- **Schriftarten-Auswahl**: Inter, Source Sans Pro, Playfair Display, Roboto
- **Schriftgröße und Abstände** individuell einstellbar
- **Zoom-Funktion** (50% - 200%) für bessere Bearbeitung

### 💾 Intelligente Datenverwaltung
- **Auto-Save** - Automatisches Speichern alle Sekunden
- **Undo/Redo System** mit 50-Level Historie
- **JSON Export/Import** für Backup und Datenaustausch
- **Local Storage** - Daten bleiben zwischen Sitzungen erhalten
- **Mehrere CVs** verwalten (Framework bereit)

### 🌐 Mehrsprachigkeit
- **Deutsch/Englisch** Interface-Umschaltung
- **Lokalisierte Inhalte** für deutsche CV-Standards
- **Kulturelle Anpassung** an deutsche Bewerbungsstandards

### ⌨️ Produktivitäts-Features
- **Keyboard Shortcuts**: Ctrl+S (Speichern), Ctrl+Z (Rückgängig), Ctrl+P (Drucken)
- **Timeline-Ansicht** für chronologische Karriereübersicht
- **Vollbild-Vorschau** für ablenkungsfreie Bearbeitung
- **Druckoptimierung** für perfekte PDF-Ausgabe

## 🚀 Schnellstart

### Voraussetzungen
- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- Keine Installation erforderlich - läuft komplett im Browser

### Installation
1. Repository klonen:
```bash
git clone https://github.com/username/lebenslauf-generator-pro.git
cd lebenslauf-generator-pro
```

2. Live Server starten (z.B. mit VS Code Live Server Extension):
```bash
# Mit Python
python -m http.server 8000

# Mit Node.js
npx serve .

# Mit PHP
php -S localhost:8000
```

3. Browser öffnen und zu `http://localhost:8000` navigieren

## 📖 Verwendung

### Grundlegende Bedienung

1. **Persönliche Daten eingeben**
   - Wechseln Sie zum "Inhalt" Tab
   - Füllen Sie Ihre persönlichen Informationen aus
   - Laden Sie optional ein Profilfoto hoch

2. **Abschnitte hinzufügen**
   - Klicken Sie auf "Neuen Abschnitt hinzufügen"
   - Wählen Sie aus 11+ vordefinierten Abschnittstypen
   - Oder erstellen Sie benutzerdefinierte Abschnitte

3. **Design anpassen**
   - Wechseln Sie zum "Design" Tab
   - Wählen Sie eine Vorlage
   - Passen Sie Farben und Schriftarten an

4. **Layout optimieren**
   - Wechseln Sie zum "Layout" Tab
   - Wählen Sie zwischen verschiedenen Layouts
   - Justieren Sie Abstände und Größen

### Erweiterte Funktionen

#### Tastenkürzel
- `Ctrl + S` - Daten speichern
- `Ctrl + Z` - Rückgängig machen
- `Ctrl + Y` - Wiederherstellen
- `Ctrl + P` - Drucken/PDF exportieren
- `Esc` - Modals schließen

#### Export/Import
- **Export**: Klicken Sie auf "Exportieren" um Ihre Daten als JSON zu sichern
- **Import**: Klicken Sie auf "Importieren" um gesicherte Daten zu laden

#### Timeline-Ansicht
- Klicken Sie auf das Timeline-Icon für eine chronologische Übersicht Ihrer Karriere
- Perfekt für die Überprüfung von Lücken oder Überschneidungen

## 🎨 Screenshots

### Hauptansicht
![Hauptansicht](assets/main-interface.png)
*Moderne Benutzeroberfläche mit Tabbed Navigation*

### Design-Anpassung
![Design Tab](assets/design-tab.png)
*Umfassende Anpassungsoptionen für Vorlagen und Farben*

### Inhalt-Bearbeitung
![Inhalt Tab](assets/content-tab.png)
*Intuitive Bearbeitung mit Rich-Text-Editor und Foto-Upload*

### Layout-Optionen
![Layout Tab](assets/layout-tab.png)
*Flexible Layout-Optionen für verschiedene CV-Stile*

### Abschnitt-Bearbeitung
![Modal Bearbeitung](assets/section-editing.png)
*Professionelle Modal-Dialoge für detaillierte Bearbeitung*

### Timeline-Ansicht
![Timeline](assets/timeline-view.png)
*Chronologische Übersicht der Karriereentwicklung*

### Mobile Ansicht
![Mobile](assets/mobile-view.png)
*Vollständig responsive für alle Geräte*

## 🏗️ Architektur

### Dateistruktur
```
lebenslauf-generator-pro/
├── index.html              # Haupt-HTML-Datei
├── css/
│   ├── main.css            # Basis-Styles und Design-System
│   ├── editor.css          # Editor-spezifische Styles
│   ├── templates.css       # CV-Vorlagen Styles
│   └── animations.css      # Animationen und Übergänge
├── js/
│   ├── app.js             # Hauptanwendung und Initialisierung
│   ├── editor.js          # Editor-Funktionalität
│   ├── storage.js         # Local Storage Management
│   └── templates.js       # CV-Vorlagen Generator
├── assets/                # Screenshots und Medien
└── README.md             # Diese Datei
```

### Technologie-Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, Custom Properties
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Inter, Playfair Display, Source Sans Pro)
- **Storage**: Browser Local Storage
- **Build**: Keine Build-Tools erforderlich

### Modulare Architektur
- **CVEditor**: Hauptklasse für Editor-Funktionalität
- **CVStorage**: Local Storage Management
- **CVTemplates**: Template-Generierung und -Verwaltung
- **Responsive Design**: Mobile-First Ansatz

## 🔧 Anpassung

### Neue Vorlagen hinzufügen
1. Neue Template-Funktion in `js/templates.js` erstellen
2. CSS-Styles in `css/templates.css` hinzufügen
3. Template-Karte in `index.html` registrieren

### Neue Abschnittstypen
1. Abschnittstyp in `getAvailableSections()` definieren
2. Form-Generator in `generateSectionForm()` erweitern
3. Template-Renderer für neuen Typ implementieren

### Styling anpassen
- **Farben**: CSS Custom Properties in `css/main.css` bearbeiten
- **Schriftarten**: Google Fonts Links in `index.html` aktualisieren
- **Layout**: Grid/Flexbox Definitionen in entsprechenden CSS-Dateien

## 🤝 Beitragen

Beiträge sind willkommen! Bitte beachten Sie:

1. **Fork** das Repository
2. **Branch** für Ihr Feature erstellen (`git checkout -b feature/AmazingFeature`)
3. **Commit** Ihre Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. **Push** zum Branch (`git push origin feature/AmazingFeature`)
5. **Pull Request** öffnen

### Entwicklungsrichtlinien
- Verwenden Sie semantisches HTML
- Folgen Sie der bestehenden Code-Struktur
- Testen Sie auf verschiedenen Browsern
- Dokumentieren Sie neue Features
- Behalten Sie die Barrierefreiheit bei

## 📋 Roadmap

### Geplante Features
- [ ] **Mehr Vorlagen**: Kreative und branchenspezifische Designs
- [ ] **AI-Integration**: Automatische Verbesserungsvorschläge
- [ ] **Cloud-Sync**: Online-Speicherung und Synchronisation
- [ ] **Kollaboration**: Teilen und gemeinsame Bearbeitung
- [ ] **PDF-Export**: Direkter PDF-Download ohne Drucken
- [ ] **Mehr Sprachen**: Französisch, Spanisch, Italienisch
- [ ] **Template-Marktplatz**: Community-Templates
- [ ] **Analytics**: CV-Leistungsanalyse

### Bekannte Probleme
- Creative Template noch nicht implementiert
- Service Worker für Offline-Funktionalität fehlt
- Drag & Drop für Abschnitte in Entwicklung

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE) Datei für Details.

## 🙏 Danksagungen

- **Font Awesome** für die Icons
- **Google Fonts** für die Typografie
- **CSS Grid** und **Flexbox** für das Layout-System
- **Local Storage API** für die Datenpersistenz

## 📞 Support

Bei Fragen oder Problemen:
- **Issues**: GitHub Issues für Bug-Reports und Feature-Requests
- **Diskussionen**: GitHub Discussions für allgemeine Fragen
- **Wiki**: Detaillierte Dokumentation im GitHub Wiki

---

**Erstellt mit ❤️ für die deutsche Bewerbungslandschaft**

*Lebenslauf Generator Pro - Ihr Weg zum perfekten deutschen Lebenslauf*