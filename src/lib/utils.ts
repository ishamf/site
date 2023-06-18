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

export function parsePostMetadata(
	params: { metadata: unknown } & ({ path: string } | { slug: string })
) {
	const slug = 'slug' in params ? params.slug : /([^/]+)\/\+page\.mdx/.exec(params.path)?.[1];

	if (!slug) throw new Error('Cannot find slug');

	if (!validatePostMetadata(params.metadata)) {
		throw new Error('Invalid metadata: ' + JSON.stringify(validatePostMetadata.errors));
	}

	return {
		...params.metadata,
		link: `/p/${slug}`,
		slug,
		created: new Date(params.metadata.created),
	};
}
