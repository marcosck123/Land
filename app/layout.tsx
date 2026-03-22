import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marcos Langner — Full Stack Developer",
  description: "Desenvolvedor Full Stack em formação. HTML, CSS, JavaScript, Java, Python, React, Next.js. Disponível para oportunidades.",
  openGraph: {
    title: "Marcos Langner — Full Stack Developer",
    description: "Desenvolvedor Full Stack em formação, buscando oportunidades.",
    url: "https://versao10final.vercel.app",
    siteName: "Marcos Langner",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
