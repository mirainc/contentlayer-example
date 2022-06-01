import Head from 'next/head';
import Link from 'next/link';
import { allDocs, Doc } from 'contentlayer/generated';
import { buildDocsTree } from 'src/utils/buildDocsTree';
import { PathSegment } from 'types/PathSegment';
import { defineStaticProps, toParams } from 'src/utils/next';
import { DocsNavigation } from 'src/components/DocsNavigation';
import { InferGetStaticPropsType } from 'next';

export async function getStaticPaths() {
  const test = allDocs.map((_) => _.pathSegments);
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
  for (const slug of slugs) {
    path += path == '' ? slug : '/' + slug;
    const title = allDocs.find(
      (_) =>
        _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === path,
    )?.title;
  }
  const tree = buildDocsTree(allDocs);
  const childrenTree = buildDocsTree(
    allDocs,
    doc.pathSegments.map((_: PathSegment) => _.pathName),
  );

  return { props: { doc, tree, childrenTree } };
});
const DocLayout = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { doc, tree } = props;
  return (
    <>
      <Head>
        <title>{doc.title}</title>
      </Head>
      <div className="relative mx-auto w-full max-w-screen-2xl lg:flex lg:items-start">
        <DocsNavigation tree={tree} />
        <article>
          <div>
            <h1 className="sr-only text-2xl font-semibold text-slate-800 dark:text-slate-200 md:text-3xl lg:not-sr-only lg:text-4xl">
              {doc.title}
            </h1>
          </div>
          <div dangerouslySetInnerHTML={{ __html: doc.body.html }} />
        </article>
      </div>
    </>
  );
};

export default DocLayout;
