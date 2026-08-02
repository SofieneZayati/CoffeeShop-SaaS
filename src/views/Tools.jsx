import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BellRing,
  Bot,
  Box,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  CloudDownload,
  Coffee,
  Copy,
  CreditCard,
  DatabaseBackup,
  Dice5,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  Facebook,
  Gamepad2,
  Gift,
  Globe2,
  Heart,
  Image,
  Instagram,
  KeyRound,
  Languages,
  LayoutTemplate,
  LifeBuoy,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareText,
  MonitorSmartphone,
  MoreHorizontal,
  PackageCheck,
  Palette,
  Phone,
  Plus,
  Puzzle,
  QrCode,
  ReceiptText,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  TicketCheck,
  ToggleLeft,
  Trophy,
  Upload,
  UserRoundCog,
  UsersRound,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { events, gamesSeed, moduleGroups, staff } from "../data/demoData";
import { usePersistentState } from "../hooks";
import { Avatar, Badge, Button, Card, CheckLine, IconButton, PageHeader, Progress, SectionTitle, Segmented, Toggle } from "../components/ui";
import { QrPattern } from "../components/Overlays";
import { StaffLocalized, translateStaffText, useStaffLanguage } from "../context/StaffLanguageContext";
import "../styles/admin-interactions.css";

const MAP_URL = "https://maps.app.goo.gl/43Fah1d5SSyX5r2W6";

const toolsDictionary = { fr: {
  "Smart operations": "Opérations intelligentes",
  "AI & automation": "IA et automatisation",
  "Use assistant insights and rule-based workflows to keep daily service moving.": "Utilisez les analyses de l’assistant et des règles automatiques pour fluidifier le service quotidien.",
  "Activity history": "Historique d’activité",
  "New automation": "Nouvelle automatisation",
  "GREEN OPERATIONS ASSISTANT": "ASSISTANT OPÉRATIONS GREEN",
  "Ask about today’s operations.": "Interrogez les opérations du jour.",
  "The assistant uses the dashboard signals visible in this workspace.": "L’assistant utilise les indicateurs visibles dans cet espace.",
  "Try “How should I staff Friday evening?”": "Essayez « Comment organiser l’équipe vendredi soir ? »",
  "What needs attention?": "Que faut-il vérifier ?",
  "What should I promote?": "Que faut-il promouvoir ?",
  "Summarise reviews": "Résumer les avis",
  "Your Friday 19:00–21:00 window is projected to be busiest. Schedule Aya on bar and one extra service teammate; prepare the iced-coffee and fresh-juice stations before 18:30.": "Le créneau du vendredi de 19 h à 21 h devrait être le plus chargé. Prévoyez Aya au bar et une personne supplémentaire au service ; préparez les postes café glacé et jus frais avant 18 h 30.",
  "Active automations": "Automatisations actives",
  "Running now": "Actives maintenant",
  "Live": "En direct",
  "Messages this month": "Messages ce mois-ci",
  "Connected channel activity": "Activité des canaux connectés",
  "Tracked": "Suivis",
  "Stock alerts": "Alertes de stock",
  "Need team attention": "Nécessitent l’attention de l’équipe",
  "Open": "Ouvertes",
  "Assistant answers": "Réponses de l’assistant",
  "Operations questions handled": "Questions opérationnelles traitées",
  "Available": "Disponible",
  "Automation rules": "Règles d’automatisation",
  "Keep repetitive workflows consistent across the team": "Assurez la régularité des tâches répétitives dans toute l’équipe",
  "Add rule": "Ajouter une règle",
  "On": "Active",
  "Stock intelligence": "Suivi intelligent du stock",
  "Current levels and service forecast": "Niveaux actuels et prévision du service",
  "Tiramisu portions": "Portions de tiramisu",
  "Critical": "Critique",
  "7 left • about 2.5 hours of stock": "7 restantes • environ 2,5 heures de stock",
  "Restock": "Réapprovisionner",
  "Oat milk": "Lait d’avoine",
  "Low": "Faible",
  "9 L left • reorder before tomorrow": "9 L restants • recommander avant demain",
  "Review": "Vérifier",
  "House espresso": "Espresso maison",
  "Healthy": "Bon niveau",
  "18 kg • around 6 days of stock": "18 kg • environ 6 jours de stock",
  "Details": "Détails",
  "Service forecast:": "Prévision du service :",
  "prepare extra citrus and ice before Saturday’s event.": "préparez davantage d’agrumes et de glace avant l’événement de samedi.",
  "SUGGESTED BUNDLE": "DUO SUGGÉRÉ",
  "A bundle guests may love.": "Un duo que les clients pourraient aimer.",
  "Pair Iced coffee + Tiramisu for afternoon visits.": "Associez café glacé et tiramisu pour les visites de l’après-midi.",
  "Expected": "Prévue",
  "uplift": "hausse",
  "Strong": "Forte",
  "signal": "tendance",
  "Create bundle": "Créer le duo",
  "Green Café Assistant": "Assistant Green Café",
  "Active • Guest support": "Actif • Assistance client",
  "Assistant control": "Contrôle de l’assistant",
  "Do you have oat milk and a quiet table?": "Avez-vous du lait d’avoine et une table calme ?",
  "Yes! Oat milk is available for every coffee. Tables T01 and T10 are currently quiet and free. Would you like to reserve one?": "Oui ! Le lait d’avoine est disponible pour tous les cafés. Les tables T01 et T10 sont actuellement calmes et libres. Souhaitez-vous en réserver une ?",
  "Reserve T10": "Réserver T10",
  "See oat drinks": "Voir les boissons à l’avoine",
  "Train & customise assistant": "Configurer l’assistant",
  "Experiences": "Expériences",
  "Games, kids & events": "Jeux, enfants et événements",
  "Manage events, game availability, and family activities in one place.": "Gérez les événements, la disponibilité des jeux et les activités familiales au même endroit.",
  "Open guest page": "Ouvrir la page client",
  "Create event": "Créer un événement",
  "WHAT MAKES GREEN, GREEN": "L’ESPRIT GREEN",
  "Good coffee. Great reasons to stay.": "Bon café. Mille raisons de rester.",
  "Football nights, board games, and a safe kids park—organized in one joyful calendar.": "Soirées football, jeux de société et parc enfants sécurisé, réunis dans un calendrier convivial.",
  "Manage calendar": "Gérer le calendrier",
  "Open guest experience": "Ouvrir l’expérience client",
  "BIG MATCH ENERGY": "AMBIANCE GRAND MATCH",
  "Next • Sat 20:00": "Prochain • Sam. 20 h",
  "GAME LIBRARY": "BIBLIOTHÈQUE DE JEUX",
  "KIDS PARK": "PARC ENFANTS",
  "Safe • supervised": "Sûr • surveillé",
  "Event bookings": "Réservations d’événements",
  "This month": "Ce mois-ci",
  "Event guests": "Clients des événements",
  "Registered audience": "Audience inscrite",
  "Games available now": "Jeux disponibles maintenant",
  "Live game library": "Bibliothèque en direct",
  "Kids currently inside": "Enfants actuellement présents",
  "Capacity 18": "Capacité : 18",
  "Upcoming experiences": "Expériences à venir",
  "Bookings, capacity and promotion status": "Réservations, capacité et statut de communication",
  "Experience type": "Type d’expérience",
  "Events": "Événements",
  "Calendar": "Calendrier",
  "Promotion ready": "Communication prête",
  "Manage": "Gérer",
  "AUG": "AOÛT",
  "Add event": "Ajouter un événement",
  "MATCH NOTIFICATIONS": "NOTIFICATIONS DE MATCH",
  "Fill the room before the whistle.": "Remplissez la salle avant le coup d’envoi.",
  "Notify opted-in football fans when a major match is scheduled.": "Prévenez les fans de football inscrits lorsqu’un grand match est programmé.",
  "Big match detected": "Grand match détecté",
  "Champions League final": "Finale de la Ligue des champions",
  "Audience selected": "Audience sélectionnée",
  "Based on visits & opt-ins": "Selon les visites et les inscriptions",
  "Send at 18:00": "Envoi à 18 h",
  "WhatsApp + push": "WhatsApp + notification push",
  "Open campaign": "Ouvrir la campagne",
  "Games library": "Bibliothèque de jeux",
  "Click a game to check it out or return it": "Cliquez sur un jeu pour l’emprunter ou le rendre",
  "Available": "Disponible",
  "Checked out": "Emprunté",
  "Open game menu QR": "Ouvrir le QR des jeux",
  "KIDS PARK • 5 DT": "PARC ENFANTS • 5 DT",
  "Fun for them. A real pause for parents.": "Du plaisir pour eux. Une vraie pause pour les parents.",
  "Access is 5 DT per child. Capacity, safety rules, guardian contact, and check-in stay clear for every family.": "L’accès coûte 5 DT par enfant. Capacité, règles de sécurité, contact du responsable et entrée restent clairs pour chaque famille.",
  "children inside": "enfants présents",
  "Closes at 21:00": "Ferme à 21 h",
  "Manage kids park": "Gérer le parc enfants",
  "Guest experience": "Expérience client",
  "Create an event": "Créer un événement",
  "Game menu QR": "QR du menu des jeux",
  "Kids park check-in": "Entrée au parc enfants",
  "Experience workspace": "Espace expériences",
  "TODAY AT GREEN": "AUJOURD’HUI CHEZ GREEN",
  "Stay for more than coffee.": "Restez pour bien plus qu’un café.",
  "Browse games before arriving, see what is available now, and reserve a place at the next community event.": "Consultez les jeux avant de venir, vérifiez les disponibilités et réservez le prochain événement communautaire.",
  "Match nights": "Soirées match",
  "Bookings and table capacity": "Réservations et capacité des tables",
  "Games menu": "Menu des jeux",
  "Availability and player count": "Disponibilité et nombre de joueurs",
  "Rules, hours and workshops": "Règles, horaires et ateliers",
  "Event title": "Nom de l’événement",
  "Community quiz night": "Soirée quiz communautaire",
  "Experience type": "Type d’expérience",
  "Community event": "Événement communautaire",
  "Football night": "Soirée football",
  "Board games": "Jeux de société",
  "Kids park": "Parc enfants",
  "Date": "Date",
  "Time": "Heure",
  "Start time": "Heure de début",
  "Capacity": "Capacité",
  "Event name": "Nom de l’événement",
  "Guest information": "Informations clients",
  "players": "joueurs",
  "Check out": "Emprunter",
  "Return": "Rendre",
  "AVAILABLE NOW": "DISPONIBLE",
  "CHECKED OUT": "EMPRUNTÉ",
  "Ask the barista for the game pieces. Please return every component to the box.": "Demandez les pièces au barista et remettez chaque élément dans la boîte après utilisation.",
  "ID or table number recorded at checkout": "Pièce d’identité ou numéro de table enregistré à l’emprunt",
  "Missing-piece check on return": "Vérification des pièces au retour",
  "Guest sees availability on the public menu": "Le client voit la disponibilité sur le menu public",
  "Browse games on your phone": "Parcourir les jeux sur votre téléphone",
  "Scan this code to open the game library with availability and rules.": "Scannez ce code pour ouvrir la bibliothèque avec les disponibilités et les règles.",
  "Check one child out": "Enregistrer la sortie d’un enfant",
  "Check one child in": "Enregistrer l’entrée d’un enfant",
  "Access: 5 DT per child": "Accès : 5 DT par enfant",
  "Safety checklist": "Liste de sécurité",
  "Guardian confirmed • wristband assigned • allergies reviewed": "Responsable confirmé • bracelet attribué • allergies vérifiées",
  "Ready": "Prêt",
  "Close": "Fermer",
  "Add event": "Ajouter l’événement",
  "Save event": "Enregistrer l’événement",
  "Check out game": "Emprunter le jeu",
  "Return game": "Rendre le jeu",
  "Platform configuration": "Configuration de la plateforme",
  "Platform setup": "Configuration",
  "Manage the website, team access, payments, and enabled modules.": "Gérez le site, les accès de l’équipe, les paiements et les modules activés.",
  "Save configuration": "Enregistrer la configuration",
  "Website": "Site web",
  "Team & security": "Équipe et sécurité",
  "Payments": "Paiements",
  "All modules": "Tous les modules",
  "Brand & public website": "Marque et site public",
  "The story and details guests see before they visit": "L’histoire et les informations visibles avant la visite",
  "Replace logo": "Remplacer le logo",
  "Current café logo": "Logo actuel du café",
  "Café name": "Nom du café",
  "Tagline": "Slogan",
  "Brand story": "Histoire de la marque",
  "Good coffee. Great reasons to stay.": "Bon café. Mille raisons de rester.",
  "Guest information": "Informations clients",
  "Keep useful visit details accurate everywhere": "Gardez les informations de visite exactes partout",
  "Address": "Adresse",
  "Phone": "Téléphone",
  "Email": "E-mail",
  "Open in Google Maps": "Ouvrir dans Google Maps",
  "Website sections": "Sections du site",
  "Choose what appears on the customer website": "Choisissez ce qui apparaît sur le site client",
  "Opening hours & closures": "Horaires et fermetures",
  "Weekly schedule with special closure notices": "Horaires hebdomadaires et fermetures exceptionnelles",
  "Toggle opening hours": "Afficher ou masquer les horaires",
  "Photo gallery": "Galerie photos",
  "Café, products, games and atmosphere": "Café, produits, jeux et ambiance",
  "Toggle gallery": "Afficher ou masquer la galerie",
  "Accessibility mode": "Mode accessibilité",
  "Keyboard navigation, contrast and semantic content": "Navigation clavier, contraste et contenu sémantique",
  "Toggle accessibility": "Activer ou désactiver l’accessibilité",
  "PUBLIC WEBSITE": "SITE PUBLIC",
  "Take a little pause.": "Prenez une petite pause.",
  "Specialty coffee. Games. Good people.": "Café de spécialité. Jeux. Bonne compagnie.",
  "Explore our menu": "Découvrir notre carte",
  "Open customer website": "Ouvrir le site client",
  "Appearance": "Apparence",
  "Dashboard and customer theme": "Thème du tableau de bord et du site client",
  "Warm light": "Clair chaleureux",
  "Evening dark": "Sombre du soir",
  "Platform languages": "Langues de la plateforme",
  "English and French are available for every staff role and guest.": "L’anglais et le français sont disponibles pour tous les rôles et les clients.",
  "Open language controls": "Ouvrir les langues",
  "DOMAIN": "DOMAINE",
  "Custom domain": "Domaine personnalisé",
  "Connect your domain and SSL before publishing.": "Connectez votre domaine et le SSL avant publication.",
  "Domain settings": "Paramètres du domaine",
  "Team & permissions": "Équipe et permissions",
  "Roles and access for each staff workspace": "Rôles et accès de chaque espace de travail",
  "Invite team member": "Inviter un membre",
  "Team member": "Membre de l’équipe",
  "Role": "Rôle",
  "Shift": "Service",
  "Status": "Statut",
  "Owner": "Propriétaire",
  "Manager": "Responsable",
  "Barista": "Barista",
  "Online": "En ligne",
  "On shift": "En service",
  "Role access": "Accès par rôle",
  "Three clear staff workspaces": "Trois espaces de travail clairs",
  "Full platform, billing, exports and security.": "Plateforme complète, facturation, exports et sécurité.",
  "Operations, reports, tables, reservations and team shifts.": "Opérations, rapports, tables, réservations et services de l’équipe.",
  "Order preparation and menu availability.": "Préparation des commandes et disponibilité de la carte.",
  "1 member": "1 membre",
  "Bar station": "Poste bar",
  "STAFF QR ACCESS": "ACCÈS QR ÉQUIPE",
  "Start a shift in one scan.": "Démarrez un service en un scan.",
  "Connect rotating QR access to staff identity, expiry, and audit controls.": "Associez l’accès QR rotatif à l’identité, l’expiration et au suivi des accès.",
  "Configure QR access": "Configurer l’accès QR",
  "Security controls": "Contrôles de sécurité",
  "Protect owner and manager access": "Protégez les accès propriétaire et responsable",
  "Two-step verification": "Vérification en deux étapes",
  "Required for owner and manager": "Obligatoire pour le propriétaire et le responsable",
  "Required": "Obligatoire",
  "Activity log": "Journal d’activité",
  "Track important team and configuration changes": "Suivez les changements importants de l’équipe et de la configuration",
  "Automatic backup": "Sauvegarde automatique",
  "Encrypted cloud storage": "Stockage cloud chiffré",
  "Configured": "Configurée",
  "Recent activity": "Activité récente",
  "Latest important staff actions": "Dernières actions importantes de l’équipe",
  "Price updated": "Prix mis à jour",
  "Espresso • menu": "Espresso • carte",
  "Order GC-1045 completed": "Commande GC-1045 terminée",
  "Table 05 • service": "Table 05 • service",
  "Campaign scheduled": "Campagne programmée",
  "Derby night • marketing": "Soirée derby • marketing",
  "Open activity log": "Ouvrir le journal d’activité",
  "Payment providers": "Fournisseurs de paiement",
  "Connect secure checkout credentials": "Connectez les identifiants de paiement sécurisés",
  "Cards & local payments": "Cartes et paiements locaux",
  "Wallet & QR payments": "Portefeuille et paiements QR",
  "Online card checkout": "Paiement par carte en ligne",
  "Integration required": "Connexion requise",
  "Optional integration": "Connexion facultative",
  "Connect": "Connecter",
  "Checkout options": "Options de paiement",
  "Available after a payment provider is connected": "Disponibles après connexion d’un fournisseur de paiement",
  "Online payment": "Paiement en ligne",
  "Table QR checkout": "Paiement via QR de table",
  "Configure online payment": "Configurer le paiement en ligne",
  "Digital receipts": "Reçus numériques",
  "Email and PDF delivery": "Envoi par e-mail et PDF",
  "Configure digital receipts": "Configurer les reçus numériques",
  "Receipt loyalty sync": "Synchronisation fidélité du reçu",
  "Credit points from signed receipt records": "Créditer les points depuis des reçus signés",
  "Configure receipt loyalty": "Configurer la fidélité via reçu",
  "Payment status": "Statut du paiement",
  "States used by the checkout workflow": "États utilisés par le parcours de paiement",
  "Paid": "Payé",
  "Send a receipt and credit loyalty": "Envoyer un reçu et créditer la fidélité",
  "Pay at cashier": "Payer à la caisse",
  "Remain open until staff confirms": "Rester ouvert jusqu’à confirmation par l’équipe",
  "Failed": "Échoué",
  "Offer another payment option": "Proposer un autre moyen de paiement",
  "PAYMENT MIX": "RÉPARTITION DES PAIEMENTS",
  "Connect a provider to see live payment activity.": "Connectez un fournisseur pour voir l’activité de paiement en direct.",
  "Settlements": "Versements",
  "Available after a payment provider is connected": "Disponibles après connexion d’un fournisseur de paiement",
  "No settlement data yet": "Aucune donnée de versement",
  "Connect a provider to reconcile payouts here.": "Connectez un fournisseur pour rapprocher les versements ici.",
  "View provider settings": "Voir les paramètres du fournisseur",
  "COMPLETE PLATFORM": "PLATEFORME COMPLÈTE",
  "A complete coffee-shop operating system.": "Un système complet de gestion de café.",
  "Green Coffee brings customer experience, daily service, growth, intelligence, and control into one coherent workspace.": "Green Coffee réunit expérience client, service quotidien, croissance, analyses et contrôle dans un espace cohérent.",
  "OS": "OS",
  "ready": "prêt",
  "Included": "Inclus",
  "Explore": "Explorer",
  "READY FOR DEPLOYMENT": "PRÊT AU DÉPLOIEMENT",
  "Deployment & launch": "Déploiement et lancement",
  "Connect backend services, domain, SSL, monitoring, and handover for launch.": "Connectez les services backend, le domaine, le SSL, la surveillance et la transmission pour le lancement.",
  "View launch checklist": "Voir la liste de lancement",
  "SERVICE OPTION": "OPTION DE SERVICE",
  "Maintenance & support": "Maintenance et support",
  "Updates, backups, bug fixes, monitoring, and direct help can be covered by a care plan.": "Les mises à jour, sauvegardes, corrections, surveillance et assistance peuvent être couvertes par un forfait de maintenance.",
  "Review support plan": "Voir le forfait support",
  "BACKUP & EXPORT": "SAUVEGARDE ET EXPORT",
  "Backup & export": "Sauvegarde et export",
  "Portable exports use persistent storage, access controls, and a tested backup policy.": "Les exports portables utilisent un stockage persistant, des contrôles d’accès et une politique de sauvegarde testée.",
  "View export settings": "Voir les paramètres d’export",
  "Customer experience": "Expérience client",
  "Responsive café website": "Site du café responsive",
  "English/French digital & QR menu": "Carte numérique et QR en anglais/français",
  "53 real products, options and allergens": "53 produits, options et allergènes",
  "Customer accounts & favourites": "Comptes clients et favoris",
  "Games and 5 DT Kids Park access": "Jeux et accès parc enfants à 5 DT",
  "Map, contact, social links and opening hours": "Carte, contact, réseaux sociaux et horaires",
  "Service & operations": "Service et opérations",
  "Scan-started, expiring table ordering": "Commande à table ouverte par scan avec expiration",
  "Live barista / kitchen display": "Écran barista / cuisine en direct",
  "Accurate 8-table + 3-PC-table floor map": "Plan précis : 8 tables + 3 tables PC",
  "Reservations, waitlist and reminders": "Réservations, liste d’attente et rappels",
  "Daily cash and shift close": "Clôture de caisse et de service",
  "Order-ready customer display": "Affichage client des commandes prêtes",
  "Revenue & retention": "Revenus et fidélisation",
  "Online payments & digital receipts": "Paiements en ligne et reçus numériques",
  "Points, coupons and happy hours": "Points, coupons et happy hours",
  "Receipt QR loyalty sync": "Synchronisation fidélité via QR du reçu",
  "Rewards wallet, birthdays and VIP tiers": "Portefeuille de récompenses, anniversaires et niveaux VIP",
  "Campaign broadcasts and referrals": "Campagnes et parrainages",
  "Events and big-match notifications": "Événements et notifications de grands matchs",
  "Intelligence & control": "Analyses et contrôle",
  "Sales, QR and reservation reports": "Rapports de ventes, QR et réservations",
  "Peak-hour and behaviour insights": "Analyses des heures de pointe et comportements",
  "Session abuse controls and audit": "Contrôles anti-abus des sessions et audit",
  "Optional AI-assisted concepts": "Assistance IA facultative",
  "Optional AI-assisted workflows": "Flux assistés par IA facultatifs",
  "Low-stock and message automations": "Automatisations de stock et de messages",
  "Roles, activity log, backup and export": "Rôles, journal d’activité, sauvegarde et export",
  "Good coffee.": "Bon café.",
  "Great reasons to stay.": "Mille raisons de rester.",
  "Fill the room": "Remplissez la salle",
  "before the whistle.": "avant le coup d’envoi.",
  "Fun for them.": "Du plaisir pour eux.",
  "A real pause for parents.": "Une vraie pause pour les parents.",
  "Take a little": "Prenez une petite",
  "pause.": "pause.",
  "Menu   Events   Visit": "Carte   Événements   Visite",
  "Specialty coffee. Games. Good people.": "Café de spécialité. Jeux. Bonne compagnie.",
  "Recent activity: birthday reward sent, low-stock alert reviewed, and Friday staffing insight requested.": "Activité récente : récompense d’anniversaire envoyée, alerte de stock vérifiée et conseil d’équipe demandé pour vendredi.",
  "Reservation reminders": "Rappels de réservation",
  "2 hours before every confirmed booking": "2 heures avant chaque réservation confirmée",
  "Birthday delight": "Attention anniversaire",
  "Send a free-coffee reward at 09:00": "Envoyer une récompense café offert à 9 h",
  "Win back quiet regulars": "Relancer les habitués absents",
  "No visit for 30 days → 20% coupon": "Aucune visite depuis 30 jours → coupon de 20 %",
  "Low-stock warning": "Alerte de stock faible",
  "Alert when an ingredient falls below par": "Alerter lorsqu’un ingrédient passe sous le seuil",
  "Team notification": "Notification équipe",
  "Review follow-up": "Suivi après avis",
  "Thank 4–5★ guests and recover 1–3★ visits": "Remercier les clients 4–5★ et reconquérir les visites 1–3★",
  "Push + email": "Notification push + e-mail",
  "Email": "E-mail",
  "Champions League final": "Finale de la Ligue des champions",
  "Catan community night": "Soirée communautaire Catan",
  "Sunday kids workshop": "Atelier enfants du dimanche",
  "Playing Cards": "Jeu de cartes",
  "Chess": "Échecs",
  "Dominoes": "Dominos",
  "SAT": "SAM",
  "WED": "MER",
  "SUN": "DIM",
  "Staff QR": "QR équipe",
  "Payment activity": "Activité de paiement",
  "online": "en ligne",
  "cashier": "caisse",
  " bookings": " réservations",
  " players": " joueurs",
  " available": " disponibles",
  " checked out": " empruntés",
  " of ": " sur ",
  " places booked": " places réservées",
  " children inside": " enfants présents",
} };

const toolsPatterns = [
  (text, locale) => {
    if (locale !== "fr") return undefined;
    const rules = [
      [/^(\d+) this month$/, "$1 ce mois-ci"],
      [/^Toggle (.+)$/, "Activer ou désactiver $1"],
      [/^Options for (.+)$/, "Options de $1"],
      [/^(\d+) players$/, "$1 joueurs"],
      [/^Manage all (\d+)$/, "Gérer les $1"],
      [/^(\d+) available$/, "$1 disponibles"],
      [/^(\d+) checked out$/, "$1 empruntés"],
      [/^(\d+) of (\d+) places booked$/, "$1 places réservées sur $2"],
      [/^(\d+)\/(\d+) bookings$/, "$1/$2 réservations"],
      [/^More options for (.+)$/, "Plus d’options pour $1"],
      [/^Close (.+)$/, "Fermer : $1"],
      [/^(.+) requires provider connection$/, "$1 nécessite la connexion d’un fournisseur"],
    ];
    for (const [pattern, replacement] of rules) if (pattern.test(text)) return text.replace(pattern, replacement);
    return undefined;
  },
];

const automationIcons = { calendar: CalendarDays, gift: Gift, heart: Heart, box: Box, star: Star };

export function AutomationView({ automations, onToggleAutomation, showToast }) {
  const [aiQuery, setAiQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const ask = (event) => {
    event.preventDefault();
    if (!aiQuery.trim()) return;
    setAnswer("Your Friday 19:00–21:00 window is projected to be busiest. Schedule Aya on bar and one extra service teammate; prepare the iced-coffee and fresh-juice stations before 18:30.");
  };
  return (
    <StaffLocalized dictionary={toolsDictionary} patterns={toolsPatterns}>
    <div className="view automation-view">
      <PageHeader eyebrow="Smart operations" title="AI & automation" description="Use assistant insights and rule-based workflows to keep daily service moving."
        actions={<><Button variant="secondary" icon={Activity} onClick={() => setAnswer("Recent activity: birthday reward sent, low-stock alert reviewed, and Friday staffing insight requested.")}>Activity history</Button><Button icon={Plus} onClick={() => showToast("Automation builder opened")}>New automation</Button></>}
      />
      <section className="ai-command-card">
        <div className="ai-command-copy"><span className="large-ai-orb"><Sparkles size={30} /></span><div><Badge tone="light">GREEN OPERATIONS ASSISTANT</Badge><h2>Ask about today’s operations.</h2><p>The assistant uses the dashboard signals visible in this workspace.</p></div></div>
        <form onSubmit={ask}><Sparkles size={18} /><input value={aiQuery} onChange={(event) => setAiQuery(event.target.value)} placeholder="Try “How should I staff Friday evening?”" /><button type="submit"><ArrowRight size={18} /></button></form>
        <div className="ai-prompts"><button onClick={() => setAiQuery("What needs my attention today?")}>What needs attention?</button><button onClick={() => setAiQuery("Which items should I promote?")}>What should I promote?</button><button onClick={() => setAiQuery("Summarise this week’s reviews")}>Summarise reviews</button></div>
        {answer && <div className="ai-answer"><span><Bot size={20} /></span><p>{answer}</p><button onClick={() => setAnswer("")}><X size={15} /></button></div>}
        <i className="ai-decoration one">✦</i><i className="ai-decoration two">✦</i>
      </section>
      <section className="automation-stats">
        <Card><span className="metric-icon purple"><Zap size={19} /></span><div><small>Active automations</small><strong>{automations.filter((item) => item.active).length}</strong><p>Running now</p></div><Badge tone="purple">Live</Badge></Card>
        <Card><span className="metric-icon green"><Send size={19} /></span><div><small>Messages this month</small><strong>289</strong><p>Connected channel activity</p></div><Badge tone="neutral">Tracked</Badge></Card>
        <Card><span className="metric-icon orange"><PackageCheck size={19} /></span><div><small>Stock alerts</small><strong>7</strong><p>Need team attention</p></div><Badge tone="orange">Open</Badge></Card>
        <Card><span className="metric-icon blue"><Bot size={19} /></span><div><small>Assistant answers</small><strong>418</strong><p>Operations questions handled</p></div><Badge tone="blue">Available</Badge></Card>
      </section>
      <div className="automation-grid">
        <Card className="rules-card">
          <div className="rules-head"><SectionTitle title="Automation rules" subtitle="Keep repetitive workflows consistent across the team" /><Button size="small" variant="secondary" icon={Plus} onClick={() => showToast("New automation rule opened")}>Add rule</Button></div>
          <div className="automation-rule-list">{automations.map((rule, index) => { const Icon = automationIcons[rule.icon] || Zap; return <article key={rule.id}><span className={`rule-icon tone-${index}`}><Icon size={19} /></span><div><div><strong>{rule.name}</strong>{rule.active && <Badge tone="purple">On</Badge>}</div><p>{rule.detail}</p><span>{rule.channel} • {rule.runs}</span></div><Toggle checked={rule.active} onChange={() => onToggleAutomation(rule.id)} label={`Toggle ${rule.name}`} /><IconButton label={`Options for ${rule.name}`} onClick={() => showToast(`${rule.name} settings opened`)}><MoreHorizontal size={17} /></IconButton></article>; })}</div>
        </Card>
        <Card className="stock-intelligence">
          <SectionTitle title="Stock intelligence" subtitle="Current levels and service forecast" />
          <div className="stock-item critical"><span className="stock-visual">🍰</span><div><div><strong>Tiramisu portions</strong><Badge tone="rose">Critical</Badge></div><p>7 left • about 2.5 hours of stock</p><Progress value={28} tone="rose" /></div><button onClick={() => showToast("Tiramisu restock task added to the shift list")}>Restock</button></div>
          <div className="stock-item warning"><span className="stock-visual">🥛</span><div><div><strong>Oat milk</strong><Badge tone="orange">Low</Badge></div><p>9 L left • reorder before tomorrow</p><Progress value={44} tone="orange" /></div><button onClick={() => showToast("Oat milk stock details opened")}>Review</button></div>
          <div className="stock-item healthy"><span className="stock-visual">☕</span><div><div><strong>House espresso</strong><Badge tone="green">Healthy</Badge></div><p>18 kg • around 6 days of stock</p><Progress value={76} /></div><button onClick={() => showToast("House espresso forecast is healthy for six days")}>Details</button></div>
          <div className="stock-forecast"><Sparkles size={17} /><span><strong>Service forecast:</strong> prepare extra citrus and ice before Saturday’s event.</span></div>
        </Card>
        <Card className="recommendation-card">
          <div className="recommendation-art"><span className="rec-cup">☕</span><span className="rec-plus">+</span><span className="rec-cake">🍰</span><i>PAIR</i></div>
          <Badge tone="purple"><Sparkles size={11} />SUGGESTED BUNDLE</Badge><h2>A bundle guests may love.</h2><p>Pair Iced coffee + Tiramisu for afternoon visits.</p><div className="rec-metrics"><span><strong>Expected</strong>uplift</span><span><strong>Strong</strong>signal</span></div><Button variant="secondary" onClick={() => showToast("Bundle builder opened")}>Create bundle</Button>
        </Card>
        <Card className="chatbot-card">
          <div className="chatbot-head"><span className="chatbot-avatar"><Bot size={20} /><i /></span><div><strong>Green Café Assistant</strong><small>Active • Guest support</small></div><Toggle checked onChange={() => showToast("Assistant control updated") } label="Assistant control" /></div>
          <div className="chat-window"><div className="guest-message">Do you have oat milk and a quiet table?</div><div className="bot-message"><Sparkles size={14} /><span>Yes! Oat milk is available for every coffee. Tables T01 and T10 are currently quiet and free. Would you like to reserve one?</span></div><div className="chat-suggestions"><button onClick={() => showToast("Assistant reservation opened for T10")}>Reserve T10</button><button onClick={() => showToast("Assistant filtered the menu to oat drinks")}>See oat drinks</button></div></div>
          <button className="chatbot-settings" onClick={() => showToast("Assistant configuration opened")}>Train & customise assistant <ChevronRight size={15} /></button>
        </Card>
      </div>
    </div>
    </StaffLocalized>
  );
}

function formatEventDate(value) {
  const [year, month, day] = String(value || "2026-08-22").split("-").map(Number);
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const weekday = weekdays[new Date(Date.UTC(year, month - 1, day)).getUTCDay()] || "SAT";
  return `${weekday} • ${months[month - 1] || "AUG"} ${day || 22}`;
}

function eventDateInput(value) {
  const day = Number(String(value || "").split(" ").at(-1)) || 22;
  return `2026-08-${String(day).padStart(2, "0")}`;
}

export function ExperiencesView({ onQuick }) {
  const { locale } = useStaffLanguage();
  const isFr = locale === "fr";
  const [tab, setTab] = useState("Events");
  const [experienceEvents, setExperienceEvents] = useState(events);
  const [games, setGames] = usePersistentState("green-os-games-v1", gamesSeed);
  const [panel, setPanel] = useState(null);
  const [kidsCount, setKidsCount] = useState(12);
  const availableGames = games.filter((game) => game.status === "available").length;

  function createEvent(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title") || "").trim();
    if (!title) return;
    setExperienceEvents((current) => [...current, { title, date: formatEventDate(data.get("date")), time: String(data.get("time") || "18:00"), bookings: 0, capacity: Number(data.get("capacity")) || 30, type: String(data.get("type") || "Community event"), tone: "green", guestInfo: "Arrive 20 minutes early. Tables are held for 15 minutes after the event starts." }]);
    setPanel(null);
    setTab("Events");
  }

  function saveEvent(original, event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setExperienceEvents((current) => current.map((item) => item.title === original.title ? {
      ...item,
      title: String(data.get("title") || item.title).trim() || item.title,
      date: formatEventDate(data.get("date")),
      time: String(data.get("time") || item.time),
      capacity: Math.max(2, Number(data.get("capacity")) || item.capacity),
      guestInfo: String(data.get("guestInfo") || ""),
    } : item));
    setPanel(null);
    setTab("Events");
  }

  function toggleGame(id) {
    setGames((current) => current.map((game) => game.id === id ? { ...game, status: game.status === "available" ? "checked-out" : "available" } : game));
  }

  return (
    <StaffLocalized dictionary={toolsDictionary} patterns={toolsPatterns}>
    <div className="view experiences-view">
      <PageHeader eyebrow={isFr ? "Expériences" : "Experiences"} title={isFr ? "Jeux, enfants et événements" : "Games, kids & events"} description={isFr ? "Gérez les événements, la disponibilité des jeux et les activités familiales au même endroit." : "Manage events, game availability, and family activities in one place."}
        actions={<><Button variant="secondary" icon={Eye} onClick={() => setPanel({ kind: "public" })}>{isFr ? "Ouvrir la page client" : "Open guest page"}</Button><Button icon={Plus} onClick={() => setPanel({ kind: "create" })}>{isFr ? "Créer un événement" : "Create event"}</Button></>}
      />
      <section className="experience-hero">
        <div className="experience-hero-copy"><Badge tone="light">{isFr ? "L’ESPRIT GREEN" : "WHAT MAKES GREEN, GREEN"}</Badge><h2>{isFr ? "Bon café." : "Good coffee."}<br />{isFr ? "Mille raisons de rester." : "Great reasons to stay."}</h2><p>{isFr ? "Soirées football, jeux de société et parc enfants sécurisé, réunis dans un calendrier convivial." : "Football nights, board games, and a safe kids park—organized in one joyful calendar."}</p><div><Button variant="light" icon={CalendarDays} onClick={() => setTab("Calendar")}>{isFr ? "Gérer le calendrier" : "Manage calendar"}</Button><button onClick={() => setPanel({ kind: "public" })}>{isFr ? "Ouvrir l’expérience client" : "Open guest experience"} <ArrowUpRight size={15} /></button></div></div>
        <div className="experience-collage"><button className="collage-card football" onClick={() => setPanel({ kind: "event", item: experienceEvents[0] })}><span>⚽</span><b>BIG MATCH<br />ENERGY</b><small>Next • Sat 20:00</small></button><button className="collage-card games" onClick={() => setPanel({ kind: "games" })}><Dice5 size={34} /><b>GAME LIBRARY</b></button><button className="collage-card kids" onClick={() => setPanel({ kind: "kids" })}><span>★</span><b>KIDS<br />PARK</b><small>Safe • supervised</small></button></div>
      </section>
      <section className="experience-metrics">
        <Card><span className="metric-icon orange"><TicketCheck size={19} /></span><div><small>Event bookings</small><strong>186</strong><p>This month</p></div><Badge tone="orange">Live</Badge></Card>
        <Card><span className="metric-icon blue"><UsersRound size={19} /></span><div><small>Event guests</small><strong>342</strong><p>Registered audience</p></div><Badge tone="blue">Tracked</Badge></Card>
        <Card><span className="metric-icon purple"><Gamepad2 size={19} /></span><div><small>Games available now</small><strong>{availableGames}</strong><p>Live game library</p></div><Badge tone="purple">Live</Badge></Card>
        <Card><span className="metric-icon green"><CircleHelp size={19} /></span><div><small>Kids currently inside</small><strong>{kidsCount}</strong><p>Capacity 18</p></div><Badge tone="green">Open</Badge></Card>
      </section>
      <div className="experiences-grid">
        <Card className="events-card">
          <div className="events-head"><SectionTitle title={isFr ? "Expériences à venir" : "Upcoming experiences"} subtitle={isFr ? "Réservations, capacité et statut de communication" : "Bookings, capacity and promotion status"} /><Segmented value={tab} onChange={setTab} label={isFr ? "Type d’expérience" : "Experience type"} options={[{ value: "Events", label: isFr ? "Événements" : "Events" }, { value: "Calendar", label: isFr ? "Calendrier" : "Calendar" }]} /></div>
          {tab === "Events" ? <div className="event-list">{experienceEvents.map((event, index) => <article key={event.title}><div className={`event-list-date ${event.tone}`}><span>{event.date.split(" • ")[0]}</span><strong>{event.date.split(" ").at(-1)}</strong><small>{event.time}</small></div><div className="event-list-main"><div><Badge tone={index === 0 ? "green" : index === 1 ? "orange" : "purple"}>{event.type}</Badge>{index === 0 && <Badge tone="blue">Promotion ready</Badge>}</div><h3>{event.title}</h3><span><UsersRound size={14} />{event.bookings}/{event.capacity} bookings</span><Progress value={(event.bookings / event.capacity) * 100} tone={index === 0 ? "green" : index === 1 ? "orange" : "purple"} /></div><div className="event-list-actions"><strong>{Math.round((event.bookings / event.capacity) * 100)}%</strong><button aria-label={`${isFr ? "Plus d’options pour" : "More options for"} ${event.title}`} onClick={() => setPanel({ kind: "event", item: event })}><MoreHorizontal size={18} /></button><button onClick={() => setPanel({ kind: "event", item: event })}>{isFr ? "Gérer" : "Manage"} <ChevronRight size={15} /></button></div></article>)}</div> : <div className="experience-calendar-preview">{[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((day) => { const event = experienceEvents.find((item) => Number(item.date.split(" ").at(-1)) === day); return <button key={day} className={event ? "has-event" : ""} onClick={() => event ? setPanel({ kind: "event", item: event }) : setPanel({ kind: "create", day })}><span>{isFr ? "AOÛT" : "AUG"}</span><strong>{day}</strong>{event ? <small>{event.title}</small> : <small>{isFr ? "Ajouter un événement" : "Add event"}</small>}</button>; })}</div>}
        </Card>
        <Card className="match-alert-card">
          <div className="match-alert-top"><span><BellRing size={20} /></span><Badge tone="light">MATCH NOTIFICATIONS</Badge></div><h2>Fill the room<br />before the whistle.</h2><p>Notify opted-in football fans when a major match is scheduled.</p><div className="match-alert-flow"><div><span className="flow-icon">⚽</span><span><strong>Big match detected</strong><small>Champions League final</small></span></div><i /><div><span className="flow-icon"><UsersRound size={16} /></span><span><strong>Audience selected</strong><small>Based on visits & opt-ins</small></span></div><i /><div><span className="flow-icon"><Send size={16} /></span><span><strong>Send at 18:00</strong><small>WhatsApp + push</small></span></div></div><button onClick={() => onQuick("campaign")}>{isFr ? "Ouvrir la campagne" : "Open campaign"} <ArrowRight size={15} /></button>
        </Card>
        <Card className="games-library">
          <SectionTitle title="Games library" subtitle="Click a game to check it out or return it" action={`Manage all ${games.length}`} onAction={() => setPanel({ kind: "games" })} />
          <div className="game-covers">{games.slice(0, 4).map((game) => <button key={game.id} className={`game-cover-button ${game.className}`} onClick={() => setPanel({ kind: "game", item: game })}><b>{locale === "fr" ? game.nameFr || game.name : game.name}</b><span>{game.symbol}</span><small>{game.players} players</small><i>{game.status === "available" ? "Available" : "Checked out"}</i></button>)}</div>
          <div className="game-footer"><span><Badge tone="green" dot>{availableGames} available</Badge><Badge tone="orange">{games.length - availableGames} checked out</Badge></span><button onClick={() => setPanel({ kind: "qr" })}><QrCode size={15} />Open game menu QR</button></div>
        </Card>
        <Card className="kids-park-card">
          <div className="kids-art"><span className="kids-star a">★</span><span className="kids-star b">●</span><span className="kids-rainbow">◠</span><strong>{isFr ? "C’EST" : "PLAY"}<br />{isFr ? "PARTI !" : "TIME!"}</strong></div>
          <div className="kids-copy"><Badge tone="purple">KIDS PARK • 5 DT</Badge><h2>Fun for them.<br />A real pause for parents.</h2><p>Access is 5 DT per child. Capacity, safety rules, guardian contact, and check-in stay clear for every family.</p><div><span><CheckCircle2 size={15} />{kidsCount} children inside</span><span><Clock3 size={15} />Closes at 21:00</span></div><button onClick={() => setPanel({ kind: "kids" })}>{isFr ? "Gérer le parc enfants" : "Manage kids park"} <ArrowUpRight size={15} /></button></div>
        </Card>
      </div>
      {panel && <ExperiencePanel panel={panel} games={games} kidsCount={kidsCount} onClose={() => setPanel(null)} onCreate={createEvent} onSaveEvent={saveEvent} onToggleGame={toggleGame} onKidsCount={setKidsCount} />}
    </div>
    </StaffLocalized>
  );
}

function ExperiencePanel({ panel, games, kidsCount, onClose, onCreate, onSaveEvent, onToggleGame, onKidsCount }) {
  const { locale } = useStaffLanguage();
  const isFr = locale === "fr";
  const title = panel.kind === "public" ? (isFr ? "Expérience client" : "Guest experience") : panel.kind === "create" ? (isFr ? "Créer un événement" : "Create an event") : panel.kind === "event" ? panel.item.title : panel.kind === "games" ? (isFr ? "Bibliothèque de jeux" : "Games library") : panel.kind === "game" ? (isFr ? panel.item.nameFr || panel.item.name : panel.item.name) : panel.kind === "qr" ? (isFr ? "QR du menu des jeux" : "Game menu QR") : (isFr ? "Entrée au parc enfants" : "Kids park check-in");
  const currentGame = panel.kind === "game" ? games.find((game) => game.id === panel.item.id) : null;
  return (
    <StaffLocalized dictionary={toolsDictionary} patterns={toolsPatterns}>
    <><aside className="detail-panel open admin-detail-panel experience-panel"><header><div><Badge tone="purple">{isFr ? "Espace expériences" : "Experience workspace"}</Badge><h2>{title}</h2></div><IconButton label={`${isFr ? "Fermer" : "Close"} ${title}`} onClick={onClose}><X size={19} /></IconButton></header><div className="detail-body">
      {panel.kind === "public" && <div className="experience-public-preview"><Badge tone="green">TODAY AT GREEN</Badge><h3>Stay for more than coffee.</h3><p>Browse games before arriving, see what is available now, and reserve a place at the next community event.</p><div><article><span>⚽</span><strong>Match nights</strong><small>Bookings and table capacity</small></article><article><Dice5 size={24} /><strong>Games menu</strong><small>Availability and player count</small></article><article><span>★</span><strong>Kids park</strong><small>Rules, hours and workshops</small></article></div></div>}
      {panel.kind === "create" && <form id="create-event-demo" className="admin-form-stack" onSubmit={onCreate}><label><span>Event title</span><input name="title" required autoFocus placeholder="Community quiz night" /></label><label><span>Experience type</span><select name="type"><option>Community event</option><option>Football night</option><option>Board games</option><option>Kids park</option></select></label><div className="form-grid"><label><span>Date</span><input name="date" type="date" defaultValue={`2026-08-${String(panel.day || 22).padStart(2, "0")}`} /></label><label><span>Time</span><input name="time" type="time" defaultValue="18:00" /></label><label><span>Capacity</span><input name="capacity" type="number" min="2" defaultValue="30" /></label></div></form>}
      {panel.kind === "event" && <form id="edit-event-demo" className="admin-form-stack" onSubmit={(event) => onSaveEvent(panel.item, event)}><div className="admin-summary-card"><CalendarDays size={20} /><span><strong>{panel.item.date} • {panel.item.time}</strong><small>{panel.item.bookings} of {panel.item.capacity} places booked</small></span><Badge tone="green">{panel.item.type}</Badge></div><label><span>Event name</span><input name="title" defaultValue={panel.item.title} /></label><div className="form-grid"><label><span>Date</span><input name="date" type="date" defaultValue={eventDateInput(panel.item.date)} /></label><label><span>Start time</span><input name="time" type="time" defaultValue={panel.item.time} /></label><label><span>Capacity</span><input name="capacity" type="number" min="2" defaultValue={panel.item.capacity} /></label></div><label><span>Guest information</span><textarea name="guestInfo" rows="4" defaultValue={panel.item.guestInfo || (locale === "fr" ? "Arrivez 20 minutes à l’avance. Les tables sont conservées 15 minutes après le début de l’événement." : "Arrive 20 minutes early. Tables are held for 15 minutes after the event starts.")} /></label></form>}
      {panel.kind === "games" && <div className="admin-game-list">{games.map((game) => <article key={game.id}><span className={game.className}>{game.symbol}</span><div><strong>{locale === "fr" ? game.nameFr || game.name : game.name}</strong><small>{game.players} players</small></div><Badge tone={game.status === "available" ? "green" : "orange"}>{game.status === "available" ? "Available" : "Checked out"}</Badge><Button size="small" variant="secondary" onClick={() => onToggleGame(game.id)}>{game.status === "available" ? "Check out" : "Return"}</Button></article>)}</div>}
      {panel.kind === "game" && currentGame && <div className="game-detail-preview"><span className={currentGame.className}>{currentGame.symbol}</span><Badge tone={currentGame.status === "available" ? "green" : "orange"}>{currentGame.status === "available" ? "AVAILABLE NOW" : "CHECKED OUT"}</Badge><h3>{locale === "fr" ? currentGame.nameFr || currentGame.name : currentGame.name}</h3><p>{currentGame.players} players • Ask the barista for the game pieces. Please return every component to the box.</p><ul><li><Check size={14} />ID or table number recorded at checkout</li><li><Check size={14} />Missing-piece check on return</li><li><Check size={14} />Guest sees availability on the public menu</li></ul></div>}
      {panel.kind === "qr" && <div className="admin-qr-preview"><QrPattern size={132} /><h3>Browse games on your phone</h3><p>Scan this code to open the game library with availability and rules.</p><code>/games</code></div>}
      {panel.kind === "kids" && <div className="kids-checkin-preview"><div><button onClick={() => onKidsCount(Math.max(0, kidsCount - 1))} aria-label="Check one child out">−</button><span><strong>{kidsCount}</strong><small>children inside</small></span><button onClick={() => onKidsCount(Math.min(18, kidsCount + 1))} aria-label="Check one child in">+</button></div><Progress value={(kidsCount / 18) * 100} tone={kidsCount >= 16 ? "orange" : "green"} /><p>Access: 5 DT per child • {kidsCount}/18.</p><div className="admin-summary-card"><ShieldCheck size={20} /><span><strong>Safety checklist</strong><small>Guardian confirmed • wristband assigned • allergies reviewed</small></span><Badge tone="green">Ready</Badge></div></div>}
    </div><footer><Button variant="secondary" onClick={onClose}>{isFr ? "Fermer" : "Close"}</Button>{panel.kind === "create" && <Button icon={Plus} type="submit" form="create-event-demo">{isFr ? "Ajouter l’événement" : "Add event"}</Button>}{panel.kind === "event" && <Button icon={Check} type="submit" form="edit-event-demo">{isFr ? "Enregistrer l’événement" : "Save event"}</Button>}{panel.kind === "game" && currentGame && <Button icon={currentGame.status === "available" ? TicketCheck : RefreshCw} onClick={() => onToggleGame(currentGame.id)}>{currentGame.status === "available" ? (isFr ? "Emprunter le jeu" : "Check out game") : (isFr ? "Rendre le jeu" : "Return game")}</Button>}</footer></aside><button className="drawer-scrim" onClick={onClose} aria-label={`${isFr ? "Fermer" : "Close"} ${title}`} /></>
    </StaffLocalized>
  );
}

const settingTabs = ["Website", "Team & security", "Payments", "All modules"];

export function SettingsView({ theme, onToggleTheme, onPreview, showToast }) {
  const { locale } = useStaffLanguage();
  const isFr = locale === "fr";
  const [tab, setTab] = useState("Website");
  return (
    <StaffLocalized dictionary={toolsDictionary} patterns={toolsPatterns}>
    <div className="view settings-view">
      <PageHeader eyebrow={isFr ? "Configuration de la plateforme" : "Platform configuration"} title={isFr ? "Configuration" : "Platform setup"} description={isFr ? "Gérez le site, les accès de l’équipe, les paiements et les modules activés." : "Manage the website, team access, payments, and enabled modules."}
        actions={<Button icon={Check} onClick={() => showToast(isFr ? "Configuration enregistrée" : "Configuration saved")}>{isFr ? "Enregistrer la configuration" : "Save configuration"}</Button>}
      />
      <div className="settings-tabs">{settingTabs.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}</div>
      {tab === "Website" && <WebsiteSettings theme={theme} onToggleTheme={onToggleTheme} onPreview={onPreview} showToast={showToast} />}
      {tab === "Team & security" && <TeamSettings showToast={showToast} />}
      {tab === "Payments" && <PaymentSettings showToast={showToast} />}
      {tab === "All modules" && <ModuleSettings showToast={showToast} />}
    </div>
    </StaffLocalized>
  );
}

function WebsiteSettings({ theme, onToggleTheme, onPreview, showToast }) {
  const { locale } = useStaffLanguage();
  const [hours, setHours] = useState(true);
  const [gallery, setGallery] = useState(true);
  const [accessible, setAccessible] = useState(true);
  return (
    <StaffLocalized dictionary={toolsDictionary} patterns={toolsPatterns}>
    <div className="settings-layout">
      <div className="settings-main-stack">
        <Card><SectionTitle title="Brand & public website" subtitle="The story and details guests see before they visit" />
          <div className="brand-editor"><div className="tenant-logo"><img src="/logo.jpg" alt={locale === "fr" ? "Logo Green Coffee Games" : "Green Coffee Games logo"} /></div><div><Button size="small" variant="secondary" icon={Upload} onClick={() => showToast("Logo library opened")}>Replace logo</Button><p>Current café logo</p></div></div>
          <div className="form-grid settings-form"><label><span>Café name</span><input defaultValue="Green Coffee Games" /></label><label><span>Tagline</span><input key={`tagline-${locale}`} defaultValue={locale === "fr" ? "Bon café. Mille raisons de rester." : "Good coffee. Great reasons to stay."} /></label><label className="span-2"><span>Brand story</span><textarea key={`story-${locale}`} rows="4" defaultValue={locale === "fr" ? "Un café chaleureux à Mégrine, pensé pour le café de spécialité, les jeux entre amis, les grands matchs et les moments en famille." : "A warm neighborhood café in Mégrine, made for specialty coffee, friendly competition, big matches, and easy family time."} /></label></div>
        </Card>
        <Card><SectionTitle title="Guest information" subtitle="Keep useful visit details accurate everywhere" /><div className="contact-settings"><label><MapPin size={17} /><span><small>Address</small><input key={`address-${locale}`} defaultValue={locale === "fr" ? "Mégrine, Ben Arous, Tunisie" : "Mégrine, Ben Arous, Tunisia"} /></span></label><label><Phone size={17} /><span><small>Phone</small><input defaultValue="+216 55 321 315" /></span></label><label><Mail size={17} /><span><small>Email</small><input defaultValue="hello@greencoffee.tn" /></span></label></div><div className="social-row"><span><Instagram size={17} />Instagram</span><input defaultValue="@greencoffeegames" /><span><Facebook size={17} />Facebook</span><input defaultValue="Green Coffee Games" /></div><Button size="small" variant="secondary" icon={MapPin} onClick={() => window.open(MAP_URL, "_blank", "noopener,noreferrer")}>Open in Google Maps</Button></Card>
        <Card><SectionTitle title="Website sections" subtitle="Choose what appears on the customer website" /><div className="setting-toggle-list"><div><span className="setting-list-icon"><Clock3 size={18} /></span><span><strong>Opening hours & closures</strong><small>Weekly schedule with special closure notices</small></span><Toggle checked={hours} onChange={setHours} label="Toggle opening hours" /></div><div><span className="setting-list-icon"><Image size={18} /></span><span><strong>Photo gallery</strong><small>Café, products, games and atmosphere</small></span><Toggle checked={gallery} onChange={setGallery} label="Toggle gallery" /></div><div><span className="setting-list-icon"><MonitorSmartphone size={18} /></span><span><strong>Accessibility mode</strong><small>Keyboard navigation, contrast and semantic content</small></span><Toggle checked={accessible} onChange={setAccessible} label="Toggle accessibility" /></div></div></Card>
      </div>
      <div className="settings-side-stack">
        <Card className="website-preview-card"><div className="browser-bar"><i /><i /><i /><span>greencoffeegames.tn</span></div><div className="site-preview"><nav><span><Coffee size={17} />GREEN</span><i>Menu &nbsp; Events &nbsp; Visit</i></nav><Badge tone="light">PUBLIC WEBSITE</Badge><h2>Take a little<br /><em>pause.</em></h2><p>Specialty coffee. Games. Good people.</p><button onClick={onPreview}>Explore our menu</button><div className="preview-cup"><span>☕</span><i /></div></div><Button variant="secondary" icon={ExternalLink} onClick={onPreview}>Open customer website</Button></Card>
        <Card><SectionTitle title="Appearance" subtitle="Dashboard and customer theme" /><div className="theme-options"><button className={theme !== "dark" ? "active" : ""} onClick={() => theme === "dark" && onToggleTheme()}><span className="theme-swatch light"><i /><i /><i /></span><CheckCircle2 size={16} />Warm light</button><button className={theme === "dark" ? "active" : ""} onClick={() => theme !== "dark" && onToggleTheme()}><span className="theme-swatch dark"><i /><i /><i /></span><CheckCircle2 size={16} />Evening dark</button></div><div className="language-setting"><Languages size={18} /><span><strong>Platform languages</strong><small>English and French are available for every staff role and guest.</small></span><button onClick={() => showToast("Language controls are available in the top bar")}>Open language controls</button></div></Card>
        <Card className="domain-card"><span className="metric-icon green"><Globe2 size={19} /></span><div><Badge tone="neutral">DOMAIN</Badge><strong>Custom domain</strong><small>Connect your domain and SSL before publishing.</small></div><button onClick={() => showToast("Domain settings opened")}>Domain settings</button></Card>
      </div>
    </div>
    </StaffLocalized>
  );
}

function TeamSettings({ showToast }) {
  return (
    <StaffLocalized dictionary={toolsDictionary} patterns={toolsPatterns}>
    <div className="settings-layout">
      <div className="settings-main-stack">
        <Card><div className="rules-head"><SectionTitle title="Team & permissions" subtitle="Roles and access for each staff workspace" /><Button size="small" icon={Plus} onClick={() => showToast("Team invitation opened")}>Invite team member</Button></div><div className="team-table"><div className="team-table-head"><span>Team member</span><span>Role</span><span>Shift</span><span>Status</span><span /></div>{staff.map((person, index) => <div className="team-row" key={person.name}><span><Avatar initials={person.initials} tone={index} online={index < 3} /><span><strong>{person.name}</strong><small>{index === 0 ? "sofiene@greencoffee.tn" : `${person.name.toLowerCase()}@greencoffee.tn`}</small></span></span><Badge tone={person.role === "Owner" ? "dark" : person.role === "Manager" ? "purple" : "neutral"}>{person.role}</Badge><span>{person.shift}</span><Badge tone={person.status === "Break" ? "orange" : "purple"}>{person.status}</Badge><IconButton label={`Options for ${person.name}`} onClick={() => showToast(`${person.name}'s team profile opened`)}><MoreHorizontal size={17} /></IconButton></div>)}</div></Card>
        <Card><SectionTitle title="Role access" subtitle="Three clear staff workspaces" /><div className="role-grid"><article><span><ShieldCheck size={19} /></span><h3>Owner</h3><p>Full platform, billing, exports and security.</p><Badge tone="dark">1 member</Badge></article><article><span><UserRoundCog size={19} /></span><h3>Manager</h3><p>Operations, reports, tables, reservations and team shifts.</p><Badge tone="purple">1 member</Badge></article><article><span><Coffee size={19} /></span><h3>Barista</h3><p>Order preparation and menu availability.</p><Badge tone="neutral">Bar station</Badge></article></div></Card>
      </div>
      <div className="settings-side-stack">
        <Card className="staff-qr-card"><div className="staff-qr-art"><QrCode size={64} /><span><LockKeyhole size={15} />Staff QR</span></div><div><Badge tone="blue">STAFF QR ACCESS</Badge><h3>Start a shift in one scan.</h3><p>Connect rotating QR access to staff identity, expiry, and audit controls.</p><button onClick={() => showToast("Staff QR settings opened")}>Configure QR access <RefreshCw size={14} /></button></div></Card>
        <Card><SectionTitle title="Security controls" subtitle="Protect owner and manager access" /><div className="security-list"><div><span><KeyRound size={17} /></span><span><strong>Two-step verification</strong><small>Required for owner and manager</small></span><Badge tone="neutral">Required</Badge></div><div><span><Activity size={17} /></span><span><strong>Activity log</strong><small>Track important team and configuration changes</small></span><ChevronRight size={15} /></div><div><span><DatabaseBackup size={17} /></span><span><strong>Automatic backup</strong><small>Encrypted cloud storage</small></span><Badge tone="neutral">Configured</Badge></div></div></Card>
        <Card className="audit-card"><SectionTitle title="Recent activity" subtitle="Latest important staff actions" /><ol><li><Avatar initials="MK" size="xs" tone={1} /><span><strong>Price updated</strong><small>Espresso • menu</small></span></li><li><Avatar initials="AY" size="xs" tone={2} /><span><strong>Order GC-1045 completed</strong><small>Table 05 • service</small></span></li><li><Avatar initials="SZ" size="xs" tone={0} /><span><strong>Campaign scheduled</strong><small>Derby night • marketing</small></span></li></ol><button onClick={() => showToast("Activity log opened")}>Open activity log <ChevronRight size={14} /></button></Card>
      </div>
    </div>
    </StaffLocalized>
  );
}

const paymentProviders = [
  { name: "Konnect", copy: "Cards & local payments", status: "Integration required", tone: "blue", mark: "K" },
  { name: "Flouci", copy: "Wallet & QR payments", status: "Integration required", tone: "green", mark: "F" },
  { name: "Paymee", copy: "Online card checkout", status: "Optional integration", tone: "purple", mark: "P" },
];

function PaymentSettings({ showToast }) {
  return (
    <StaffLocalized dictionary={toolsDictionary} patterns={toolsPatterns}>
    <div className="settings-layout payments-settings">
      <div className="settings-main-stack">
        <Card><SectionTitle title="Payment providers" subtitle="Connect secure checkout credentials" /><div className="provider-list">{paymentProviders.map((provider) => <article key={provider.name}><span className={`provider-mark ${provider.tone}`}>{provider.mark}</span><span><strong>{provider.name}</strong><small>{provider.copy}</small></span><Badge tone="neutral">{provider.status}</Badge><Button size="small" variant="secondary" onClick={() => showToast(`${provider.name} connection settings opened`)}>Connect</Button></article>)}</div></Card>
        <Card><SectionTitle title="Checkout options" subtitle="Available after a payment provider is connected" /><div className="setting-toggle-list"><div><span className="setting-list-icon"><CreditCard size={18} /></span><span><strong>Online payment</strong><small>Table QR checkout</small></span><Toggle checked={false} onChange={() => showToast("Online payment settings opened")} label="Configure online payment" /></div><div><span className="setting-list-icon"><ReceiptText size={18} /></span><span><strong>Digital receipts</strong><small>Email and PDF delivery</small></span><Toggle checked={false} onChange={() => showToast("Digital receipt settings opened")} label="Configure digital receipts" /></div><div><span className="setting-list-icon"><QrCode size={18} /></span><span><strong>Receipt loyalty sync</strong><small>Credit points from signed receipt records</small></span><Toggle checked={false} onChange={() => showToast("Receipt loyalty settings opened")} label="Configure receipt loyalty" /></div></div></Card>
        <Card><SectionTitle title="Payment status" subtitle="States used by the checkout workflow" /><div className="payment-rules"><div><Badge tone="green" dot>Paid</Badge><span>Send a receipt and credit loyalty</span></div><div><Badge tone="orange" dot>Pay at cashier</Badge><span>Remain open until staff confirms</span></div><div><Badge tone="rose" dot>Failed</Badge><span>Offer another payment option</span></div></div></Card>
      </div>
      <div className="settings-side-stack">
        <Card className="payment-summary-card"><span className="metric-icon green"><CreditCard size={21} /></span><Badge tone="neutral">PAYMENT MIX</Badge><h2>Payment activity</h2><p>Connect a provider to see live payment activity.</p><div><span><strong>—</strong>online</span><span><strong>—</strong>cashier</span></div><Progress value={0} /></Card>
        <Card><SectionTitle title="Settlements" subtitle="Available after a payment provider is connected" /><div className="settlement-list"><div><span><strong>No settlement data yet</strong><small>Connect a provider to reconcile payouts here.</small></span><strong>—</strong></div></div><button onClick={() => showToast("Payment provider settings opened")}>View provider settings <ChevronRight size={14} /></button></Card>
      </div>
    </div>
    </StaffLocalized>
  );
}

function ModuleSettings({ showToast }) {
  return (
    <StaffLocalized dictionary={toolsDictionary} patterns={toolsPatterns}>
    <div className="modules-settings">
      <section className="module-intro"><div><Badge tone="light">COMPLETE PLATFORM</Badge><h2>A complete coffee-shop operating system.</h2><p>Green Coffee brings customer experience, daily service, growth, intelligence, and control into one coherent workspace.</p></div><span><strong>OS</strong><small>ready</small></span></section>
      <div className="module-group-grid">{moduleGroups.map((group, index) => <Card key={group.title}><span className={`module-number tone-${index}`}>0{index + 1}</span><h3>{group.title}</h3><ul>{group.features.map((feature) => <CheckLine key={feature}>{feature === "Optional AI-assisted concepts" ? "Optional AI-assisted workflows" : feature}</CheckLine>)}</ul><footer><Badge tone="purple">Included</Badge><button onClick={() => showToast(`${group.title} opened`)}>Explore <ChevronRight size={14} /></button></footer></Card>)}</div>
      <div className="service-grid">
        <Card><span className="service-icon"><Rocket size={21} /></span><div><Badge tone="orange">READY FOR DEPLOYMENT</Badge><h3>Deployment & launch</h3><p>Connect backend services, domain, SSL, monitoring, and handover for launch.</p></div><button onClick={() => showToast("Launch checklist opened")}>View launch checklist <ArrowUpRight size={14} /></button></Card>
        <Card><span className="service-icon"><LifeBuoy size={21} /></span><div><Badge tone="blue">SERVICE OPTION</Badge><h3>Maintenance & support</h3><p>Updates, backups, bug fixes, monitoring, and direct help can be covered by a care plan.</p></div><button onClick={() => showToast("Support plan opened")}>Review support plan <ArrowUpRight size={14} /></button></Card>
        <Card><span className="service-icon"><CloudDownload size={21} /></span><div><Badge tone="purple">BACKUP & EXPORT</Badge><h3>Backup & export</h3><p>Portable exports use persistent storage, access controls, and a tested backup policy.</p></div><button onClick={() => showToast("Backup and export settings opened")}>View export settings <Download size={14} /></button></Card>
      </div>
    </div>
    </StaffLocalized>
  );
}
