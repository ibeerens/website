# Website content

Bewerk de bestanden in deze map om de website bij te werken **zonder code aan te passen**.

**Na het bewerken van markdown:** run `npm run sync` of `sync.cmd` (sync + build) om de wijzigingen zichtbaar te maken.

## Bestanden

| Bestand | Beschrijving |
|---------|--------------|
| `site.json` | Navigatie, footer, contactgegevens |
| `home.md` | Homepage (sync → home.json) |
| `membership.md` | Word lid-pagina (sync → membership.json) |
| `contact.md` | Contactpagina (sync → contact.json) |
| `calendar.md` | Buurtactiviteiten en evenementen |
| `gallery.json` | Fotogalerij: foto's met titel en beschrijving |
| `news.json` | Nieuws-pagina: titels en teksten |
| `news/*.md` | Nieuwsberichten (sync → news/index.json) |

## Nieuws toevoegen

1. Maak `news/mijn-bericht.md` met frontmatter en inhoud:
   ```markdown
   ---
   title: "Titel van het bericht"
   date: "2025-03-15"
   author: "Buurtvereniging"
   image: "/foto.jpg"
   excerpt: "Korte samenvatting"
   ---

   De inhoud van het bericht in markdown...
   ```
2. Run `npm run sync` – `news/index.json` wordt automatisch bijgewerkt.

## Buurtactiviteiten bewerken

Bewerk **alleen** `calendar.md`. De activiteiten staan in het YAML-frontmatter (tussen `---`). Voeg een nieuw evenement toe door een nieuw item aan de `events`-lijst toe te voegen.

Run `npm run sync` om `calendar.json` bij te werken (of `sync.cmd` voor sync + build).

```yaml
  - id: 13
    title: "Nieuw evenement"
    date: "2025-06-15"
    time: "14:00-17:00"
    location: "Locatie"
    type: "Activiteit"
    description: "Beschrijving van het evenement"
```

`type` kan zijn: Activiteit, Vergadering of Evenement.

## Markdown

In `.md` bestanden kun je gebruiken:
- **Vet** met `**tekst**`
- *Cursief* met `*tekst*`
- [Links](https://voorbeeld.nl)
- Regels met `-` voor lijsten
- Nieuwe alinea's met een lege regel

## JSON

Let op: in JSON moeten strings tussen dubbele aanhalingstekens, en items in een lijst worden gescheiden met komma's (geen komma na het laatste item).
