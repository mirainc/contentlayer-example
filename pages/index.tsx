import Head from 'next/head';
import Link from 'next/link';
import { compareDesc, format, parseISO } from 'date-fns';
import { allPosts, Post } from 'contentlayer/generated';

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return { props: { posts } };
}

function PostCard(post: Post) {
  return (
    <div>
      <time dateTime={post.date}>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <h2>
        <Link href={post.url}>
          <a>{post.title}</a>
        </Link>
      </h2>
    </div>
  );
}

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div>
      <Head>
        <title>Contentlayer Blog Example</title>
      </Head>

      <h1>Contentlayer Blog Example</h1>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
