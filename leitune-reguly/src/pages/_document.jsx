/* eslint-disable react/react-in-jsx-scope,max-len */
import React from "react";
import Document, {Head, Html, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';


export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="keywords" content="Advogado, Escritório virtual, Atendimento online, Consulta via telefone Whatsapp Google Meet, Assessoria jurídica e consultoria para pessoas físicas e empresas, Áreas de atuação: Direito Empresarial Cível Tributário Trabalhista Consumidor Penal Empresarial startups e inovação, Consultoria tributária para pessoas físicas e jurídicas, Planejamento tributário para a redução dos custos fiscais, Simples Nacional, Lucro presumido, Lucro real, Regularização de pendências e obtenção de certidões negativas, Representação em ações judiciais movidas pelo Fisco, Representação em cobranças judiciais e extrajudiciais, Elaboração e revisão de contratos ou estatutos sociais, Acompanhamento durante a constituição fusão cisão e extinção de empresas, Estruturação societária, Sociedade Limitada, Sociedade anônima, Mediação empresarial para a resolução do conflito de forma amigável, Due diligence, Registro e acompanhamento de marcas e patentes, Representação em inquéritos civis e ações judiciais em geral, Elaboração e revisão de contratos cíveis, Prevenção de ações judiciais, Planejamento sucessório para a preservação patrimonial, Defesa do empregador em ações judiciais, Prevenção de ações trabalhistas, Revisão e elaboração de contratos trabalhistas, Planejamento trabalhista para a redução de custos, Atuação perante órgãos de defesa do consumidor, Consultoria e análise preventiva para minimização de riscos nas relações de consumo, Elaboração e revisão de licenças de uso termos de uso políticas de cookies e políticas de privacidade, Criminal compliance para evitar a violação de normas criminais pela empresa, Representação em inquéritos policiais procedimentos administrativos e ações judiciais, Elaboração de contratos e estatutos sociais acordos de sócios memorandos de entendimento acordos de confidencialidade contratos de vesting stock option mútuo conversível contratos de participação etc, Proteção de Dados, Cap Table, Term Sheet, Investimento, E-commerce, Fintechs, Insurtechs, Martketplace" />
          <link rel="icon" href="/favicon.png" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
          <title>Leitune & Reguly Advogados | Escritório virtual</title>
          <meta name="description" content="Somos um escritório de advocacia com atendimento a pessoas físicas e jurídicas na parte de consultoria e contencioso. Atuamos nas áreas de direito empresarial, civil, tributário, trabalhista, do consumidor e penal empresarial. Com atendimento 100% online, nosso escritório trabalha para melhorar a sua experiência com o direito, combinando tecnologia e técnicas de design para transmitir a informação jurídica de forma mais clara e alcançar resultados mais rápidos e eficientes." />
          <meta name="robots" content="index, follow" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:url" content="https://leitunereguly.com" />
          <meta property="og:title" content="Leitune & Reguly Advogados | Escritório virtual" />
          <meta property="og:site_name" content="Leitune & Reguly Advogados" />
          <meta property="og:description" content="Somos um escritório de advocacia com atendimento a pessoas físicas e jurídicas na parte de consultoria e contencioso. Atuamos nas áreas de direito empresarial, civil, tributário, trabalhista, do consumidor e penal empresarial. Com atendimento 100% online, nosso escritório trabalha para melhorar a sua experiência com o direito, combinando tecnologia e técnicas de design para transmitir a informação jurídica de forma mais clara e alcançar resultados mais rápidos e eficientes." />
          <meta property="og:image" content="https://leitunereguly.com/images/ogimage.jpeg" />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="1080" />
          <meta property="og:image:height" content="1080" />
          <meta property="og:type" content="website" />
          <link rel="canonical" href="https://leitunereguly.com" />
          {this.props.styleTags}
          <script dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K2BHSR8');`
          }}
          />
        </Head>
        <body id="top">
          <Main />
          <noscript dangerouslySetInnerHTML={{
            __html: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K2BHSR8" height="0" width="0" style="display:none;visibility:hidden"></iframe>'
          }}
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}
