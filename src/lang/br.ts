export default {
  route: {
    dashboard: 'Dashboard',
    documentation: 'Documentação',
    guide: 'Guia',
    permission: 'Permissão',
    pagePermission: 'Permissão de página',
    rolePermission: 'Permissão de função',
    directivePermission: 'Permissão de diretiva',
    icons: 'Ícones',
    components: 'Componentes',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'Editor JSON',
    splitPane: 'Painel dividido',
    avatarUpload: 'Upload de Avatar',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: 'Mixin',
    backToTop: 'Voltar ao topo',
    draggableDialog: 'Diálogo arrastável',
    draggableKanban: 'Kanban arrastável',
    draggableList: 'Lista arrastável',
    draggableSelect: 'Seleção arrastável',
    charts: 'Gráficos',
    barChart: 'Gráfico de barras',
    lineChart: 'Gráfico de linha',
    mixedChart: 'Gráfico Misto',
    example: 'Exemplo',
    nested: 'Rotas aninhadas',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    table: 'Tabela',
    dynamicTable: 'Tabela Dinâmica',
    draggableTable: 'Tabela arrastável',
    inlineEditTable: 'Tabela de edição inline',
    complexTable: 'Tabela complexa',
    tab: 'Aba',
    form: 'Formulário',
    createArticle: 'Criar Artigo',
    editArticle: 'Editar Artigo',
    articleList: 'Lista de Artigos',
    errorPages: 'Páginas de Erro',
    page401: '401',
    page404: '404',
    errorLog: 'Log de Erros',
    excel: 'Excel',
    exportExcel: 'Exportar Excel',
    selectExcel: 'Exportar selecionados',
    mergeHeader: 'Cabeçalho de mesclagem',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Exportar Zip',
    theme: 'Tema',
    clipboard: 'Prancheta',
    i18n: 'I18n',
    externalLink: 'Link externo',
    profile: 'Perfil'
  },
  navbar: {
    logOut: 'Sair',
    dashboard: 'Dashboard',
    github: 'Github',
    theme: 'Tema',
    size: 'Tamanho Global',
    profile: 'Perfil'
  },
  login: {
    title: 'Formulário de login',
    logIn: 'Login',
    username: 'Nome do usuário',
    password: 'Senha',
    any: 'qualquer',
    thirdparty: 'Ou conecte-se com',
    thirdpartyTips:
      'Não pode ser simulado no local, portanto, combine sua própria simulação de negócios! ! !'
  },
  documentation: {
    documentation: 'Documentação',
    github: 'Repositório Github'
  },
  permission: {
    createRole: 'Novo função',
    editPermission: 'Editar',
    roles: 'Suas funções',
    switchRoles: 'Trocar as funções',
    tips:
      'Em alguns casos, usar a v-permission não terá efeito. Por exemplo: Element-UI el-tab ou el-table-column e outras cenas que renderizam dom dinamicamente. Você só pode fazer isso com v-if.',
    delete: 'Excluir',
    confirm: 'Confirmar',
    cancel: 'Cancelar'
  },
  guide: {
    description:
      'A página do guia é útil para algumas pessoas que entraram no projeto pela primeira vez. Você pode apresentar brevemente os recursos do projeto. A demonstração é baseada em',
    button: 'Mostrar guia'
  },
  components: {
    documentation: 'Documnetação',
    tinymceTips:
      'Rich text é um recurso central do back-end de gerenciamento, mas ao mesmo tempo é um lugar com muitos poços. No processo de seleção de textos ricos, também fiz muitos desvios. Basicamente, foram usados ​​os textos ricos comuns no mercado e, finalmente, escolhi o Tinymce. Veja a comparação e introdução de rich text mais detalhadas.',
    stickyTips:
      "quando a página é rolada para a posição predefinida, ele ficará 'strick' no topo.",
    backToTopTips1:
      "Quando a página é rolada para a posição especificada, o botão 'Voltar ao topo' aparece no canto inferior direito",
    backToTopTips2:
      'Você pode personalizar o estilo do botão, mostrar / ocultar, altura da aparência, altura do retorno. Se você precisar de um prompt de texto, você pode usar elementos element-ui el-tooltip de forma externa',
    imageUploadTips:
      'Como eu estava usando apenas a versão 1 do Vue, e ela não é compatível com os mockjs no momento, eu mesmo modifiquei, e se você vai usar, é melhor usar a versão oficial.',
    changeLanguageTips: 'Sucesso na mudança de idioma'
  },
  table: {
    dynamicTips1: 'Cabeçalho fixo, classificado pela ordem do cabeçalho',
    dynamicTips2: 'Cabeçalho não fixo, classificado por ordem de clique',
    dragTips1: 'A ordem padrão',
    dragTips2: 'A ordem após arrastar',
    title: 'Título',
    importance: 'Importância',
    type: 'Tipo',
    remark: 'Observação',
    search: 'Pesquisa',
    add: 'Adicionar',
    export: 'Exportar',
    reviewer: 'Revisor',
    id: 'ID',
    date: 'Data',
    author: 'Autor',
    readings: 'Leituras',
    status: 'Status',
    actions: 'Ações',
    edit: 'Editar',
    publish: 'Publicar',
    draft: 'Rascunho',
    delete: 'Excluir',
    cancel: 'Cancelar',
    confirm: 'Confirmar'
  },
  example: {
    warning:
      "A criação e edição de páginas não podem ser armazenadas em cache pelo keep-alive porque o 'include' do keep-alive atualmente não suporta o cache baseado em rotas, então agora ele é armazenado em cache com base no nome do componente. Se você deseja obter um efeito de cache semelhante, pode usar um esquema de cache do navegador, como localStorage. Ou não use 'include' do keep-alive para armazenar em cache todas as páginas diretamente. Veja detalhes"
  },
  errorLog: {
    tips: 'Clique no ícone de bug no canto superior direito',
    description:
      'Já o sistema de gerenciamento é basicamente a forma do spa, ele melhora a experiência do usuário, mas também aumenta a possibilidade de problemas de página, uma pequena negligência pode levar a um impasse de página inteira. Felizmente, o Vue fornece uma maneira de detectar exceções de tratamento, onde você pode lidar com erros ou relatar exceções.',
    documentation: 'Introdução ao documento'
  },
  excel: {
    export: 'Exportar',
    selectedExport: 'Exportar itens selecionados',
    placeholder: 'Insira o nome do arquivo (padrão excel-list)'
  },
  zip: {
    export: 'Exportar',
    placeholder: 'Insira o nome do arquivo (padrão file)'
  },
  pdf: {
    tips:
      'Aqui, usamos window.print() para implementar o recurso de download de PDF.'
  },
  theme: {
    change: 'Mudar tema',
    documentation: 'Documentação do tema',
    tips:
      'Dicas: É diferente da escolha de tema na barra de navegação dois métodos diferentes, cada um com diferentes cenários de aplicação. Consulte a documentação para obter detalhes.'
  },
  tagsView: {
    refresh: 'Atualizar',
    close: 'Fechar',
    closeOthers: 'Fechar outros',
    closeAll: 'Feche tudo'
  },
  settings: {
    title: 'Configuração de estilo de página',
    theme: 'Cor do Tema',
    showTagsView: 'Abrir Tags-View',
    showSidebarLogo: 'Logotipo da barra lateral',
    fixedHeader: 'Cabeçalho Fixo',
    sidebarTextTheme: 'Tema de texto da barra lateral'
  }
}
