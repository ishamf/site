import type { JTDDataType } from 'ajv/dist/jtd';
import Ajv from 'ajv/dist/jtd';

const ajv = new Ajv({ timestamp: 'string' });

const postMetadataSchema = {
  properties: {
    title: { type: 'string' },
    slug: { type: 'string' },
    created: { type: 'timestamp' },
    description: { type: 'string' },
  },
  optionalProperties: {
    draft: { type: 'boolean' },
  },
} as const;

type PostMetadata = JTDDataType<typeof postMetadataSchema>;

const validatePostMetadata = ajv.compile<PostMetadata>(postMetadataSchema);

async function hasPreview(directory: string) {
  try {
    await import(`../posts/${directory}/+preview.mdx`);
    return true;
  } catch (e) {
    return false;
  }
}

async function hasImports(directory: string) {
  try {
    await import(`../posts/${directory}/+imports.ts`);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get posts based on the files in the posts directory.
 *
 * +page.mdx: the page itself
 * +preview.mdx: preview of the page (optional, will use "description" if not present)
 * +imports.ts: imports for the page, mainly for required web components (optional)
 *
 * The logic to use these files is in src/routes/p/[slug]/*.
 */
export async function getPosts({ draft = false }: { draft?: boolean } = {}) {
  const rawPosts = await Promise.all(
    Object.entries(
      import.meta.glob('../posts/*/+page.mdx', { eager: true, import: 'metadata' })
    ).map(async ([modulePath, metadata]) => {
      if (!validatePostMetadata(metadata)) {
        throw new Error('Invalid metadata: ' + JSON.stringify(validatePostMetadata.errors));
      }

      const directory = /([^/]+)\/\+page\.mdx/.exec(modulePath)?.[1];

      if (!directory) {
        throw new Error('Invalid path: ' + modulePath);
      }

      const { slug, created } = metadata;

      return {
        ...metadata,
        link: `/p/${slug}`,
        created: new Date(created),
        hasPreview: await hasPreview(directory),
        hasImports: await hasImports(directory),
        directory,
      };
    })
  );

  return rawPosts
    .filter((x) => !x.draft || draft)
    .sort((a, b) => b.created.getTime() - a.created.getTime());
}

export async function getPostBySlug(slug: string) {
  const posts = await getPosts({ draft: true });

  return posts.find((post) => post.slug === slug);
}
