import Providers from './providers';
import { Inter } from 'next/font/google';
import Link from "next/link";
import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '북마크',
  description: '북마크 프로젝트입니다.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>{metadata.title}</title>
        </head>
        <body className={inter.className}>
        <div className="title">
            <Link href="/">
              <img src="/title.png" className="title_image" alt="Title" />
            </Link>
        </div>
        <Providers>
          {children}
        </Providers>
        </body>
    </html>
  )
}
