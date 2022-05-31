import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { urlFromFilePath } from './contentlayer/utils';

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `**/*.mdx`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the doc',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: urlFromFilePath,
    },
    pathSegments: {
      type: 'json',
      resolve: (doc) =>
        doc._raw.flattenedPath
          .split('/')
          // skip `/docs` prefix
          .slice(1)
          .map((dirName) => {
            const re = /^((\d+)-)?(.*)$/;
            const [, , orderStr, pathName] = dirName.match(re) ?? [];
            const order = orderStr ? parseInt(orderStr) : 0;
            return { order, pathName };
          }),
    },
  },
}));

export default makeSource({
  contentDirPath: 'docs',
  documentTypes: [Doc],
});
