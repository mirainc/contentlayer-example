import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { allDocs, Doc } from 'contentlayer/generated';
import { buildDocsTree } from 'utils/buildDocsTree';
import { PathSegment } from 'types/PathSegment';
import { defineStaticProps, toParams } from 'utils/next';

export async function getStaticPaths() {
  const paths = allDocs
    .map((_) => _.pathSegments.map((_: PathSegment) => _.pathName).join('/'))
    .map(toParams);
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = defineStaticProps(async (context) => {
  const params = context.params as any;
  const pagePath = params.slug?.join('/') ?? '';
  const doc = allDocs.find(
    (_) =>
      _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === pagePath,
  )!;
  let slugs = params.slug ? ['', ...params.slug] : [];
  let path = '';
  let breadcrumbs: any = [];
  for (const slug of slugs) {
    path += path == '' ? slug : '/' + slug;
    const title = allDocs.find(
      (_) =>
        _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === path,
    )?.title;
    breadcrumbs.push({ path: '/docs/' + path, slug, title });
  }
  const tree = buildDocsTree(allDocs);
  const childrenTree = buildDocsTree(
    allDocs,
    doc.pathSegments.map((_: PathSegment) => _.pathName),
  );

  return { props: { doc, tree, breadcrumbs, childrenTree } };
});
const DocLayout = (props: { doc: Doc }) => {
  const { doc } = props;
  console.log(props);
  return (
    <>
      <Head>
        <title>{doc.title}</title>
      </Head>
      <aside>Nav here</aside>
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

export default DocLayout;
