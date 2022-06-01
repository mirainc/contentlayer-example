import { Doc } from 'contentlayer/generated';
import { GetStaticProps } from 'next';
import { PathSegment } from 'types/PathSegment';
import { TreeNode } from 'types/TreeNode';

export const buildDocsTree = (
  docs: Doc[],
  parentPathNames: string[] = [],
): TreeNode[] => {
  const level = parentPathNames.length;

  return docs
    .filter(
      (_) =>
        _.pathSegments.length === level + 1 &&
        _.pathSegments
          .map((_: PathSegment) => _.pathName)
          .join('/')
          .startsWith(parentPathNames.join('/')),
    )
    .sort((a, b) => a.pathSegments[level].order - b.pathSegments[level].order)
    .map<TreeNode>((doc) => ({
      title: doc.title,
      urlPath:
        '/docs/' +
        doc.pathSegments.map((_: PathSegment) => _.pathName).join('/'),
      children: buildDocsTree(
        docs,
        doc.pathSegments.map((_: PathSegment) => _.pathName),
      ),
    }));
};

export function toParams(path: string): { params: { slug: string[] } } {
  return { params: { slug: path.replace(/^\//, '').split('/') } };
}

/** Needed in combination with `InferGetStaticPropsType` */
export function defineStaticProps<Fn extends GetStaticProps>(fn: Fn): Fn {
  return fn;
}
