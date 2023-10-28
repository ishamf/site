import { SKIP, visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import { slug } from 'github-slugger';

/**
 * Add table of contents to frontmatter.
 */
export default function addTocToFM() {
  /**
   * Transform.
   *
   * @param {any} tree
   *   Tree.
   * @param {any} file
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree, file) {
    const headings = [];

    visit(tree, 'heading', (node) => {
      headings.push(node);

      return SKIP;
    });

    if (!headings.length) {
      return;
    }

    if (file.data?.fm) {
      file.data.fm.toc = headings.map((heading) => {
        const text = toString(heading);

        return {
          level: heading.depth,
          text,
          slug: slug(text),
        };
      });
    }
  };
}
