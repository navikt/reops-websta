import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Websta',
    description: 'My App is a web analytics tool.',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="no">
        <body>
        <div id="root">{children}</div>
        </body>
        </html>

    )
}