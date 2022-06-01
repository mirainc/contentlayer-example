import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import highlight from 'rehype-highlight';
import { urlFromFilePath, contentDirPath } from './src/contentlayer/utils';

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/**/*.mdx`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the doc',
      required: true,
    },
    nav_title: {
      type: 'string',
      description: 'Override the title for display in nav',
    },
  },
  computedFields: {
    url_path: {
      type: 'string',
      resolve: urlFromFilePath,
    },
    pathSegments: {
      type: 'json',
      resolve: (doc) => {
        console.log('START LOGGING');
        console.log(doc._raw.flattenedPath);
        console.log('START END LOGGING');
        return (
          doc._raw.flattenedPath
            .split('/')
            // skip `/docs` prefix
            .slice(1)
            .map((dirName) => {
              const re = /^((\d+)-)?(.*)$/;
              const [, , orderStr, pathName] = dirName.match(re) ?? [];
              const order = orderStr ? parseInt(orderStr) : 0;
              return { order, pathName };
            })
        );
      },
    },
  },
}));

export default makeSource({
  contentDirPath,
  documentTypes: [Doc],
  mdx: { rehypePlugins: [highlight] },
});
