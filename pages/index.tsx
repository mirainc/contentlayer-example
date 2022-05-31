import Head from 'next/head';
import Link from 'next/link';
import { allDocs, Doc } from 'contentlayer/generated';
import { buildDocsTree } from 'utils/buildDocsTree';
import { InferGetStaticPropsType } from 'next';

export async function getStaticProps() {
  const tree = buildDocsTree(allDocs);
  return { props: { docs: allDocs, tree } };
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

export default function Home({
  docs,
  tree,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
