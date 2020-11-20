export default {
  route: {
    dashboard: '대시보드',
    documentation: '문서',
    guide: '가이드',
    permission: '권한',
    rolePermission: '역할 권한',
    pagePermission: '페이지 권한',
    directivePermission: '지시 권한',
    icons: '아이콘',
    components: '구성 요소',
    tinymce: 'TinyMCE',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    splitPane: '패널',
    avatarUpload: '아바타업로드',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: '구성 요소 Mixin',
    backToTop: 'Back To Top',
    draggableDialog: '드래그 상자',
    draggableKanban: '드래그 간판',
    draggableList: '드래그 리스트',
    draggableSelect: '드래그 선택',
    charts: '차트',
    barChart: '막대그래프',
    lineChart: '꺽은선그래프',
    mixedChart: '종합차트',
    example: '예시',
    nested: 'Nested Routes',
    menu1: '메뉴１',
    'menu1-1': '메뉴 1-1',
    'menu1-2': '메뉴 1-2',
    'menu1-2-1': '메뉴 1-2-1',
    'menu1-2-2': '메뉴 1-2-2',
    'menu1-3': '메뉴 1-3',
    menu2: '메뉴 2',
    table: '표',
    dynamicTable: 'Dynamic 표',
    draggableTable: 'Draggable 표',
    inlineEditTable: 'Inline Edit 표',
    complexTable: 'Complex 표',
    tab: 'Tab',
    form: '형태',
    createArticle: '게시물 작성',
    editArticle: '게시물 편집',
    articleList: '게시물 리스트',
    errorPages: '에러 페이지',
    page401: '401',
    page404: '404',
    errorLog: '에러 로그',
    excel: '엑셀',
    exportExcel: '엑셀 내보내기',
    selectExcel: '엑셀 선택',
    mergeHeader: '헤더 병합',
    uploadExcel: '엑셀 올리기',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: '테마',
    clipboard: 'Clipboard',
    i18n: '언어',
    externalLink: '외부 링크',
    profile: '프로필'
  },
  navbar: {
    dashboard: '대시보드',
    github: '깃허브',
    logOut: '로그아웃',
    profile: '프로필',
    theme: '테마',
    size: '크기'
  },
  login: {
    title: '타이틀',
    logIn: '로그인',
    username: '이름',
    password: '비밀번호',
    any: 'any',
    thirdparty: '외부 ID로 로그인',
    thirdpartyTips: '로컬 환경에서 로그인 할 수 없습니다.'
  },
  documentation: {
    documentation: '문서',
    github: '깃허브 링크'
  },
  permission: {
    createRole: '역할 추가',
    editPermission: '권한 수정',
    roles: '역할',
    switchRoles: '역할 바꾸기',
    tips: 'v-permission 사용할 때가 있습니다. 예 : Element-UI의 el-tab, el-table-column 및 다른 dom. v-if를 사용해야합니다.',
    delete: '삭제',
    confirm: '확인',
    cancel: '취소'
  },
  guide: {
    description: '각 기능에 대한 설명입니다.',
    button: '버튼'
  },
  components: {
    documentation: '문서',
    tinymceTips: '서식있는 텍스트는 관리 백엔드의 핵심 기능이지만 동시에 문제가 많은 곳입니다. 리치 텍스트를 선택하는 과정에서도 많은 우회가 필요했습니다. 시중에 나와있는 일반적인 서식있는 텍스트는 기본적으로 사용되었으며 마침내 Tinymce를 선택했습니다. 보다 자세한 리치 텍스트 비교 및   소개를 참조하십시오.',
    stickyTips: '페이지의 지정된 위치에 스크롤하면 나타납니다.',
    backToTopTips1: '페이지가 지정된 위치로 스크롤되면 맨 아래 오른쪽 모서리에 맨 위로 이동 단추가 나타납니다.',
    backToTopTips2: '버튼 스타일, 표시 / 숨기기, 모양 높이, 반환 높이를 사용자 정의 할 수 있습니다. 텍스트 프롬프트가 필요한 경우 element-ui el-tooltip 요소를 외부에서 사용할 수 있습니다',
    imageUploadTips: 'vue @ 1 버전 만 사용하고 있었고 현재 mockjs와 호환되지 않기 때문에 직접 수정했으며 사용하려는 경우 공식 버전을 사용하는 것이 좋습니다.',
    changeLanguageTips: '언어 전환 성공'
  },
  table: {
    dynamicTips1: '정렬된 헤더',
    dynamicTips2: '정렬되지 않은 헤더',
    dragTips1: '기본 순서',
    dragTips2: '드래그한 순서',
    title: '타이틀',
    importance: '중요성',
    type: 'Type',
    remark: 'Remark',
    search: '검색',
    add: '추가',
    export: '내보내기',
    reviewer: 'Reviewer',
    id: 'ID',
    date: '날짜',
    author: '글쓴이',
    readings: 'Readings',
    status: '상태',
    actions: 'Actions',
    edit: '수정',
    publish: '게시',
    draft: 'Draft',
    delete: '삭제',
    cancel: '취소',
    confirm: '확인'
  },
  example: {
    warning: 'keep-alive의 \'include \'는 (는) 현재 경로 기반 캐싱을 지원하지 않으므로 구성 요소 이름을 기반으로 캐시되기 때문에 keep-alive로 페이지를 만들고 편집 할 수 없습니다. 비슷한 캐싱 효과를 얻으려면 localStorage와 같은 브라우저 캐싱 구성표를 사용할 수 있습니다. 또는 keep-alive \' include \'를 사용하여 모든 페이지를 직접 캐시하지 마십시오. 자세히보다'
  },
  errorLog: {
    tips: '오른쪽 상단에있는 버그 아이콘을 클릭하십시오',
    description: '이제 관리 시스템은 기본적으로 스파의 형태이며 사용자 경험을 향상 시키지만 페이지 문제의 가능성을 증가시킵니다. 작은 태만으로 인해 전체 페이지 교착 상태가 발생할 수 있습니다. 다행히 Vue는 오류를 처리하거나 예외를보고 할 수있는 예외 처리를 포착하는 방법을 제공합니다.',
    documentation: '문서 소개'
  },
  excel: {
    export: '내보내기',
    selectedExport: '선택 항목 내보내기',
    placeholder: '파일 이름을 입력하세요.(기본 엑셀 목록)'
  },
  zip: {
    export: '내보내기',
    placeholder: '파일 이름을 입력하세요.(기본 파일)'
  },
  pdf: {
    tips: '여기서는 window.print ()를 사용하여 PDF 다운로드 기능을 구현합니다.'
  },
  theme: {
    change: '테마 바꾸기',
    documentation: '테마 문서',
    tips: 'Tips: 탐색 모음의 테마 선택과는 다른 응용 프로그램 시나리오가있는 두 가지 다른 스키닝 방법입니다. 자세한 내용은 설명서를 참조하십시오.'
  },
  tagsView: {
    refresh: '새로고침',
    close: '닫기',
    closeOthers: '기타 닫기',
    closeAll: '모두 닫기'
  },
  settings: {
    title: '페이지 스타일 설정',
    theme: '테마 색상',
    showTagsView: 'Tags-View 열기',
    showSidebarLogo: '사이드 메뉴 로고',
    fixedHeader: '헤더 고정',
    sidebarTextTheme: '사이드 메뉴 글꼴 테마'
  }
}
