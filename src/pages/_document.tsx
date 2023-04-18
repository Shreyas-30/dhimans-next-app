import { Html, Head, Main, NextScript } from "next/document";
import { googleTag } from "@/google.tag";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{ __html: googleTag.headtag}}
        />
      </Head>
      <body >
        <Main />
        <NextScript />
        <noscript dangerouslySetInnerHTML={{ __html: googleTag.bodytag }} />
      </body>
    </Html>
  );
}
