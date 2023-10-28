import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/kit/vite';
import yaml from 'js-yaml';

export function htmlCommentIgnoringFormatter(value, messages) {
  try {
    // Remove html comments used to ignore prettier
    return yaml.load(value.replace(/^<!--.*$/gm, ''));
  } catch (e) {
    messages.push('YAML failed to parse');
  }
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.mdx'],
      frontmatter: {
        parse: htmlCommentIgnoringFormatter,
        type: 'yaml',
        marker: '-',
      },
      layout: {
        _: './src/lib/DefaultMDXLayout.svelte',
      },
    }),
  ],

  extensions: ['.svelte', '.mdx'],

  compilerOptions: {
    customElement: true,
  },

  kit: {
    adapter: adapter({
      pages: '.svelte-kit/cloudflare',
    }),

    alias: {
      "@/*": "src/lib/*",
    }
  },
};

export default config;
