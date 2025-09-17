# Haushalts-Organizer

Ein digitaler Aufgaben-Manager für Familien zur besseren Organisation des Haushalts.

## Über das Projekt

Dieses Projekt entstand aus einem persönlichen Problem: Unser handgeschriebener Putzplan an der Küchenwand war unübersichtlich und führte oft zu Verwirrung darüber, wer welche Aufgaben zu erledigen hatte. Der Haushalts-Organizer digitalisiert diese Aufgabenverwaltung und macht sie für alle Familienmitglieder zugänglich und transparent.

## Features

### Dashboard
- Übersicht über erledigte, offene und überfällige Aufgaben
- Familien-Ranking basierend auf Punktesystem
- Visualisierung der Aufgabenverteilung mit Diagrammen
- Wöchentliche Aktivitätsübersicht

### Aufgabenverwaltung
- Aufgaben erstellen, bearbeiten und löschen
- Zuständigkeiten festlegen und ändern
- Status-Tracking (offen, in Arbeit, erledigt, überfällig)
- Kategorisierung nach Bereichen (Küche, Bad, Garten, etc.)
- Punktesystem zur Motivation
- Fälligkeitsdaten setzen

### Familienverwaltung
- Familienmitglieder hinzufügen und verwalten
- Individuelle Avatars auswählen
- Punktestand pro Person
- Übersicht der aktuellen Aufgaben je Person

## Technische Details

### Frontend
- **React** - Benutzeroberfläche
- **Recharts** - Datenvisualisierung
- **Lucide React** - Icons
- **CSS3** - Styling (kein Framework-Overhead)

### Entwicklungsumgebung
- Node.js 18+
- npm Package Manager
- Git Versionskontrolle

## Installation

### Voraussetzungen
- Node.js (Version 18 oder höher)
- npm
- Git

### Projekt einrichten

```bash
# Repository klonen
git clone https://github.com/4lexzs/haushalts-organizer.git

# In Projektordner wechseln
cd haushalts-organizer

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm start
```

Die Anwendung läuft dann unter `http://localhost:3000`

## Verfügbare Scripts

```bash
# Entwicklungsserver starten
npm start

# Production Build erstellen
npm run build

# Tests ausführen
npm test
```

## Projektstruktur

```
haushalts-organizer/
├── src/
│   ├── App.js          # Hauptkomponente
│   ├── index.css       # Styling
│   └── index.js        # React Entry Point
├── public/
├── package.json
└── README.md
```

## Zukünftige Entwicklung

### Geplante Features
- **Backend-Integration**: Node.js Server mit SQLite Datenbank
- **Raspberry Pi Deployment**: Lokaler Server für Familiennetzwerk
- **Push-Benachrichtigungen**: Erinnerungen auf mobile Geräte
- **Mobile App**: React Native Implementation
- **Automatische Rotation**: Aufgaben automatisch neu zuweisen
- **Kalender-Integration**: Synchronisation mit bestehenden Kalendern

### Technische Roadmap
- Migration zu TypeScript für bessere Typsicherheit
- Unit Tests mit Jest implementieren
- Progressive Web App (PWA) Features
- Offline-Funktionalität
- Multi-Haushalt Support

## Datenschutz

Aktuell werden alle Daten nur lokal im Browser gespeichert. Bei der geplanten Backend-Implementation werden die Daten ausschliesslich auf dem lokalen Raspberry Pi Server gespeichert und verlassen nicht das Heimnetzwerk.

## Browser-Kompatibilität

- Chrome 80+
- Firefox 74+
- Safari 13+
- Edge 80+

## Beitragen

Das Projekt ist für Lernzwecke entwickelt worden. Feedback und Verbesserungsvorschläge sind willkommen.

## Lizenz

Dieses Projekt ist für Bildungszwecke erstellt und unter der MIT Lizenz verfügbar.

## Autor

Edwin Alexander Paucar Vidal
