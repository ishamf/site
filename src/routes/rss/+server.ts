import { getPosts } from '$lib/server/posts';
import { Feed } from 'feed';

export const prerender = true;

export async function GET() {
  const posts = await getPosts();

  const feed = new Feed({
    id: 'https://ishamf.com/',
    link: 'https://ishamf.com/',
    title: 'ishamf.com',
    description: 'Blog of Isham Faizal.',
    updated: posts[0].created,
    copyright: 'Copyright 2023 Isham Faizal',
    feed: 'https://ishamf.com/rss',
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      description: post.description,
      link: `https://ishamf.com${post.link}`,
      date: post.created,
    });
  });

  return new Response(feed.rss2());
}
