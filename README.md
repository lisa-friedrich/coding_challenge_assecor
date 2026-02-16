# AngularApp

Angular-Anwendung mit Star-Wars-Daten von der [SWAPI](https://swapi.dev/). Zeigt Filme, Charaktere und Planeten in Listen und Detailansichten, inkl. Modal-Formulare zum Hinzufügen von Einträgen.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

## Funktionen

- **Filme / Charaktere / Planeten**: Listen- und Detailseiten mit verlinkten Beziehungen
- **State**: Zentraler State (`AppStateService`) mit Signals
- **Datenquelle**: SWAPI-API; erst First-Page-Load, danach vollständige Daten im Hintergrund
- **Modal-Formulare**: Hinzufügen von Filmen, Charakteren und Planeten (Eingabemasken)
- **Gemeinsames Layout**: Einheitliches Detail-Layout und Styles für alle Detail-Seiten

## Technologie

- Angular 21 (Standalone Components)
- Signals, `computed`, `toSignal`
- Reactive Forms
- RxJS (Observables, `tap`, `takeUntilDestroyed` in der App-Komponente)

## Projektstruktur

```
src/app/
├── app.ts, app.html, app.config.ts, app.routes.ts
├── header/                    # Navigation (Filme, Charaktere, Planeten, Formular)
├── pages/
│   ├── films/                # Filmliste
│   ├── film-detail/          # Film-Detail + Modal-Buttons
│   ├── characters/           # Charakterliste
│   ├── character-detail/     # Charakter-Detail + Modal
│   ├── planets/              # Planetenliste
│   └── planet-detail/        # Planet-Detail
├── components/
│   ├── app-button/           # Link- oder Button-Komponente
│   ├── app-info-box/         # Kachel für Listen
│   ├── app-modal/            # Overlay-Modal
│   ├── app-form-modal/       # Formulare (Film, Charakter, Planet)
│   └── app-loader/           # Ladeanimation
├── services/
│   └── swapi.service.ts      # SWAPI-API, loadAppData() gibt Observable zurück
├── state/
│   └── app-state.service.ts  # Globaler State (Films, Characters, Planets)
└── styles/
    └── detail-layout.scss    # Gemeinsame Detail-Seiten-Styles
```

## Routen

| Pfad | Komponente |
|------|------------|
| `/`, `/films` | Filmliste |
| `/films/:id` | Film-Detail |
| `/characters` | Charakterliste |
| `/characters/:id` | Charakter-Detail |
| `/planets` | Planetenliste |
| `/planets/:id` | Planet-Detail |

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
