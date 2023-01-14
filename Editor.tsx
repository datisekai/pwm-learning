import SunEditor from 'suneditor-react'
import plugins from 'suneditor/src/plugins'
import { en } from 'suneditor/src/lang'

import 'suneditor/dist/css/suneditor.min.css'
import 'katex/dist/katex.min.css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/lib/codemirror.css'


const Editor = ({ name:any, onChange:any, props:any }) => {
  const options = {
    plugins: plugins,
    height: 250,
    lang: en,
    buttonList: [
      [
        'font',
        'fontSize',
        'formatBlock',
        'bold',
        'underline',
        'italic',
        'paragraphStyle',
        'blockquote',
        'strike',
        'subscript',
        'superscript',
        'fontColor',
        'hiliteColor',
        'textStyle',
        'removeFormat',
        'undo',
        'redo',
        'outdent',
        'indent',
        'align',
        'horizontalRule',
        'list',
        'lineHeight',
        'table',
        'link',
        'image',
        // 'video',
        // 'audio',
        // You must add the 'katex' library at options to use the 'math' plugin.
        // 'math',
        // You must add the "imageGalleryUrl".
        // 'imageGallery',
        'fullScreen',
        'showBlocks',
        'codeView',
        'preview'
        // 'print'
        // 'save',
        // 'template'
      ]
    ]
  }

  const handleImageUploadBefore = async (files:any, info:any, uploadHandler:any) => {
    // uploadHandler is a function
    // console.log(files, info)

    const KEY = 'docs_upload_example_us_preset'

    const Data = new FormData()
    Data.append('file', files[0])
    Data.append('upload_preset', KEY)

   
  const handleImageUpload = (
    targetElement:any,
    index:any,
    state:any,
    info:any,
    remainingFilesCount:any,
    core:any
  ) => {
    console.log(core)
  }

  const handleImageUploadError = (errorMessage:any, result:any) => {
    console.log(errorMessage, result)
  }

  return (
    <SunEditor
      {...props}
      placeholder="Please type here..."
      name={name}
      lang="en"
      setDefaultStyle="font-family: Arial; font-size: 14px;"
      setOptions={options}
      // onImageUpload={onImageUpload}
      onImageUploadBefore={handleImageUploadBefore}
      onImageUpload={handleImageUpload}
      onImageUploadError={handleImageUploadError}
      onChange={onChange}
    />
  )
}

export default Editor
