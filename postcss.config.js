import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    tailwindcss(),   // ✅ correct plugin
    autoprefixer()
  ],
}
