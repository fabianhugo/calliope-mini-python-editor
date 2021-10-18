/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import DOMPurify from "dompurify";
import render from "marked";
import { MarkupContent } from "vscode-languageserver-types";
import "./documentation.css";

export const firstParagraph = (markup: string) => markup.split(/\n{2,}/g)[0];

export const renderDocumentation = (
  documentation: MarkupContent | string | undefined,
  firstParagraphOnly: boolean = false
): Element => {
  if (!documentation) {
    documentation = "No documentation";
  }
  const div = document.createElement("div");
  div.className = "docs-markdown";
  if (MarkupContent.is(documentation) && documentation.kind === "markdown") {
    try {
      div.innerHTML = renderMarkdown(
        documentation.value,
        firstParagraphOnly
      ).__html;
      return div;
    } catch (e) {
      // Fall through to simple text below.
    }
  }
  let fallbackContent = MarkupContent.is(documentation)
    ? documentation.value
    : documentation;
  if (firstParagraphOnly) {
    fallbackContent = firstParagraph(fallbackContent);
  }
  const p = div.appendChild(document.createElement("p"));
  p.appendChild(new Text(fallbackContent));
  return div;
};

export interface SanitisedHtml {
  __html: string;
}

const fixupMarkdown = (input: string): string => {
  // Pyright's reST -> markdown conversion is imperfect.
  // Make some fixes.
  // Messy because it's after escaping. Fragile because it's regex.
  // Let's see if we can upstream or align the docs with supported syntax.
  return input
    .replace(/^\\\n/, "")
    .replace(/`([\w² \n]+?) ?<(.*?)>`\\_/gs, "[$1]($2)")
    .replace(/\\\*\\\*/g, "**")
    .replace(/:param ([^:]+):/g, "**$1**: ")
    .replace(/:return:/g, "**returns**: ");
};

// Workaround to open links in a new tab.
DOMPurify.addHook("afterSanitizeAttributes", function (node) {
  if (node.tagName === "A") {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener");
  }
});

export const renderMarkdown = (
  markdown: string,
  firstParagraphOnly: boolean = false
): SanitisedHtml => {
  if (firstParagraphOnly) {
    markdown = firstParagraph(markdown);
  }
  const html = DOMPurify.sanitize(
    render(fixupMarkdown(markdown), { gfm: true })
  );
  return {
    __html: html,
  };
};