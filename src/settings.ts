interface ISettings {
  title: string // Overrides the default title
  showSettings: boolean // Controls settings panel display
  showTagsView: boolean // Controls tagsview display
  showSidebarLogo: boolean // Controls siderbar logo display
  fixedHeader: boolean // If true, will fix the header component
  errorLog: string[] // The env to enable the errorlog component, default 'production' only
}

// You can customize below settings :)
const settings: ISettings = {
  title: 'Vue Element Admin',
  showSettings: true,
  showTagsView: true,
  fixedHeader: false,
  showSidebarLogo: false,
  errorLog: ['production']
}

export default settings
