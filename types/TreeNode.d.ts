export type TreeNode = {
  title: string;
  urlPath: string;
  children: TreeNode[];
  nav_title: string | null;
};
