import type { JTDDataType } from 'ajv/dist/jtd';
import Ajv from 'ajv/dist/jtd';
const ajv = new Ajv({ timestamp: 'string' });

const postMetadataSchema = {
	properties: {
		title: { type: 'string' },
		created: { type: 'timestamp' },
	},
} as const;

type PostMetadata = JTDDataType<typeof postMetadataSchema>;

const validatePostMetadata = ajv.compile<PostMetadata>(postMetadataSchema);

export function getPosts() {
	const posts = Object.entries(
		import.meta.glob('../posts/*/+page.mdx', { eager: true, import: 'metadata' })
	).map(([path, metadata]) => {
		const slug = /([^/]+)\/\+page\.mdx/.exec(path)?.[1];

		if (!slug) throw new Error('Cannot find slug');

		if (!validatePostMetadata(metadata)) {
			throw new Error('Invalid metadata: ' + JSON.stringify(validatePostMetadata.errors));
		}

		return { ...metadata, slug, created: new Date(metadata.created) };
	});

	return posts;
}
