import Head from 'next/head';
import Link from 'next/link';
import { allDocs, Doc } from 'contentlayer/generated';
import { buildDocsTree } from 'src/utils/buildDocsTree';
import { InferGetStaticPropsType } from 'next';

export async function getStaticProps() {
  const tree = buildDocsTree(allDocs);
  return { props: { docs: allDocs, tree } };
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
    </div>
  );
}
