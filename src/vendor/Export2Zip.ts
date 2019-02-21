/* eslint-disable */
// require('script-loader!file-saver');
// import JSZip from 'jszip'

// export function export_txt_to_zip(th: any, jsonData: any, txtName: any, zipName: any) {
//   const zip = new JSZip()
//   const txt_name = txtName || 'file'
//   const zip_name = zipName || 'file'
//   const data = jsonData
//   let txtData = `${th}\r\n`
//   data.forEach((row: any) => {
//     let tempStr = ''
//     tempStr = row.toString()
//     txtData += `${tempStr}\r\n`
//   })
//   zip.file(`${txt_name}.txt`, txtData)
//   zip.generateAsync({
//     type: "blob"
//   }).then((blob: any) => {
//     saveAs(blob, `${zip_name}.zip`)
//   }, (err: Error) => {
//     alert('导出失败')
//   })
// }
