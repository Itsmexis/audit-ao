export type StatutAudit = "couvert" | "partiel" | "absent" | "hors-sujet";

export interface PointAudit {
  id: string;
  label: string;
  statut: StatutAudit;
  extrait?: string;
  commentaire: string;
}

export interface SousCritereAudit {
  id: string;
  nom: string;
  ponderation: number;
  points: PointAudit[];
}

export interface CritereAudit {
  id: string;
  nom: string;
  ponderation: number;
  sousCriteres: SousCritereAudit[];
}

export interface PointFort {
  label: string;
  type: "reponse" | "differenciant";
}

export interface PointFaible {
  label: string;
  amelioration: string;
}

export interface RecapSousCritere {
  sousCritereId: string;
  sousCritereNom: string;
  scoreEstime: string;
  pointsForts: PointFort[];
  pointsFaibles: PointFaible[];
}

export interface RecapCritere {
  critereId: string;
  critereNom: string;
  ponderation: number;
  sousCriteres: RecapSousCritere[];
}

export interface AuditAOData {
  marcheRef: string;
  memoireTitre: string;
  dateAudit: string;
  scoreGlobal: number;
  couvertCount: number;
  partielCount: number;
  absentCount: number;
  horsSujetCount: number;
  totalPoints: number;
  criteres: CritereAudit[];
  recap: RecapCritere[];
}

export const mockAudit: AuditAOData = {
  marcheRef: "CCVL-2026-SI-003",
  memoireTitre: "Memoire technique - Maintenance et infogerance du SI",
  dateAudit: "05/03/2026",
  scoreGlobal: 72,
  couvertCount: 18,
  partielCount: 7,
  absentCount: 4,
  horsSujetCount: 1,
  totalPoints: 30,

  criteres: [
    {
      id: "C1",
      nom: "Valeur technique",
      ponderation: 60,
      sousCriteres: [
        {
          id: "C1.1",
          nom: "Organisation et moyens affectes au marche",
          ponderation: 20,
          points: [
            {
              id: "p1",
              label: "Organigramme nominatif avec CV des intervenants",
              statut: "couvert",
              extrait:
                "L'equipe dediee est composee de 4 techniciens certifies [...] cf. annexe 3 - CV detailles",
              commentaire:
                "Organigramme present et detaille avec CV en annexe. Les certifications sont listees.",
            },
            {
              id: "p2",
              label: "Certifications techniques des equipes",
              statut: "couvert",
              extrait:
                "Certifications ITIL v4 Foundation, Microsoft 365 Certified, Cisco CCNA",
              commentaire:
                "Certifications pertinentes et a jour. Bonne couverture du perimetre technique.",
            },
            {
              id: "p3",
              label: "Responsable de compte identifie + suppleant",
              statut: "couvert",
              extrait:
                "M. Dupont, responsable de compte dedie, sera votre interlocuteur unique. Mme Martin assure la suppleance.",
              commentaire:
                "Interlocuteur unique et suppleant clairement identifies avec coordonnees.",
            },
            {
              id: "p4",
              label: "Moyens techniques (ITSM, supervision, telemaintenance)",
              statut: "partiel",
              extrait:
                "Nous utilisons un outil ITSM conforme aux bonnes pratiques ITIL.",
              commentaire:
                "L'outil ITSM est mentionne mais pas nomme. Aucune mention de la supervision ni de la telemaintenance. Le jury attend des noms d'outils concrets et des captures d'ecran.",
            },
            {
              id: "p5",
              label: "Plan de charge previsionnel",
              statut: "absent",
              extrait: undefined,
              commentaire:
                "Aucun plan de charge previsionnel n'est presente. Le jury ne peut pas evaluer la disponibilite reelle de l'equipe. Risque de note fortement diminuee sur ce point.",
            },
            {
              id: "p6",
              label: "Couverture geographique des 12 sites",
              statut: "couvert",
              extrait:
                "Notre agence de Tours, situee a 25 min maximum de l'ensemble des sites, permet une intervention rapide sur les 12 implantations.",
              commentaire:
                "Temps de deplacement chiffre. Bonne adequation avec le perimetre multi-sites.",
            },
          ],
        },
        {
          id: "C1.2",
          nom: "Methodologie de maintenance preventive et curative",
          ponderation: 25,
          points: [
            {
              id: "p7",
              label: "Plan de maintenance preventive detaille",
              statut: "couvert",
              extrait:
                "Le plan de maintenance preventive prevoit des interventions mensuelles [...] checklist par type d'equipement en annexe 5.",
              commentaire:
                "Plan detaille avec frequences et checklist. Bien structure par type d'equipement.",
            },
            {
              id: "p8",
              label: "Processus d'escalade avec logigramme",
              statut: "couvert",
              extrait:
                "Le processus d'escalade est decrit page 14, accompagne d'un logigramme detaille.",
              commentaire:
                "Logigramme present et lisible. Les niveaux d'escalade sont clairement definis.",
            },
            {
              id: "p9",
              label: "Politique mises a jour et patchs securite",
              statut: "partiel",
              extrait:
                "Les mises a jour de securite sont appliquees regulierement selon les recommandations editeurs.",
              commentaire:
                "Trop vague. Le jury attend des frequences precises, une politique de test avant deploiement, et une reference aux preconisations ANSSI.",
            },
            {
              id: "p10",
              label: "PRA/PCA et procedures de sauvegarde",
              statut: "partiel",
              extrait:
                "Un PRA est en place avec des sauvegardes quotidiennes.",
              commentaire:
                "Le PRA est mentionne mais pas detaille (RTO/RPO non precises). Les procedures de sauvegarde manquent de precision sur la retention et les tests de restauration.",
            },
            {
              id: "p11",
              label: "Tableaux de bord et KPI proposes",
              statut: "couvert",
              extrait:
                "Nous proposons un tableau de bord mensuel avec les KPI suivants : taux de disponibilite, MTTR, taux de resolution premier appel, nombre d'incidents par site.",
              commentaire:
                "KPI pertinents et mesurables. Bon alignement avec les attentes classiques des collectivites.",
            },
            {
              id: "p12",
              label:
                "[Differenciant] Volet cybersecurite dedie",
              statut: "absent",
              extrait: undefined,
              commentaire:
                "Aucun volet cybersecurite dedie alors que le RC mentionne explicitement les exigences ANSSI et NIS2. C'est un manque significatif qui sera penalise.",
            },
          ],
        },
        {
          id: "C1.3",
          nom: "Gestion des incidents et engagements de delais (GTI/GTR)",
          ponderation: 15,
          points: [
            {
              id: "p13",
              label: "Grille GTI/GTR par criticite (P1-P4)",
              statut: "couvert",
              extrait:
                "P1 (critique) : GTI 30min, GTR 4h | P2 (majeur) : GTI 1h, GTR 8h | P3 : GTI 4h, GTR 24h | P4 : GTI 8h, GTR 48h",
              commentaire:
                "Grille complete et bien structuree. Les engagements sont ambitieux et coherents.",
            },
            {
              id: "p14",
              label: "Processus incident complet (declaration a cloture)",
              statut: "couvert",
              extrait:
                "Le processus est decrit de la prise d'appel a la cloture avec validation utilisateur.",
              commentaire:
                "Processus complet et bien documente. La validation utilisateur en fin de processus est un bon point.",
            },
            {
              id: "p15",
              label: "Dispositif d'astreinte detaille",
              statut: "partiel",
              extrait:
                "Une astreinte est assuree en dehors des heures ouvrees.",
              commentaire:
                "Trop vague. Le jury attend les plages horaires exactes, le nombre de personnes en astreinte, les moyens de contact, et le delai de rappel.",
            },
            {
              id: "p16",
              label: "Outil de ticketing presente",
              statut: "couvert",
              extrait:
                "Nous utilisons GLPI pour la gestion des tickets, avec portail utilisateur et suivi en temps reel.",
              commentaire:
                "Outil nomme avec fonctionnalites detaillees. Le portail utilisateur est un plus.",
            },
          ],
        },
      ],
    },
    {
      id: "C3",
      nom: "Developpement durable",
      ponderation: 10,
      sousCriteres: [
        {
          id: "C3.1",
          nom: "Actions environnementales",
          ponderation: 5,
          points: [
            {
              id: "p17",
              label: "Gestion des DEEE conforme",
              statut: "couvert",
              extrait:
                "Partenariat avec la filiere Ecologic pour le traitement des DEEE. Bordereau de suivi des dechets fourni.",
              commentaire:
                "Filiere identifiee avec tracabilite. Conforme aux exigences AGEC.",
            },
            {
              id: "p18",
              label: "Actions reduction empreinte carbone",
              statut: "partiel",
              extrait:
                "Nous privilegions la telemaintenance quand c'est possible.",
              commentaire:
                "Intention louable mais pas chiffree. Le jury attend un pourcentage cible d'interventions a distance et un plan de regroupement des deplacements.",
            },
          ],
        },
        {
          id: "C3.2",
          nom: "Politique sociale et insertion",
          ponderation: 5,
          points: [
            {
              id: "p19",
              label: "Plan d'insertion avec heures chiffrees",
              statut: "absent",
              extrait: undefined,
              commentaire:
                "Aucun plan d'insertion present. Le RC prevoit une clause de 5% des heures. Ce manque peut entrainer des penalites contractuelles et une note nulle sur ce point.",
            },
            {
              id: "p20",
              label: "Partenaires d'insertion identifies",
              statut: "absent",
              extrait: undefined,
              commentaire:
                "Aucun partenaire d'insertion mentionne. Il faut identifier des SIAE ou missions locales du territoire.",
            },
            {
              id: "p21",
              label: "Hors sujet detecte",
              statut: "hors-sujet",
              extrait:
                "Notre entreprise est engagee dans une demarche RSE globale avec un bilan carbone annuel.",
              commentaire:
                "Ce paragraphe concerne la RSE globale de l'entreprise et non la politique sociale/insertion liee a ce marche. Le jury evaluera uniquement les actions specifiques au marche.",
            },
          ],
        },
      ],
    },
  ],

  recap: [
    {
      critereId: "C1",
      critereNom: "Valeur technique",
      ponderation: 60,
      sousCriteres: [
        {
          sousCritereId: "C1.1",
          sousCritereNom: "Organisation et moyens affectes au marche",
          scoreEstime: "14/20",
          pointsForts: [
            {
              label:
                "Equipe dediee de 4 techniciens certifies (ITIL v4, Microsoft 365, Cisco CCNA) avec organigramme nominatif et CV detailles en annexe",
              type: "reponse",
            },
            {
              label:
                "Interlocuteur unique identifie (M. Dupont) avec suppleant (Mme Martin), garantissant la continuite du pilotage",
              type: "reponse",
            },
            {
              label:
                "Proximite geographique : agence de Tours a 25 min maximum des 12 sites, permettant une intervention rapide",
              type: "reponse",
            },
            {
              label:
                "Couverture technique complete du perimetre avec des profils complementaires (systeme, reseau, poste de travail)",
              type: "differenciant",
            },
          ],
          pointsFaibles: [
            {
              label: "Outils de supervision et telemaintenance non detailles",
              amelioration:
                "Nommer les outils (ex: Zabbix, TeamViewer) et fournir des captures d'ecran du dashboard de supervision",
            },
            {
              label: "Plan de charge previsionnel absent",
              amelioration:
                "Ajouter un tableau montrant la repartition ETP par site et par mois, demontrant la capacite d'absorption de la charge",
            },
          ],
        },
        {
          sousCritereId: "C1.2",
          sousCritereNom:
            "Methodologie de maintenance preventive et curative",
          scoreEstime: "16/25",
          pointsForts: [
            {
              label:
                "Plan de maintenance preventive structure par type d'equipement avec frequences et checklists detaillees",
              type: "reponse",
            },
            {
              label:
                "Processus d'escalade clair avec logigramme lisible et niveaux d'escalade bien definis",
              type: "reponse",
            },
            {
              label:
                "Tableaux de bord mensuels avec KPI pertinents : taux de disponibilite, MTTR, FCR, incidents par site",
              type: "reponse",
            },
            {
              label:
                "Approche ITIL structuree demontrant une maturite methodologique superieure a la moyenne des candidats",
              type: "differenciant",
            },
          ],
          pointsFaibles: [
            {
              label:
                "Politique de patchs de securite vague ('regulierement selon recommandations editeurs')",
              amelioration:
                "Detailler : frequence de veille (quotidienne), delai d'application (critique <48h, standard <30j), processus de test, reference aux guides ANSSI",
            },
            {
              label:
                "PRA/PCA incomplet : RTO/RPO non precises, tests de restauration non mentionnes",
              amelioration:
                "Preciser les objectifs RTO/RPO par service, la frequence des tests de restauration (trimestrielle), et le plan de communication en cas de sinistre",
            },
            {
              label: "Absence totale de volet cybersecurite dedie",
              amelioration:
                "Ajouter une section dediee : audits de vulnerabilites trimestriels, sensibilisation des agents, conformite NIS2, politique de mots de passe, chiffrement",
            },
          ],
        },
        {
          sousCritereId: "C1.3",
          sousCritereNom:
            "Gestion des incidents et engagements de delais (GTI/GTR)",
          scoreEstime: "11/15",
          pointsForts: [
            {
              label:
                "Grille GTI/GTR ambitieuse et differenciee par criticite (P1: GTI 30min/GTR 4h jusqu'a P4: GTI 8h/GTR 48h)",
              type: "reponse",
            },
            {
              label:
                "Processus de gestion des incidents complet de la declaration a la cloture avec validation utilisateur",
              type: "reponse",
            },
            {
              label:
                "Utilisation de GLPI avec portail utilisateur et suivi temps reel, offrant transparence et tracabilite",
              type: "differenciant",
            },
          ],
          pointsFaibles: [
            {
              label:
                "Dispositif d'astreinte insuffisamment detaille ('en dehors des heures ouvrees')",
              amelioration:
                "Preciser : plages horaires (ex: 7h-22h L-S, astreinte telephonique D/feries), nombre de personnes, delai de rappel (<15min), moyens de contact",
            },
          ],
        },
      ],
    },
    {
      critereId: "C3",
      critereNom: "Developpement durable",
      ponderation: 10,
      sousCriteres: [
        {
          sousCritereId: "C3.1",
          sousCritereNom: "Actions environnementales",
          scoreEstime: "3/5",
          pointsForts: [
            {
              label:
                "Partenariat avec la filiere Ecologic pour le traitement des DEEE avec bordereau de suivi, assurant la conformite AGEC",
              type: "reponse",
            },
          ],
          pointsFaibles: [
            {
              label:
                "Engagement de telemaintenance non chiffre ('quand c'est possible')",
              amelioration:
                "Fixer un objectif chiffre (ex: 60% d'interventions a distance), planifier le regroupement des deplacements avec un calendrier type",
            },
          ],
        },
        {
          sousCritereId: "C3.2",
          sousCritereNom: "Politique sociale et insertion",
          scoreEstime: "0/5",
          pointsForts: [],
          pointsFaibles: [
            {
              label: "Plan d'insertion totalement absent",
              amelioration:
                "Rediger un plan d'insertion detaille : 5% minimum des heures, profils vises, planning de montee en competences, indicateurs de suivi trimestriels",
            },
            {
              label: "Aucun partenaire d'insertion identifie",
              amelioration:
                "Contacter des SIAE et missions locales du Val de Loire. Formaliser des lettres d'engagement ou conventions de partenariat a joindre en annexe",
            },
            {
              label:
                "Contenu hors sujet : RSE globale au lieu d'actions specifiques au marche",
              amelioration:
                "Remplacer le paragraphe RSE generique par des actions concretes liees a l'execution de ce marche specifique",
            },
          ],
        },
      ],
    },
  ],
};
