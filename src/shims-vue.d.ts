declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*.svg' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'element-ui/lib/locale/lang/en' {
  const elementEnLocale: any
  export default elementEnLocale
}

declare module 'element-ui/lib/locale/lang/es' {
  const elementEsLocale: any
  export default elementEsLocale
}

declare module 'element-ui/lib/locale/lang/zh-CN' {
  const elementZhLocale: any
  export default elementZhLocale
}
