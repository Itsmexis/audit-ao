export type StatutAudit = "present" | "partiel" | "absent" | "hors-sujet";

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
  presentCount: number;
  partielCount: number;
  absentCount: number;
  horsSujetCount: number;
  totalPoints: number;
  criteres: CritereAudit[];
  recap: RecapCritere[];
}

export const mockAudit: AuditAOData = {
  marcheRef: "CCVL-2026-SI-003",
  memoireTitre: "Mémoire technique - Maintenance et infogérance du SI",
  dateAudit: "05/03/2026",
  scoreGlobal: 72,
  presentCount: 18,
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
          nom: "Organisation et moyens affectés au marché",
          ponderation: 20,
          points: [
            {
              id: "p1",
              label: "Organigramme nominatif avec CV des intervenants",
              statut: "present",
              extrait:
                "L'équipe dédiée est composée de 4 techniciens certifiés [...] cf. annexe 3 - CV détaillés",
              commentaire:
                "Organigramme présent et détaillé avec CV en annexe. Les certifications sont listées.",
            },
            {
              id: "p2",
              label: "Certifications techniques des équipes",
              statut: "present",
              extrait:
                "Certifications ITIL v4 Foundation, Microsoft 365 Certified, Cisco CCNA",
              commentaire:
                "Certifications pertinentes et à jour. Bonne couverture du périmètre technique.",
            },
            {
              id: "p3",
              label: "Responsable de compte identifié + suppléant",
              statut: "present",
              extrait:
                "M. Dupont, responsable de compte dédié, sera votre interlocuteur unique. Mme Martin assure la suppléance.",
              commentaire:
                "Interlocuteur unique et suppléant clairement identifiés avec coordonnées.",
            },
            {
              id: "p4",
              label: "Moyens techniques (ITSM, supervision, télémaintenance)",
              statut: "partiel",
              extrait:
                "Nous utilisons un outil ITSM conforme aux bonnes pratiques ITIL.",
              commentaire:
                "L'outil ITSM est mentionné mais pas nommé. Aucune mention de la supervision ni de la télémaintenance. Le jury attend des noms d'outils concrets et des captures d'écran.",
            },
            {
              id: "p5",
              label: "Plan de charge prévisionnel",
              statut: "absent",
              extrait: undefined,
              commentaire:
                "Aucun plan de charge prévisionnel n'est présenté. Le jury ne peut pas évaluer la disponibilité réelle de l'équipe. Risque de note fortement diminuée sur ce point.",
            },
            {
              id: "p6",
              label: "Couverture géographique des 12 sites",
              statut: "present",
              extrait:
                "Notre agence de Tours, située à 25 min maximum de l'ensemble des sites, permet une intervention rapide sur les 12 implantations.",
              commentaire:
                "Temps de déplacement chiffré. Bonne adéquation avec le périmètre multi-sites.",
            },
          ],
        },
        {
          id: "C1.2",
          nom: "Méthodologie de maintenance préventive et curative",
          ponderation: 25,
          points: [
            {
              id: "p7",
              label: "Plan de maintenance préventive détaillé",
              statut: "present",
              extrait:
                "Le plan de maintenance préventive prévoit des interventions mensuelles [...] checklist par type d'équipement en annexe 5.",
              commentaire:
                "Plan détaillé avec fréquences et checklist. Bien structuré par type d'équipement.",
            },
            {
              id: "p8",
              label: "Processus d'escalade avec logigramme",
              statut: "present",
              extrait:
                "Le processus d'escalade est décrit page 14, accompagné d'un logigramme détaillé.",
              commentaire:
                "Logigramme présent et lisible. Les niveaux d'escalade sont clairement définis.",
            },
            {
              id: "p9",
              label: "Politique mises à jour et patchs sécurité",
              statut: "partiel",
              extrait:
                "Les mises à jour de sécurité sont appliquées régulièrement selon les recommandations éditeurs.",
              commentaire:
                "Trop vague. Le jury attend des fréquences précises, une politique de test avant déploiement, et une référence aux préconisations ANSSI.",
            },
            {
              id: "p10",
              label: "PRA/PCA et procédures de sauvegarde",
              statut: "partiel",
              extrait:
                "Un PRA est en place avec des sauvegardes quotidiennes.",
              commentaire:
                "Le PRA est mentionné mais pas détaillé (RTO/RPO non précisés). Les procédures de sauvegarde manquent de précision sur la rétention et les tests de restauration.",
            },
            {
              id: "p11",
              label: "Tableaux de bord et KPI proposés",
              statut: "present",
              extrait:
                "Nous proposons un tableau de bord mensuel avec les KPI suivants : taux de disponibilité, MTTR, taux de résolution premier appel, nombre d'incidents par site.",
              commentaire:
                "KPI pertinents et mesurables. Bon alignement avec les attentes classiques des collectivités.",
            },
            {
              id: "p12",
              label:
                "[Différenciant] Volet cybersécurité dédié",
              statut: "absent",
              extrait: undefined,
              commentaire:
                "Aucun volet cybersécurité dédié alors que le RC mentionne explicitement les exigences ANSSI et NIS2. C'est un manque significatif qui sera pénalisé.",
            },
          ],
        },
        {
          id: "C1.3",
          nom: "Gestion des incidents et engagements de délais (GTI/GTR)",
          ponderation: 15,
          points: [
            {
              id: "p13",
              label: "Grille GTI/GTR par criticité (P1-P4)",
              statut: "present",
              extrait:
                "P1 (critique) : GTI 30min, GTR 4h | P2 (majeur) : GTI 1h, GTR 8h | P3 : GTI 4h, GTR 24h | P4 : GTI 8h, GTR 48h",
              commentaire:
                "Grille complète et bien structurée. Les engagements sont ambitieux et cohérents.",
            },
            {
              id: "p14",
              label: "Processus incident complet (déclaration à clôture)",
              statut: "present",
              extrait:
                "Le processus est décrit de la prise d'appel à la clôture avec validation utilisateur.",
              commentaire:
                "Processus complet et bien documenté. La validation utilisateur en fin de processus est un bon point.",
            },
            {
              id: "p15",
              label: "Dispositif d'astreinte détaillé",
              statut: "partiel",
              extrait:
                "Une astreinte est assurée en dehors des heures ouvrées.",
              commentaire:
                "Trop vague. Le jury attend les plages horaires exactes, le nombre de personnes en astreinte, les moyens de contact, et le délai de rappel.",
            },
            {
              id: "p16",
              label: "Outil de ticketing présenté",
              statut: "present",
              extrait:
                "Nous utilisons GLPI pour la gestion des tickets, avec portail utilisateur et suivi en temps réel.",
              commentaire:
                "Outil nommé avec fonctionnalités détaillées. Le portail utilisateur est un plus.",
            },
          ],
        },
      ],
    },
    {
      id: "C3",
      nom: "Développement durable",
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
              statut: "present",
              extrait:
                "Partenariat avec la filière Ecologic pour le traitement des DEEE. Bordereau de suivi des déchets fourni.",
              commentaire:
                "Filière identifiée avec traçabilité. Conforme aux exigences AGEC.",
            },
            {
              id: "p18",
              label: "Actions réduction empreinte carbone",
              statut: "partiel",
              extrait:
                "Nous privilégions la télémaintenance quand c'est possible.",
              commentaire:
                "Intention louable mais pas chiffrée. Le jury attend un pourcentage cible d'interventions à distance et un plan de regroupement des déplacements.",
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
              label: "Plan d'insertion avec heures chiffrées",
              statut: "absent",
              extrait: undefined,
              commentaire:
                "Aucun plan d'insertion présent. Le RC prévoit une clause de 5% des heures. Ce manque peut entraîner des pénalités contractuelles et une note nulle sur ce point.",
            },
            {
              id: "p20",
              label: "Partenaires d'insertion identifiés",
              statut: "absent",
              extrait: undefined,
              commentaire:
                "Aucun partenaire d'insertion mentionné. Il faut identifier des SIAE ou missions locales du territoire.",
            },
            {
              id: "p21",
              label: "Hors sujet détecté",
              statut: "hors-sujet",
              extrait:
                "Notre entreprise est engagée dans une démarche RSE globale avec un bilan carbone annuel.",
              commentaire:
                "Ce paragraphe concerne la RSE globale de l'entreprise et non la politique sociale/insertion liée à ce marché. Le jury évaluera uniquement les actions spécifiques au marché.",
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
          sousCritereNom: "Organisation et moyens affectés au marché",
          scoreEstime: "14/20",
          pointsForts: [
            {
              label:
                "Équipe dédiée de 4 techniciens certifiés (ITIL v4, Microsoft 365, Cisco CCNA) avec organigramme nominatif et CV détaillés en annexe",
              type: "reponse",
            },
            {
              label:
                "Interlocuteur unique identifié (M. Dupont) avec suppléant (Mme Martin), garantissant la continuité du pilotage",
              type: "reponse",
            },
            {
              label:
                "Proximité géographique : agence de Tours à 25 min maximum des 12 sites, permettant une intervention rapide",
              type: "reponse",
            },
            {
              label:
                "Couverture technique complète du périmètre avec des profils complémentaires (système, réseau, poste de travail)",
              type: "differenciant",
            },
          ],
          pointsFaibles: [
            {
              label: "Outils de supervision et télémaintenance non détaillés",
              amelioration:
                "Nommer les outils (ex: Zabbix, TeamViewer) et fournir des captures d'écran du dashboard de supervision",
            },
            {
              label: "Plan de charge prévisionnel absent",
              amelioration:
                "Ajouter un tableau montrant la répartition ETP par site et par mois, démontrant la capacité d'absorption de la charge",
            },
          ],
        },
        {
          sousCritereId: "C1.2",
          sousCritereNom:
            "Méthodologie de maintenance préventive et curative",
          scoreEstime: "16/25",
          pointsForts: [
            {
              label:
                "Plan de maintenance préventive structuré par type d'équipement avec fréquences et checklists détaillées",
              type: "reponse",
            },
            {
              label:
                "Processus d'escalade clair avec logigramme lisible et niveaux d'escalade bien définis",
              type: "reponse",
            },
            {
              label:
                "Tableaux de bord mensuels avec KPI pertinents : taux de disponibilité, MTTR, FCR, incidents par site",
              type: "reponse",
            },
            {
              label:
                "Approche ITIL structurée démontrant une maturité méthodologique supérieure à la moyenne des candidats",
              type: "differenciant",
            },
          ],
          pointsFaibles: [
            {
              label:
                "Politique de patchs de sécurité vague ('régulièrement selon recommandations éditeurs')",
              amelioration:
                "Détailler : fréquence de veille (quotidienne), délai d'application (critique <48h, standard <30j), processus de test, référence aux guides ANSSI",
            },
            {
              label:
                "PRA/PCA incomplet : RTO/RPO non précisés, tests de restauration non mentionnés",
              amelioration:
                "Préciser les objectifs RTO/RPO par service, la fréquence des tests de restauration (trimestrielle), et le plan de communication en cas de sinistre",
            },
            {
              label: "Absence totale de volet cybersécurité dédié",
              amelioration:
                "Ajouter une section dédiée : audits de vulnérabilités trimestriels, sensibilisation des agents, conformité NIS2, politique de mots de passe, chiffrement",
            },
          ],
        },
        {
          sousCritereId: "C1.3",
          sousCritereNom:
            "Gestion des incidents et engagements de délais (GTI/GTR)",
          scoreEstime: "11/15",
          pointsForts: [
            {
              label:
                "Grille GTI/GTR ambitieuse et différenciée par criticité (P1: GTI 30min/GTR 4h jusqu'à P4: GTI 8h/GTR 48h)",
              type: "reponse",
            },
            {
              label:
                "Processus de gestion des incidents complet de la déclaration à la clôture avec validation utilisateur",
              type: "reponse",
            },
            {
              label:
                "Utilisation de GLPI avec portail utilisateur et suivi temps réel, offrant transparence et traçabilité",
              type: "differenciant",
            },
          ],
          pointsFaibles: [
            {
              label:
                "Dispositif d'astreinte insuffisamment détaillé ('en dehors des heures ouvrées')",
              amelioration:
                "Préciser : plages horaires (ex: 7h-22h L-S, astreinte téléphonique D/fériés), nombre de personnes, délai de rappel (<15min), moyens de contact",
            },
          ],
        },
      ],
    },
    {
      critereId: "C3",
      critereNom: "Développement durable",
      ponderation: 10,
      sousCriteres: [
        {
          sousCritereId: "C3.1",
          sousCritereNom: "Actions environnementales",
          scoreEstime: "3/5",
          pointsForts: [
            {
              label:
                "Partenariat avec la filière Ecologic pour le traitement des DEEE avec bordereau de suivi, assurant la conformité AGEC",
              type: "reponse",
            },
          ],
          pointsFaibles: [
            {
              label:
                "Engagement de télémaintenance non chiffré ('quand c'est possible')",
              amelioration:
                "Fixer un objectif chiffré (ex: 60% d'interventions à distance), planifier le regroupement des déplacements avec un calendrier type",
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
                "Rédiger un plan d'insertion détaillé : 5% minimum des heures, profils visés, planning de montée en compétences, indicateurs de suivi trimestriels",
            },
            {
              label: "Aucun partenaire d'insertion identifié",
              amelioration:
                "Contacter des SIAE et missions locales du Val de Loire. Formaliser des lettres d'engagement ou conventions de partenariat à joindre en annexe",
            },
            {
              label:
                "Contenu hors sujet : RSE globale au lieu d'actions spécifiques au marché",
              amelioration:
                "Remplacer le paragraphe RSE générique par des actions concrètes liées à l'exécution de ce marché spécifique",
            },
          ],
        },
      ],
    },
  ],
};
