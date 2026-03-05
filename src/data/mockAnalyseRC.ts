export interface SousCritere {
  id: string;
  nom: string;
  ponderation: number;
  formuleNotation?: string;
}

export interface Critere {
  id: string;
  nom: string;
  ponderation: number;
  sousCriteres: SousCritere[];
}

export interface Attendu {
  sousCritereId: string;
  sousCritereNom: string;
  finaliteProbable: string;
  attendusImplicites: string[];
  jurySecurise: string;
}

export interface ItemPonderation {
  nom: string;
  pointsEstimes: number;
  justification: string;
}

export interface PonderationSousCritere {
  sousCritereId: string;
  sousCritereNom: string;
  totalPoints: number;
  items: ItemPonderation[];
  impactPrix?: string;
}

export interface Risque {
  id: string;
  point: string;
  niveau: "critique" | "eleve" | "modere";
  description: string;
  recommendation: string;
  critereLie: string;
}

export interface ChecklistItem {
  sousCritereId: string;
  sousCritereNom: string;
  elementsImperatifs: string[];
  elementsDifferenciants: string[];
  erreursPenalisantes: string[];
}

export interface ConformiteItem {
  id: string;
  label: string;
  conforme: boolean | null;
}

export interface ConformiteGroupe {
  critere: string;
  items: ConformiteItem[];
}

export interface AnalyseRC {
  marcheInfo: {
    objet: string;
    typeContrat: string;
    duree: string;
    lieu: string;
    dateRemise: string;
    reference: string;
  };
  bloc1: Critere[];
  bloc2: Attendu[];
  bloc3: PonderationSousCritere[];
  bloc4: Risque[];
  bloc5: ChecklistItem[];
  bloc6: ConformiteGroupe[];
}

export const mockAnalyse: AnalyseRC = {
  marcheInfo: {
    objet:
      "Maintenance et infog\u00e9rance du syst\u00e8me d'information de la Communaut\u00e9 de communes du Val de Loire",
    typeContrat: "Accord-cadre \u00e0 bons de commande",
    duree: "48 mois (reconduction annuelle tacite)",
    lieu: "Communaut\u00e9 de communes du Val de Loire - 12 sites",
    dateRemise: "15 avril 2026 \u00e0 12h00",
    reference: "CCVL-2026-SI-003",
  },

  bloc1: [
    {
      id: "C1",
      nom: "Valeur technique",
      ponderation: 60,
      sousCriteres: [
        {
          id: "C1.1",
          nom: "Organisation et moyens affect\u00e9s au march\u00e9",
          ponderation: 20,
        },
        {
          id: "C1.2",
          nom: "M\u00e9thodologie de maintenance pr\u00e9ventive et curative",
          ponderation: 25,
          formuleNotation:
            "Note = (Appr\u00e9ciation du jury / 10) x pond\u00e9ration",
        },
        {
          id: "C1.3",
          nom: "Gestion des incidents et engagements de d\u00e9lais (GTI/GTR)",
          ponderation: 15,
        },
      ],
    },
    {
      id: "C2",
      nom: "Prix",
      ponderation: 30,
      sousCriteres: [
        {
          id: "C2.1",
          nom: "Montant du forfait annuel de maintenance",
          ponderation: 20,
          formuleNotation:
            "Note = (Prix le plus bas / Prix du candidat) x pond\u00e9ration",
        },
        {
          id: "C2.2",
          nom: "Taux journalier moyen des interventions compl\u00e9mentaires",
          ponderation: 10,
        },
      ],
    },
    {
      id: "C3",
      nom: "D\u00e9veloppement durable",
      ponderation: 10,
      sousCriteres: [
        {
          id: "C3.1",
          nom: "Actions environnementales li\u00e9es \u00e0 l'ex\u00e9cution du march\u00e9",
          ponderation: 5,
        },
        {
          id: "C3.2",
          nom: "Politique sociale et insertion",
          ponderation: 5,
        },
      ],
    },
  ],

  bloc2: [
    {
      sousCritereId: "C1.1",
      sousCritereNom: "Organisation et moyens affect\u00e9s au march\u00e9",
      finaliteProbable:
        "Vise g\u00e9n\u00e9ralement \u00e0 \u00e9valuer la capacit\u00e9 op\u00e9rationnelle r\u00e9elle du candidat : dispose-t-il des ressources humaines et techniques pour absorber la charge de travail sur 12 sites ?",
      attendusImplicites: [
        "Organigramme d\u00e9di\u00e9 avec noms, qualifications et certifications des intervenants",
        "Plan de charge pr\u00e9visionnel montrant la disponibilit\u00e9 effective des \u00e9quipes",
        "Pr\u00e9sentation des moyens techniques : outils de supervision, ITSM, t\u00e9l\u00e9maintenance",
        "Identification d'un interlocuteur unique (responsable de compte) et de son suppl\u00e9ant",
        "Engagement sur la continuit\u00e9 des \u00e9quipes (faible turnover)",
      ],
      jurySecurise:
        "Le jury cherche \u00e0 s\u00e9curiser la continuit\u00e9 de service : un prestataire sous-dimensionn\u00e9 ou sans interlocuteur d\u00e9di\u00e9 est un risque op\u00e9rationnel majeur pour une collectivit\u00e9 multi-sites.",
    },
    {
      sousCritereId: "C1.2",
      sousCritereNom:
        "M\u00e9thodologie de maintenance pr\u00e9ventive et curative",
      finaliteProbable:
        "Dans des march\u00e9s comparables, ce crit\u00e8re cherche \u00e0 mesurer la maturit\u00e9 m\u00e9thodologique du candidat et sa capacit\u00e9 \u00e0 anticiper les probl\u00e8mes plut\u00f4t que de simplement r\u00e9agir.",
      attendusImplicites: [
        "Plan de maintenance pr\u00e9ventive d\u00e9taill\u00e9 (fr\u00e9quences, p\u00e9rim\u00e8tre, checklist par type d'\u00e9quipement)",
        "Processus d'escalade clair avec logigramme",
        "Politique de gestion des mises \u00e0 jour et patchs de s\u00e9curit\u00e9",
        "Proc\u00e9dures de sauvegarde et plan de reprise d'activit\u00e9 (PRA/PCA)",
        "Tableau de bord de suivi avec KPI propos\u00e9s",
        "R\u00e9f\u00e9rence \u00e0 des standards reconnus (ITIL, ISO 20000)",
      ],
      jurySecurise:
        "Le jury veut s'assurer que le prestataire a une d\u00e9marche structur\u00e9e et pas seulement r\u00e9active. La maintenance pr\u00e9ventive r\u00e9duit les incidents et les co\u00fbts cach\u00e9s.",
    },
    {
      sousCritereId: "C1.3",
      sousCritereNom:
        "Gestion des incidents et engagements de d\u00e9lais (GTI/GTR)",
      finaliteProbable:
        "Vise \u00e0 \u00e9valuer la r\u00e9activit\u00e9 du candidat et sa capacit\u00e9 \u00e0 prendre des engagements fermes mesurables sur les temps d'intervention et de r\u00e9solution.",
      attendusImplicites: [
        "Grille de GTI/GTR par niveau de criticit\u00e9 (P1 \u00e0 P4)",
        "Description pr\u00e9cise du processus de prise en charge (de l'appel \u00e0 la cl\u00f4ture)",
        "Dispositif d'astreinte d\u00e9taill\u00e9 (horaires, moyens, r\u00e9activit\u00e9)",
        "Syst\u00e8me de ticketing et reporting propos\u00e9",
        "P\u00e9nalit\u00e9s accept\u00e9es en cas de non-respect des SLA",
      ],
      jurySecurise:
        "Le jury s\u00e9curise la disponibilit\u00e9 du SI : un incident majeur non r\u00e9solu rapidement paralyse les services publics. Les engagements chiffr\u00e9s sont la garantie mesurable.",
    },
    {
      sousCritereId: "C3.1",
      sousCritereNom:
        "Actions environnementales li\u00e9es \u00e0 l'ex\u00e9cution du march\u00e9",
      finaliteProbable:
        "Dans des march\u00e9s r\u00e9cents, ce crit\u00e8re vise \u00e0 \u00e9valuer les actions concr\u00e8tes du candidat pour r\u00e9duire l'empreinte environnementale de la prestation.",
      attendusImplicites: [
        "Politique de gestion du cycle de vie des \u00e9quipements (reconditionnement, recyclage DEEE)",
        "Optimisation des d\u00e9placements (t\u00e9l\u00e9maintenance, regroupement d'interventions)",
        "Bilan carbone de la prestation ou engagement de r\u00e9duction",
        "Utilisation de mat\u00e9riel reconditionn\u00e9 ou \u00e9co-labellis\u00e9",
      ],
      jurySecurise:
        "La collectivit\u00e9 r\u00e9pond \u00e0 ses obligations l\u00e9gales (loi Climat et R\u00e9silience, AGEC) et \u00e0 ses engagements politiques en mati\u00e8re de d\u00e9veloppement durable.",
    },
    {
      sousCritereId: "C3.2",
      sousCritereNom: "Politique sociale et insertion",
      finaliteProbable:
        "Vise g\u00e9n\u00e9ralement \u00e0 \u00e9valuer l'engagement social du candidat, particuli\u00e8rement en mati\u00e8re d'insertion professionnelle.",
      attendusImplicites: [
        "Heures d'insertion pr\u00e9vues (clause Insertion le cas \u00e9ch\u00e9ant)",
        "Politique de formation et mont\u00e9e en comp\u00e9tences des collaborateurs",
        "Actions en faveur de la diversit\u00e9 et de l'\u00e9galit\u00e9 professionnelle",
        "Partenariats avec des structures d'insertion locales",
      ],
      jurySecurise:
        "La collectivit\u00e9 veut s'assurer que le march\u00e9 public contribue \u00e0 l'emploi local et \u00e0 l'insertion, conform\u00e9ment aux orientations du Code de la commande publique.",
    },
  ],

  bloc3: [
    {
      sousCritereId: "C1.1",
      sousCritereNom: "Organisation et moyens affect\u00e9s au march\u00e9",
      totalPoints: 20,
      items: [
        {
          nom: "Organigramme d\u00e9di\u00e9 et qualifications",
          pointsEstimes: 6,
          justification:
            "Dans des march\u00e9s multi-sites, l'\u00e9quipe d\u00e9di\u00e9e est le premier \u00e9l\u00e9ment \u00e9valu\u00e9 par les jurys.",
        },
        {
          nom: "Moyens techniques (outils, supervision)",
          pointsEstimes: 5,
          justification:
            "Les outils de supervision et ITSM sont devenus un pr\u00e9requis diff\u00e9renciant dans l'infog\u00e9rance.",
        },
        {
          nom: "Interlocuteur unique et gouvernance",
          pointsEstimes: 5,
          justification:
            "Le responsable de compte est syst\u00e9matiquement \u00e9valu\u00e9 dans les march\u00e9s d'infog\u00e9rance publique.",
        },
        {
          nom: "Plan de charge et disponibilit\u00e9",
          pointsEstimes: 4,
          justification:
            "Permet au jury de v\u00e9rifier que le candidat n'est pas en surcharge sur d'autres march\u00e9s.",
        },
      ],
    },
    {
      sousCritereId: "C1.2",
      sousCritereNom:
        "M\u00e9thodologie de maintenance pr\u00e9ventive et curative",
      totalPoints: 25,
      items: [
        {
          nom: "Plan de maintenance pr\u00e9ventive d\u00e9taill\u00e9",
          pointsEstimes: 8,
          justification:
            "C'est le coeur du sous-crit\u00e8re. Les jurys attendent un plan concret, pas g\u00e9n\u00e9rique.",
        },
        {
          nom: "Processus d'escalade et logigramme",
          pointsEstimes: 5,
          justification:
            "La clart\u00e9 du processus d'escalade est un marqueur de maturit\u00e9 ITIL.",
        },
        {
          nom: "Politique de s\u00e9curit\u00e9 (mises \u00e0 jour, patchs)",
          pointsEstimes: 5,
          justification:
            "Enjeu majeur pour les collectivit\u00e9s apr\u00e8s les cyberattaques r\u00e9centes sur le secteur public.",
        },
        {
          nom: "PRA/PCA et sauvegardes",
          pointsEstimes: 4,
          justification:
            "Exigence croissante depuis la directive NIS2 applicable aux collectivit\u00e9s.",
        },
        {
          nom: "Tableaux de bord et KPI",
          pointsEstimes: 3,
          justification:
            "Permet au jury de voir que le prestataire s'engage sur des r\u00e9sultats mesurables.",
        },
      ],
    },
    {
      sousCritereId: "C1.3",
      sousCritereNom:
        "Gestion des incidents et engagements de d\u00e9lais (GTI/GTR)",
      totalPoints: 15,
      items: [
        {
          nom: "Grille GTI/GTR par niveau de criticit\u00e9",
          pointsEstimes: 6,
          justification:
            "C'est l'\u00e9l\u00e9ment central de ce sous-crit\u00e8re, directement mesurable.",
        },
        {
          nom: "Dispositif d'astreinte",
          pointsEstimes: 4,
          justification:
            "Pour 12 sites, l'astreinte est cruciale. Les jurys \u00e9valuent la couverture horaire.",
        },
        {
          nom: "Syst\u00e8me de ticketing et reporting",
          pointsEstimes: 3,
          justification:
            "Outil de tra\u00e7abilit\u00e9 et de pilotage op\u00e9rationnel pour l'acheteur.",
        },
        {
          nom: "P\u00e9nalit\u00e9s et engagements SLA",
          pointsEstimes: 2,
          justification:
            "Les candidats acceptant des p\u00e9nalit\u00e9s d\u00e9montrent leur confiance dans leur capacit\u00e9 de livraison.",
        },
      ],
      impactPrix:
        "Le crit\u00e8re prix (30%) utilise la formule inversement proportionnelle. Un \u00e9cart de 10% sur le prix forfaitaire repr\u00e9sente environ 2 points sur 20. La valeur technique (60%) offre donc un levier de diff\u00e9renciation 2x plus important que le prix.",
    },
    {
      sousCritereId: "C3.1",
      sousCritereNom:
        "Actions environnementales li\u00e9es \u00e0 l'ex\u00e9cution du march\u00e9",
      totalPoints: 5,
      items: [
        {
          nom: "Gestion du cycle de vie et DEEE",
          pointsEstimes: 2,
          justification:
            "Obligation l\u00e9gale avec la loi AGEC, les jurys y sont sensibles.",
        },
        {
          nom: "R\u00e9duction de l'empreinte carbone",
          pointsEstimes: 2,
          justification:
            "T\u00e9l\u00e9maintenance et regroupement des interventions sont des leviers concrets attendus.",
        },
        {
          nom: "Mat\u00e9riel \u00e9co-responsable",
          pointsEstimes: 1,
          justification:
            "\u00c9l\u00e9ment diff\u00e9renciant mais secondaire dans ce type de march\u00e9.",
        },
      ],
    },
    {
      sousCritereId: "C3.2",
      sousCritereNom: "Politique sociale et insertion",
      totalPoints: 5,
      items: [
        {
          nom: "Heures d'insertion",
          pointsEstimes: 2,
          justification:
            "Si clause d'insertion pr\u00e9sente, c'est l'\u00e9l\u00e9ment principal d'\u00e9valuation.",
        },
        {
          nom: "Formation et mont\u00e9e en comp\u00e9tences",
          pointsEstimes: 2,
          justification:
            "D\u00e9montre une vision long terme et un investissement humain.",
        },
        {
          nom: "Partenariats locaux",
          pointsEstimes: 1,
          justification:
            "Valoris\u00e9 par les collectivit\u00e9s attach\u00e9es au d\u00e9veloppement du tissu \u00e9conomique local.",
        },
      ],
    },
  ],

  bloc4: [
    {
      id: "R1",
      point: "Exigence de continuit\u00e9 sur 12 sites simultan\u00e9s",
      niveau: "critique",
      description:
        "Le RC mentionne explicitement 12 sites avec des horaires d'ouverture diff\u00e9renci\u00e9s. Un incident majeur simultan\u00e9 sur plusieurs sites n\u00e9cessite une capacit\u00e9 d'intervention parall\u00e8le.",
      recommendation:
        "D\u00e9tailler un sc\u00e9nario de crise multi-sites avec la r\u00e9partition des \u00e9quipes et les priorit\u00e9s d'intervention. Pr\u00e9voir un plan de communication de crise.",
      critereLie: "C1.1 / C1.3",
    },
    {
      id: "R2",
      point: "Formule de notation prix inversement proportionnelle",
      niveau: "critique",
      description:
        "La formule (prix min / prix candidat) x pond\u00e9ration favorise m\u00e9caniquement le moins-disant. Un \u00e9cart de prix important est difficile \u00e0 compenser par la technique seule.",
      recommendation:
        "Optimiser le prix forfaitaire pour rester comp\u00e9titif. Simuler l'impact de diff\u00e9rents niveaux de prix sur la note finale. Compenser par une offre technique maximale (60 pts).",
      critereLie: "C2.1",
    },
    {
      id: "R3",
      point:
        "Obligation de r\u00e9f\u00e9rences similaires en collectivit\u00e9 territoriale",
      niveau: "eleve",
      description:
        "Le RC exige des r\u00e9f\u00e9rences en collectivit\u00e9 territoriale de taille comparable. Le jury \u00e9valuera la proximit\u00e9 des r\u00e9f\u00e9rences avec le p\u00e9rim\u00e8tre du march\u00e9.",
      recommendation:
        "S\u00e9lectionner les 3-5 r\u00e9f\u00e9rences les plus proches (taille, p\u00e9rim\u00e8tre, multi-sites). Inclure des attestations de bonne ex\u00e9cution et des r\u00e9sultats chiffr\u00e9s (taux de disponibilit\u00e9, respect des SLA).",
      critereLie: "C1.1 / C1.2",
    },
    {
      id: "R4",
      point:
        "Mention sp\u00e9cifique de la cybers\u00e9curit\u00e9 dans le RC",
      niveau: "eleve",
      description:
        "Le RC fait r\u00e9f\u00e9rence aux exigences de l'ANSSI et \u00e0 la conformit\u00e9 NIS2. Le jury sera particuli\u00e8rement attentif aux mesures de s\u00e9curit\u00e9 propos\u00e9es.",
      recommendation:
        "Inclure un volet cybers\u00e9curit\u00e9 d\u00e9di\u00e9 : politique de patchs, audits de vuln\u00e9rabilit\u00e9s, sensibilisation des agents, conformit\u00e9 RGPD. Mentionner les certifications (ISO 27001, SecNumCloud si applicable).",
      critereLie: "C1.2",
    },
    {
      id: "R5",
      point: "P\u00e9riode de transition / r\u00e9versibilit\u00e9",
      niveau: "modere",
      description:
        "Le RC pr\u00e9voit une p\u00e9riode de transition de 2 mois. Le jury \u00e9valuera la capacit\u00e9 du candidat \u00e0 assurer une reprise fluide sans interruption de service.",
      recommendation:
        "Proposer un plan de transition d\u00e9taill\u00e9 avec un r\u00e9troplanning, les livrables \u00e0 chaque \u00e9tape, et les conditions de r\u00e9versibilit\u00e9 en fin de march\u00e9.",
      critereLie: "C1.1 / C1.2",
    },
    {
      id: "R6",
      point: "Clause d'insertion sociale",
      niveau: "modere",
      description:
        "Le RC mentionne une clause d'insertion de 5% des heures. Le non-respect entra\u00eene des p\u00e9nalit\u00e9s.",
      recommendation:
        "Identifier en amont des partenaires d'insertion (SIAE, missions locales). Pr\u00e9voir un plan d'insertion d\u00e9taill\u00e9 avec suivi trimestriel et objectifs chiffr\u00e9s.",
      critereLie: "C3.2",
    },
  ],

  bloc5: [
    {
      sousCritereId: "C1.1",
      sousCritereNom: "Organisation et moyens affect\u00e9s au march\u00e9",
      elementsImperatifs: [
        "Organigramme nominatif avec CV des intervenants cl\u00e9s",
        "Certifications techniques des \u00e9quipes (Microsoft, Cisco, ITIL...)",
        "Identification du responsable de compte et de son suppl\u00e9ant",
        "Moyens techniques d\u00e9ploy\u00e9s (outil ITSM, supervision, t\u00e9l\u00e9maintenance)",
        "Couverture g\u00e9ographique et temps de d\u00e9placement vers chaque site",
      ],
      elementsDifferenciants: [
        "Plan de formation continue des \u00e9quipes sur les technologies du SI de la collectivit\u00e9",
        "Outil de supervision en temps r\u00e9el avec dashboard personnalis\u00e9 pour la collectivit\u00e9",
        "Engagement sur la stabilit\u00e9 des \u00e9quipes (clause de non-remplacement sans accord)",
        "Sc\u00e9nario de mont\u00e9e en charge en cas de pic d'activit\u00e9 ou incident majeur",
      ],
      erreursPenalisantes: [
        "Pr\u00e9senter un organigramme g\u00e9n\u00e9rique sans lien avec le march\u00e9 sp\u00e9cifique",
        "Ne pas quantifier les ETP d\u00e9di\u00e9s au march\u00e9",
        "Omettre les certifications et qualifications techniques",
        "Ne pas pr\u00e9ciser les outils concrets utilis\u00e9s (rester vague sur la supervision)",
      ],
    },
    {
      sousCritereId: "C1.2",
      sousCritereNom:
        "M\u00e9thodologie de maintenance pr\u00e9ventive et curative",
      elementsImperatifs: [
        "Plan de maintenance pr\u00e9ventive avec fr\u00e9quences et checklist par type d'\u00e9quipement",
        "Processus d'escalade avec logigramme",
        "Politique de gestion des mises \u00e0 jour et patchs de s\u00e9curit\u00e9",
        "Proc\u00e9dures de sauvegarde et plan PRA/PCA",
        "Proposition de tableaux de bord et KPI de suivi",
      ],
      elementsDifferenciants: [
        "R\u00e9f\u00e9rence explicite aux bonnes pratiques ITIL v4 avec exemples d'application",
        "Proposition de comit\u00e9s de pilotage (fr\u00e9quence, ordre du jour type, livrables)",
        "Roadmap d'am\u00e9lioration continue du SI sur la dur\u00e9e du march\u00e9",
        "Volet cybers\u00e9curit\u00e9 d\u00e9di\u00e9 avec audits r\u00e9guliers et plan de sensibilisation",
      ],
      erreursPenalisantes: [
        "Copier-coller une m\u00e9thodologie g\u00e9n\u00e9rique sans l'adapter au contexte (12 sites, collectivit\u00e9)",
        "Ne pas d\u00e9tailler les fr\u00e9quences de maintenance pr\u00e9ventive",
        "Ignorer le volet cybers\u00e9curit\u00e9 alors que le RC le mentionne explicitement",
        "Proposer des KPI sans pr\u00e9ciser les valeurs cibles ni les seuils d'alerte",
      ],
    },
    {
      sousCritereId: "C1.3",
      sousCritereNom:
        "Gestion des incidents et engagements de d\u00e9lais (GTI/GTR)",
      elementsImperatifs: [
        "Grille de GTI/GTR diff\u00e9renci\u00e9e par niveau de criticit\u00e9 (P1 \u00e0 P4)",
        "Description du processus de bout en bout (d\u00e9claration \u2192 diagnostic \u2192 r\u00e9solution \u2192 cl\u00f4ture)",
        "Dispositif d'astreinte (plages horaires, moyens, r\u00e9activit\u00e9)",
        "Outil de ticketing propos\u00e9 avec fonctionnalit\u00e9s cl\u00e9s",
      ],
      elementsDifferenciants: [
        "GTI/GTR plus ambitieux que les minimums demand\u00e9s dans le RC",
        "Portail client en temps r\u00e9el pour le suivi des tickets",
        "Engagement sur un taux de r\u00e9solution au premier appel (First Call Resolution)",
        "Rapports mensuels automatis\u00e9s avec analyse de tendances",
      ],
      erreursPenalisantes: [
        "Proposer des GTI/GTR identiques quel que soit le niveau de criticit\u00e9",
        "Ne pas pr\u00e9ciser le dispositif d'astreinte (horaires, \u00e9quipes d\u00e9di\u00e9es)",
        "Omettre les p\u00e9nalit\u00e9s en cas de non-respect des engagements",
        "Ne pas d\u00e9crire le processus complet de gestion d'un incident",
      ],
    },
    {
      sousCritereId: "C3.1",
      sousCritereNom:
        "Actions environnementales li\u00e9es \u00e0 l'ex\u00e9cution du march\u00e9",
      elementsImperatifs: [
        "Politique de gestion des DEEE conforme \u00e0 la r\u00e9glementation",
        "Actions concr\u00e8tes de r\u00e9duction de l'empreinte carbone li\u00e9es au march\u00e9",
      ],
      elementsDifferenciants: [
        "Bilan carbone pr\u00e9visionnel de la prestation avec objectifs de r\u00e9duction",
        "Proposition de mat\u00e9riel reconditionn\u00e9 ou \u00e9co-labellis\u00e9",
        "Partenariat avec des fili\u00e8res de recyclage locales",
      ],
      erreursPenalisantes: [
        "Se limiter \u00e0 des d\u00e9clarations d'intention sans actions concr\u00e8tes",
        "Ignorer les obligations l\u00e9gales (AGEC, DEEE)",
      ],
    },
    {
      sousCritereId: "C3.2",
      sousCritereNom: "Politique sociale et insertion",
      elementsImperatifs: [
        "Plan d'insertion d\u00e9taill\u00e9 avec volume d'heures pr\u00e9vues",
        "Identification des partenaires d'insertion",
      ],
      elementsDifferenciants: [
        "Engagement sup\u00e9rieur au minimum requis (5%)",
        "Plan de formation qualifiante pour les personnes en insertion",
        "Suivi trimestriel avec indicateurs chiffr\u00e9s",
      ],
      erreursPenalisantes: [
        "Ne pas chiffrer les heures d'insertion",
        "Absence de partenaires d'insertion identifi\u00e9s",
        "Confondre insertion et formation classique des salari\u00e9s",
      ],
    },
  ],

  bloc6: [
    {
      critere: "C1.1 - Organisation et moyens",
      items: [
        {
          id: "conf-1",
          label: "Organigramme nominatif avec CV des intervenants",
          conforme: null,
        },
        {
          id: "conf-2",
          label: "Certifications techniques list\u00e9es",
          conforme: null,
        },
        {
          id: "conf-3",
          label: "Responsable de compte identifi\u00e9 + suppl\u00e9ant",
          conforme: null,
        },
        {
          id: "conf-4",
          label:
            "Moyens techniques d\u00e9taill\u00e9s (ITSM, supervision)",
          conforme: null,
        },
        {
          id: "conf-5",
          label: "Plan de charge pr\u00e9visionnel",
          conforme: null,
        },
        {
          id: "conf-6",
          label: "Couverture g\u00e9ographique des 12 sites",
          conforme: null,
        },
        {
          id: "conf-7",
          label:
            "[Diff\u00e9renciant] Dashboard supervision temps r\u00e9el",
          conforme: null,
        },
        {
          id: "conf-8",
          label:
            "[Diff\u00e9renciant] Engagement stabilit\u00e9 des \u00e9quipes",
          conforme: null,
        },
      ],
    },
    {
      critere: "C1.2 - M\u00e9thodologie de maintenance",
      items: [
        {
          id: "conf-9",
          label: "Plan de maintenance pr\u00e9ventive d\u00e9taill\u00e9",
          conforme: null,
        },
        {
          id: "conf-10",
          label: "Processus d'escalade avec logigramme",
          conforme: null,
        },
        {
          id: "conf-11",
          label: "Politique mises \u00e0 jour et patchs s\u00e9curit\u00e9",
          conforme: null,
        },
        {
          id: "conf-12",
          label: "PRA/PCA et proc\u00e9dures de sauvegarde",
          conforme: null,
        },
        {
          id: "conf-13",
          label: "Tableaux de bord et KPI propos\u00e9s",
          conforme: null,
        },
        {
          id: "conf-14",
          label:
            "[Diff\u00e9renciant] Volet cybers\u00e9curit\u00e9 d\u00e9di\u00e9",
          conforme: null,
        },
        {
          id: "conf-15",
          label:
            "[Diff\u00e9renciant] Roadmap am\u00e9lioration continue",
          conforme: null,
        },
      ],
    },
    {
      critere: "C1.3 - Gestion des incidents et SLA",
      items: [
        {
          id: "conf-16",
          label: "Grille GTI/GTR par criticit\u00e9 (P1-P4)",
          conforme: null,
        },
        {
          id: "conf-17",
          label:
            "Processus incident complet (d\u00e9claration \u2192 cl\u00f4ture)",
          conforme: null,
        },
        {
          id: "conf-18",
          label: "Dispositif d'astreinte d\u00e9taill\u00e9",
          conforme: null,
        },
        {
          id: "conf-19",
          label: "Outil de ticketing pr\u00e9sent\u00e9",
          conforme: null,
        },
        {
          id: "conf-20",
          label:
            "[Diff\u00e9renciant] GTI/GTR sup\u00e9rieurs aux minimums",
          conforme: null,
        },
        {
          id: "conf-21",
          label: "[Diff\u00e9renciant] Portail client temps r\u00e9el",
          conforme: null,
        },
      ],
    },
    {
      critere: "C3.1 - Actions environnementales",
      items: [
        {
          id: "conf-22",
          label: "Gestion des DEEE conforme",
          conforme: null,
        },
        {
          id: "conf-23",
          label: "Actions r\u00e9duction empreinte carbone",
          conforme: null,
        },
        {
          id: "conf-24",
          label: "[Diff\u00e9renciant] Bilan carbone pr\u00e9visionnel",
          conforme: null,
        },
      ],
    },
    {
      critere: "C3.2 - Politique sociale et insertion",
      items: [
        {
          id: "conf-25",
          label: "Plan d'insertion avec heures chiffr\u00e9es",
          conforme: null,
        },
        {
          id: "conf-26",
          label: "Partenaires d'insertion identifi\u00e9s",
          conforme: null,
        },
        {
          id: "conf-27",
          label:
            "[Diff\u00e9renciant] Engagement > 5% heures insertion",
          conforme: null,
        },
      ],
    },
  ],
};
