export default {
  route: {
    dashboard: 'Dashboard',
    documentation: 'Documentazione',
    guide: 'Guida',
    permission: 'Permessi',
    pagePermission: 'Pagina permessi',
    rolePermission: 'Permessi ruolo',
    directivePermission: 'Direttive Permessi',
    icons: 'Icone',
    components: 'Componenti',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'Editor JSON',
    splitPane: 'SplitPane',
    avatarUpload: 'Carica Avatar',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Conta Fino',
    componentMixin: 'Mixin',
    backToTop: 'Torna su',
    draggableDialog: 'Dialogo Trascinabile',
    draggableKanban: 'Kanban Trascinabile',
    draggableList: 'Lista Trascinabile',
    draggableSelect: 'Select Trascinabile',
    charts: 'Grafici',
    barChart: 'Grafico a Barre',
    lineChart: 'Grafico a Linee',
    mixedChart: 'Grafico Misto',
    example: 'Esempio',
    nested: 'Menu Nidificato',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    table: 'Tabella',
    dynamicTable: 'Tabella Dinamica',
    draggableTable: 'Tabella Trascinabile',
    inlineEditTable: 'Tabella Modifica in Linea',
    complexTable: 'Tabella Complessa',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Crea Articolo',
    editArticle: 'Modifica Articolo',
    articleList: 'Lista Articoli',
    errorPages: 'Pagine di Errore',
    page401: '401',
    page404: '404',
    errorLog: 'Registro Errori',
    excel: 'Excel',
    exportExcel: 'Esporta Excel',
    selectExcel: 'Esporta Selezionato',
    mergeHeader: 'Unisci Intestazione',
    uploadExcel: 'Carica Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Esporta Zip',
    theme: 'Tema',
    clipboard: 'Appunti',
    i18n: 'I18n',
    externalLink: 'Link Esterno',
    profile: 'Profilo'
  },
  navbar: {
    logOut: 'Esci',
    dashboard: 'Dashboard',
    github: 'Github',
    theme: 'Tema',
    size: 'Grandezza Globale',
    profile: 'Profilo'
  },
  login: {
    title: 'Accesso',
    logIn: 'Accedi',
    username: 'Utente',
    password: 'Password',
    any: 'qualunque',
    thirdparty: 'Connetti con',
    thirdpartyTips: 'Non può essere simulato in locale, quindi combina la tua simulazione di business, per favore!!!'
  },
  documentation: {
    documentation: 'Documentazione',
    github: 'Github Repository'
  },
  permission: {
    createRole: 'Nuovo Ruolo',
    editPermission: 'Modifica',
    roles: 'I tuoi ruoli',
    switchRoles: 'Cambia ruoli',
    tips: 'In alcuni casi usare v-permission non ha effetto. Per esempio: Element-UI  el-tab o el-table-column e altri componenti che renderizzano il dom dinamicamente. Puoi farlo solo con v-if.',
    delete: 'Elimina',
    confirm: 'Conferma',
    cancel: 'Annulla'
  },
  guide: {
    description: 'La pagina Guida è utile per alcune persone che entrano nel progetto per la prima volta. Puoi introdurre brevemente le funzionalità del progetto. Il demo è basato su ',
    button: 'Mostra guida'
  },
  components: {
    documentation: 'Documentazione',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    tinymceTips: 'Il testo ricco è una funzionalità fondamentale della gestione backend, ma allo stesso tempo è un posto molto scosceso. Nel processo di selezionare un Rich Text editor o fatto molte ricerche. I Rich Text editor comuni sul mercato sono molto usati, per questo alla fine ho scelto Tinymce. Vedi la più dettagliata comparazione e introduzione al Rich text editor.',
    backToTopTips1: 'Quando la pagina viene spostata alla posizione specificata, il bottone "Torna Su" compare nell\'angolo in basso a destra',
    backToTopTips2: 'Puoi personalizzare lo stile dei bottoni, mostra / nascondi, altezza di apparizione, altezza del ritorno a capo. Se hai bisogno di un prompt di testo, puoi utilizzare gli elementi element-ui el-tooltip esternamente',
    imageUploadTips: 'Da quando usavo la verione 1 di Vue che non è compatibile con mockjs, la ho modificata io stesst, e se la userai, è meglio utilizzare versioni ufficiali.',
    changeLanguageTips: 'Cambio lingua riuscito'
  },
  table: {
    dynamicTips1: 'Intestazione Fissa, ordinato dall\'ordine delle intestazioni',
    dynamicTips2: 'Intestazione non fissa, ordinato dall\'ordine dei click',
    dragTips1: 'Ordine di default',
    dragTips2: 'Ordine post trascinamento',
    title: 'Titolo',
    importance: 'Importanza',
    type: 'Tipo',
    remark: 'Osservazione',
    search: 'Ricerca',
    add: 'Aggiungi',
    export: 'Esporta',
    reviewer: 'Recensore',
    id: 'ID',
    date: 'Data',
    author: 'Autore',
    readings: 'Lettori',
    status: 'Status',
    actions: 'Azioni',
    edit: 'Modifica',
    publish: 'Pubblica',
    draft: 'Bozza',
    delete: 'Elimina',
    cancel: 'Annulla',
    confirm: 'Conferma'
  },
  example: {
    warning: 'Creare e modificare pagine non può essere tenuto in cache da keep-alive, perchè l\'include di keep-alive attualmente non supporta la cache basata sugli indirizzi, per questo ora viene utilizzata la cache basandosi sul nome del componente. Se vuoi utilizzare uno schema di caching basato sul browser come localStorage. O non usare l\'include di keep-alive per mettere le pagine in cache direttamente. Vedi dettagli'
  },
  errorLog: {
    tips: 'Per favore clicca l\'icona dell\'insetto nell\'angolo in alto a sinistra',
    description: 'Ora il sistema di gestione è fondamentalmente il form della spa, aumenta l\'esperienza utente, ma incrementa anche le possibilità di problemi nelle pagine, una piccola negligenza può portare al blocco della pagina. Fortunatamente Vue offre un modo di catturare le eccezioni, dove puoi manipolare gli errori o riportare un\'eccezione.',
    documentation: 'Introduzione documentazione'
  },
  excel: {
    export: 'Esporta',
    selectedExport: 'Esporta Elementi Selezionati',
    placeholder: 'Per favore inserisci il nome del file(default: excel-list)'
  },
  zip: {
    export: 'Esporta',
    placeholder: 'Per favore inserisci il nome del file(default: file)'
  },
  pdf: {
    tips: 'Qui usiamo window.print() per implementare la funzionalità del download PDF.'
  },
  theme: {
    change: 'Cambia Tema',
    documentation: 'Documentazione Tema',
    tips: 'Consiglio: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Ricarica',
    close: 'Chiudi',
    closeOthers: 'Chiudi Altri',
    closeAll: 'Chiudi Tutto'
  },
  settings: {
    title: 'Impostazione Stile Pagina',
    theme: 'Colore Tema',
    showTagsView: 'Apri Vista Tag',
    showSidebarLogo: 'Logo Barra Laterale',
    fixedHeader: 'Intestazione Fissa',
    sidebarTextTheme: 'Tema Testo Barra Laterale'
  },
  toasts: {
    switchLanguage: 'Cambio lingua effettuato'
  }
}
