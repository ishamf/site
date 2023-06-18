import type { JTDDataType } from 'ajv/dist/jtd';
import Ajv from 'ajv/dist/jtd';
const ajv = new Ajv({ timestamp: 'string' });

const postMetadataSchema = {
	properties: {
		title: { type: 'string' },
		slug: { type: 'string' },
		created: { type: 'timestamp' },
	},
} as const;

type PostMetadata = JTDDataType<typeof postMetadataSchema>;

const validatePostMetadata = ajv.compile<PostMetadata>(postMetadataSchema);

export function parsePostMetadata(params: { metadata: unknown; path: string }) {
	const metadata = params.metadata;
	if (!validatePostMetadata(metadata)) {
		throw new Error('Invalid metadata: ' + JSON.stringify(validatePostMetadata.errors));
	}

	const directory = /([^/]+)\/\+page\.mdx/.exec(params.path)?.[1];

	const { slug, created } = metadata;

	return {
		...metadata,
		link: `/p/${slug}`,
		created: new Date(created),
		directory
	};
}
