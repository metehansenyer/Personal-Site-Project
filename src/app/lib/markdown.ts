/**
 * Markdown Processing Module
 * 
 * This module handles the processing and rendering of markdown content for project pages.
 * It provides functionality to convert markdown files into styled HTML content.
 * 
 * Features:
 * - Markdown to HTML conversion
 * - GitHub-flavored markdown support
 * - Custom template integration
 * - Technology icon processing
 * - Error handling
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'
import { generateIconsHtml } from '@/app/data/icons'

// Directory containing project markdown files
const PROJECTS_DIR = 'src/app/data/projects'

// Process markdown content through the unified pipeline
// Converts markdown to HTML with GitHub-flavored markdown support
async function processMarkdown(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content)

  return result.toString()
}

// Main function to get and process markdown content
// Handles file reading, icon processing, and template integration
export async function getMarkdownContent(fileName: string) {
  try {
    // Create file paths for markdown and template
    const mdPath = path.join(process.cwd(), PROJECTS_DIR, `${fileName}.md`)
    const templatePath = path.join(process.cwd(), PROJECTS_DIR, 'template.html')

    // Read both files concurrently
    const [mdContent, template] = await Promise.all([
      fs.promises.readFile(mdPath, 'utf8'),
      fs.promises.readFile(templatePath, 'utf8')
    ])

    // Parse markdown content
    const { content } = matter(mdContent)

    // Process technology icons in the content
    const regex = /\{icons:\s*\[(.*?)\]\}/g;
    const matches = Array.from(content.matchAll(regex));
    const iconsArray = matches.map(match => match[1].split(',').map(icon => icon.trim())).flat();
    const willBeReplaced = generateIconsHtml(iconsArray);
    const willBeProcessed = content.replace(regex, willBeReplaced)

    // Convert to HTML
    const processedContent = await processMarkdown(willBeProcessed)

    // Insert into template
    return template.replace('<!-- CONTENT -->', processedContent)
  } catch (error) {
    console.error('Markdown işleme hatası:', error)
    return '<p>İçerik yüklenirken bir hata oluştu.</p>'
  }
}