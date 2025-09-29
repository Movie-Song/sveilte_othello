console.log("Svelte 앱이 시작됩니다!");
import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
})

export default app