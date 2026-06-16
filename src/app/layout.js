export const metadata = {
  title: 'Minimal Shop',
  description: 'My clean next.js shop',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
