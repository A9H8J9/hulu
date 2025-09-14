import "../app/globals.css"
import QueryProvider from "../components/query-provider"
import { Provider } from "../components/ui/provider"
import localFont from 'next/font/local'


const myFont = localFont({
  src: '../public/assets/Estedad-Regular.ttf',
})

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning className={myFont.className}>
      <body>
      <QueryProvider>
          <Provider>
            {children}
          </Provider>
        </QueryProvider>
      </body>
    </html>
  )
}