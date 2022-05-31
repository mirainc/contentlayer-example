import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { format, parseISO } from 'date-fns';
import { allDocs, Doc } from 'contentlayer/generated';

export async function getStaticPaths() {
  const paths = allDocs.map((doc) => doc.url);
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const doc = allDocs.find((doc) => doc._raw.flattenedPath === params?.slug);
  return {
    props: {
      doc,
    },
  };
};

const PostLayout = ({ doc }: { doc: Doc }) => {
  return (
    <>
      <Head>
        <title>{doc.title}</title>
      </Head>
      <article>
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        <div>
          <h1>{doc.title}</h1>
        </div>
        <div dangerouslySetInnerHTML={{ __html: doc.body.html }} />
      </article>
    </>
  );
};

export default PostLayout;
