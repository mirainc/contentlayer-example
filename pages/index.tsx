import Head from 'next/head';
import Link from 'next/link';
import { allDocs, Doc } from 'contentlayer/generated';

export async function getStaticProps() {
  return { props: { docs: allDocs } };
}

function DocCard(doc: Doc) {
  return (
    <div>
      <h2>
        <Link href={doc.url}>
          <a>{doc.title}</a>
        </Link>
      </h2>
    </div>
  );
}

export default function Home({ docs }: { docs: Doc[] }) {
  return (
    <div>
      <Head>
        <title>Contentlayer Spike</title>
      </Head>

      <h1>Contentlayer Spike</h1>

      {docs.map((doc, idx) => (
        <DocCard key={idx} {...doc} />
      ))}
    </div>
  );
}
