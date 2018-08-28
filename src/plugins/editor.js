// import something here
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import hljs from 'highlight.js'
import emoji from 'markdown-it-emoji'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.use(mavonEditor, hljs, emoji)
}
