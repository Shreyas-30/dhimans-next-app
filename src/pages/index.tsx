import ComingSoon from "@/components/ComingSoon";
import { Layout } from "@/components/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dhimans</title>
        <meta name="description" content="Dhimans" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <Layout>
          <ComingSoon />
        </Layout>
      </main>
    </>
  );
}
