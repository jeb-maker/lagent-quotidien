## Meta

- Semaine: **2026-W29**
- Date du dernier radar: **2026-07-13**
- Harvest live: **oui** (`data/narrative-radar/2026-07-13.json`, fenêtre 48h, 180 items, ~40% hors EN)
- Langues-source couvertes ce tour (EN FR AR ES ZH PT): **EN ✅ · FR ✅ · AR ✅ · ES ✅ · ZH ✅ · PT ✅**

## Clusters (max 5)

### Cluster — hormuz-blocus-taxe

**Événement neutre (FR)** — Déclarations US et réponses iraniennes autour de l’accès au détroit d’Ormuz et de mesures de blocus/tarification, avec effets marché (pétrole) et suivi en continu.  
**Neutral event (EN)** — US statements and Iranian responses on access to the Strait of Hormuz and blockade/toll measures, with market effects (oil) and live coverage.

| Flux | Langue | Titre | Archétypes | Fonctions |
|---|---|---|---|---|
| BBC World | EN | Trump reinstates Iran port blockade and imposes 20% charge on cargo passing through Hormuz | existential-threat | create-permanent-emergency |
| The Guardian World | EN | Trump renews Iran blockade and again threatens to take control of strait of Hormuz | existential-threat | legitimize-force |
| The Guardian World | EN | Iran rejects US claim over strait of Hormuz as foreign minister mocks Trump’s vow to charge tolls - Middle East crisis live | complexity-dilution | redirect-attention |
| 中国新闻网 · 国际 | ZH | 特朗普称将继续打击伊朗 “守护”霍尔木兹海峡 | existential-threat | legitimize-force |
| El País | ES | Trump impone de nuevo el bloqueo a barcos iraníes en Ormuz y un cobro “del 20% de la carga” al resto de los buques que lo usen | existential-threat | create-permanent-emergency |

**Match calibration**

| Cas | Score homologie | Archétypes partagés | Note |
|---|---|---|---|
| covid-origin-uncertainty | 0.15 | genuine-uncertainty (contre-modèle) | Sert ici surtout de garde-fou: distinguer conflit réel / incertitude vs “manufacture-doubt” par défaut. [confiance: basse · preuve: homologie] |
| digital-sovereignty-china | 0.20 | existential-threat | Homologie structurale faible: “souveraineté / contrôle d’un passage” vs “international waterway”. Pas d’équivalence politique implicite. [confiance: basse · preuve: homologie] |

**Divergence** (si plusieurs flux/langues)

| Dimension | Écart | Exemple observable |
|---|---|---|
| Lexique de légitimité | “sécuriser / protéger” vs “taxer / bloquer” | ZH met “守护” (protéger) en avant ; ES/EN mettent “charge/toll” et “blockade” au premier plan |
| Temporalité | live-blog vs article | EN “crisis live” dilue en événements et réactions ; autres flux titrent un acte unique |

**Intérêts plausibles** (≥2 hypothèses concurrentes)

| Intérêt | Acteur (type) | evidence_type | FR | EN | [confiance · preuve] |
|---|---|---|---|---|---|
| legitimacy | État (USA) | correlational | Cadrer l’action comme “protection” d’un couloir maritime peut soutenir la légitimité politique interne. | Framing the move as “protection” of a sea lane can support domestic legitimacy. | [confiance: basse · preuve: média] |
| territorial | État (Iran) | correlational | Réaffirmer une souveraineté de fait sur le passage (réponse symbolique aux annonces US). | Re-assert de facto sovereignty over the passage (symbolic response to US announcements). | [confiance: basse · preuve: média] |
| media-attention | Médias (rédactions / plateformes) | correlational | Format “crisis live” maximise la présence continue et la captation d’audience. | Live-blog framing increases continuous presence and attention capture. | [confiance: basse · preuve: média] |

**Pont agentique** — Aucun direct; mais intérêt infra potentiel sur “tarification/contrôle” d’un choke-point = terrain d’automatisation (shipping, pricing, OSINT) plutôt que récit agentique. [confiance: basse · preuve: homologie]

---

### Cluster — feux-europe-climat

**Événement neutre (FR)** — Feux majeurs en Espagne (Almería / Los Gallardos) et près de Paris, bilans humains, évacuations, et re-cadrage politique autour de l’urgence climatique.  
**Neutral event (EN)** — Major fires in Spain (Almería / Los Gallardos) and near Paris, casualties, evacuations, and political reframing around climate emergency.

| Flux | Langue | Titre | Archétypes | Fonctions |
|---|---|---|---|---|
| El País | ES | Últimas noticias del incendio forestal de Los Gallardos (Almería), en directo… | complexity-dilution | redirect-attention |
| El País | ES | El hijo de una víctima del incendio de Los Gallardos: “Nadie les dijo…” | existential-threat | create-permanent-emergency |
| BBC World | EN | Briton tells of surviving Spain wildfire in car… | existential-threat | create-permanent-emergency |
| The Guardian World | EN | Firefighting planes scrambled… huge wildfire near Paris | existential-threat | create-permanent-emergency |
| Al Jazeera Arabic | AR | حريق في غابة شهيرة قرب باريس وقتلى ومفقودون بحرائق إسبانيا | existential-threat | create-permanent-emergency |
| 中国新闻网 · 国际 | ZH | 西班牙森林火灾致13人死亡 | existential-threat | create-permanent-emergency |

**Match calibration**

| Cas | Score homologie | Archétypes partagés | Note |
|---|---|---|---|
| climate-delay | 0.25 | existential-threat | Homologie faible: même champ lexical “urgence / climat”, mais ici les items titrent surtout l’événement et ses victimes, pas une controverse “doute/retard”. [confiance: moyenne · preuve: homologie] |
| ozone-montreal-success | 0.10 | — | Contre-exemple rappelé: tous les récits environnementaux ne sont pas des “stall”; éviter la sur-interprétation. [confiance: basse · preuve: homologie] |

**Divergence** (si plusieurs flux/langues)

| Dimension | Écart | Exemple observable |
|---|---|---|
| Attribution / cause | “urgence climatique” vs “faits et secours” | EN cite un cadrage “climate emergency kills” (dans certains résumés), ZH/AR titrent davantage bilan/lieu |
| Personnalisation | victimes / témoignages vs “direct” | ES/EN multiplient voix individuelles (“le fils…”, “Briton tells…”) ; ZH plus institutionnel |

**Intérêts plausibles** (≥2 hypothèses concurrentes)

| Intérêt | Acteur (type) | evidence_type | FR | EN | [confiance · preuve] |
|---|---|---|---|---|---|
| legitimacy | État (gouvernements nationaux) | correlational | Lier la crise à une “urgence climatique” peut justifier un agenda de reconstruction / pacte politique. | Linking the crisis to “climate emergency” can justify reconstruction agendas / political pacts. | [confiance: basse · preuve: média] |
| media-attention | Médias (rédactions) | correlational | Témoignages et “direct” servent la dramatisation sans nécessairement déformer les faits. | Testimonies and live coverage increase salience without necessarily distorting facts. | [confiance: basse · preuve: média] |
| legal-risk-aversion | Médias (rédactions) | correlational | Accent sur bilans/évacuations plutôt que sur controverses de prévention (responsabilités) peut réduire le risque juridique. | Focusing on tallies/evacuations over prevention liability controversies can reduce legal exposure. | [confiance: basse · preuve: média] |

**Pont agentique** — Potentiel indirect (agents d’alerte/dispatch, simulation, tri de signal), mais pas de récit agentique dominant observable dans les titres. [confiance: basse · preuve: média]

---

### Cluster — cyber-attribution-sanctions

**Événement neutre (FR)** — Attribution publique de ciberattaques à des services russes et annonces de sanctions coordonnées (UE/Royaume-Uni), cadrées comme riposte de sécurité.  
**Neutral event (EN)** — Public attribution of cyber attacks to Russian services and coordinated sanctions (EU/U.K.), framed as a security response.

| Flux | Langue | Titre | Archétypes | Fonctions |
|---|---|---|---|---|
| El País | ES | La UE culpa al espionaje ruso de la oleada de ciberataques en Europa | existential-threat | legitimize-force |
| The Hindu (International) | EN | EU, U.K. hit Russia with joint sanctions over cyber attacks | existential-threat | legitimize-force |

**Match calibration**

| Cas | Score homologie | Archétypes partagés | Note |
|---|---|---|---|
| war-on-drugs | 0.10 | moral-panic-war (faible) | Homologie très limitée: “crackdown/sanctions” ressemble à une “guerre contre X” sans que le contenu suffise à conclure à panique morale. [confiance: basse · preuve: homologie] |
| digital-sovereignty-china | 0.15 | existential-threat | Homologie faible: cyber-souveraineté / sécurité nationale comme cadre. [confiance: basse · preuve: homologie] |

**Divergence**

| Dimension | Écart | Exemple observable |
|---|---|---|
| Agentivité | “espionage services behind” vs “sanctions response” | ES met l’attribution en tête ; EN met l’action (sanctions) en tête |

**Intérêts plausibles** (≥2 hypothèses concurrentes)

| Intérêt | Acteur (type) | evidence_type | FR | EN | [confiance · preuve] |
|---|---|---|---|---|---|
| legitimacy | Institutions (UE / UK) | correlational | Lier sanctions à des attaques “en vague” peut renforcer la cohésion politique interne. | Linking sanctions to a “wave” of attacks can bolster internal political cohesion. | [confiance: basse · preuve: média] |
| territorial | État (Russie) | correlational | Dans le récit occidental, le cyber sert d’extension de confrontation géopolitique (sans preuve directe dans les titres). | In the Western narrative, cyber is cast as an extension of geopolitical confrontation (not proven by titles alone). | [confiance: basse · preuve: média] |
| media-attention | Médias | correlational | La “vague” agrège des incidents hétérogènes en récit unifié, utile à la lisibilité. | “Wave” aggregates heterogeneous incidents into a single legible story. | [confiance: basse · preuve: média] |

**Pont agentique** — Fort (infra): cyber = terrain d’agents de détection/réponse automatisée; mais les titres traitent surtout attribution/sanctions, pas outils agentiques. [confiance: moyenne · preuve: homologie]

---

### Cluster — espagne-judiciarisation-polarisation

**Événement neutre (FR)** — En Espagne, épisodes de conflit politico-judiciaire (autour de responsables/entourage du pouvoir) et controverses médiatiques, avec vocabulaire de “persécution” ou de rectification exigée.  
**Neutral event (EN)** — In Spain, political–judicial disputes (around officials / government circles) and media controversies, with language of “persecution” or demands for correction.

| Flux | Langue | Titre | Archétypes | Fonctions |
|---|---|---|---|---|
| El País | ES | El juez Peinado reclama a Begoña Gómez que “acredite”…; La Moncloa habla de “persecución” | moral-panic-war | demonize-dissent |
| El País | ES | La Moncloa y París exigen a Rajoy rectificar un artículo “racista”… | whataboutism | redirect-attention |

**Match calibration**

| Cas | Score homologie | Archétypes partagés | Note |
|---|---|---|---|
| aids-moral-panic | 0.10 | moral-panic-war (faible) | Homologie prudente: le mot “persecution” peut signaler escalade de cadre (ennemi interne) sans stigmatisation sanitaire ici. [confiance: basse · preuve: homologie] |
| covid-origin-uncertainty | 0.10 | complexity-dilution | Rappel: controverse juridique/politique ≠ manufacture-doubt; l’incertitude porte sur faits de dossier, pas sur consensus scientifique. [confiance: basse · preuve: homologie] |

**Divergence**

| Dimension | Écart | Exemple observable |
|---|---|---|
| Cadrage | judiciaire (“acredite”) vs politique (“persecución”) | Le même item juxtapose injonction procédurale et interprétation politique |
| Blocs externes | Paris/Moncloa | La mention de Paris internationalise une controverse de presse, changeant son “poids” narratif |

**Intérêts plausibles** (≥2 hypothèses concurrentes)

| Intérêt | Acteur (type) | evidence_type | FR | EN | [confiance · preuve] |
|---|---|---|---|---|---|
| electoral-coalition | Acteurs politiques (gouvernement / opposition) | correlational | Cadre “persécution” peut mobiliser un camp; cadre “rectification” peut discipliner un autre. | “Persecution” framing can mobilize a base; “correction demanded” can discipline opponents. | [confiance: basse · preuve: média] |
| legal-risk-aversion | Médias / institutions | correlational | Choix d’un lexique procédural (“acredite”) protège d’accusations directes. | Procedural lexicon (“prove/attest”) reduces direct accusatory exposure. | [confiance: basse · preuve: média] |
| media-attention | Médias | correlational | Conflit personnalisé (noms propres) augmente l’attention au détriment du fond. | Personalised conflict (named actors) increases attention at the expense of substance. | [confiance: basse · preuve: média] |

**Pont agentique** — Aucun direct; éventuel écho infra via “judiciarisation des preuves” (documents, traçabilité) mais pas de signal agentique en titres. [confiance: basse · preuve: média]

---

### Cluster — ai-localisation-gouvernance

**Événement neutre (FR)** — Trois récits “AI” distincts: IA pour langues locales (Togo), fonctionnalité IA produit (Waze), et discours politique de gouvernance/sécurité (Australie).  
**Neutral event (EN)** — Three distinct AI narratives: AI for local languages (Togo), AI product feature (Waze), and political governance/safety speech (Australia).

| Flux | Langue | Titre | Archétypes | Fonctions |
|---|---|---|---|---|
| AllAfrica (dernières · FR) | FR | Togo: L'IA au service des langues locales | tech-solutionism | manufacture-consent |
| Folha de S.Paulo | PT | Waze ganha “modo menos falante” e amplia uso de IA | tech-solutionism | manufacture-consent |
| The Guardian World | EN | Albanese to compare pivotal moment in AI to renewable energy transition… | genuine-uncertainty | redirect-attention |

**Match calibration**

| Cas | Score homologie | Archétypes partagés | Note |
|---|---|---|---|
| ozone-montreal-success | 0.10 | — | Sert de rappel “contre-modèle”: un discours d’action publique peut être aligné sur précaution sans être du stall. [confiance: basse · preuve: homologie] |
| covid-origin-uncertainty | 0.15 | genuine-uncertainty | Homologie légère: “moment pivot / sécurité” = incertitude sur risques et régulation. [confiance: moyenne · preuve: homologie] |

**Divergence**

| Dimension | Écart | Exemple observable |
|---|---|---|
| Valeur mise en avant | inclusion linguistique vs confort produit vs sécurité | FR (langues locales) = inclusion/culture; PT (Waze) = UX; EN (PM) = société/risque |

**Intérêts plausibles** (≥2 hypothèses concurrentes)

| Intérêt | Acteur (type) | evidence_type | FR | EN | [confiance · preuve] |
|---|---|---|---|---|---|
| legitimacy | État (Australie) | correlational | Comparer l’IA à la transition énergétique peut légitimer une posture “pilotage” sans détails. | Comparing AI to energy transition can legitimate a “steering” posture without details. | [confiance: basse · preuve: média] |
| market-access | Plateformes/industrie (Google/Waze) | correlational | “IA” comme label produit pour différencier et retenir l’usage. | “AI” as a product label for differentiation and retention. | [confiance: basse · preuve: média] |
| legitimacy | État (Togo) | correlational | “Langues locales + IA” peut soutenir une modernisation symbolique et des politiques d’éducation/numérique. | “Local languages + AI” can support symbolic modernization and digital/education policy. | [confiance: basse · preuve: média] |

**Pont agentique** — Oui (agentique “soft”): assistants vocaux, personalisation, systèmes de navigation; mais ici le cadrage reste “IA” générique plutôt qu’“agents autonomes”. [confiance: moyenne · preuve: homologie]

## Meta-patterns détectés

- **industrial-stall**: non détecté de façon robuste ce tour (peu d’items explicitement structurés “doute → report → régulation”). [confiance: basse · preuve: média]

## Angles morts (obligatoire)

- Les entrées **FR** sont majoritairement agrégées via AllAfrica (couverture hétérogène) — faible densité de “clusters” FR comparables aux EN. [confiance: moyenne · preuve: primaire]
- Très peu de croisements **AR/ZH/PT** sur les mêmes événements que les items **EN** hors (feux, Ormuz) : difficile de mesurer divergence systématique. [confiance: moyenne · preuve: primaire]
- La section `clusters` du harvest est **vide** (`"clusters": []`) : la structure narrative est inférée à partir des titres/extraits, donc plus fragile. [confiance: haute · preuve: primaire]

## Limites du dispositif

- **B01 (industrial-stall sur-représenté)**: ce tour, risque inverse: forcer un match “stall” alors que les items portent sur événements/conflits — d’où l’usage de contre-modèles (`ozone-montreal-success`, `covid-origin-uncertainty`). [confiance: haute · preuve: historique]
- **B02 / B07 (Atlantique-centrisme, RSS ≠ monde)**: 108/180 items EN; même avec 40% non-EN, le “poids narratif” reste très anglo-centré. [confiance: moyenne · preuve: primaire]
- **L01/L02 (matching lexical EN, clustering faible)**: sans clustering entités+dates, la divergence multi-langue est sous-estimée et dépend de coïncidences de titres. [confiance: haute · preuve: historique]
