import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import DocsNavMobile from '../components/DocsNavMobile'
import TableOfContent from '../components/TableOfContent'
import DocsNav from '../components/DocsNav'
import VersionControl from '../components/VersionControl'
import LastUpdateGithub from '../components/LastUpdateGithub'
import { BottomButtons } from '../components/DocsComponents'
import navMenu from '../components/DevNavMenu'
import BreadCrumbNav from '../components/BreadCrumbNav'
import DocTag from '../components/DocTag'

const DocsTemplate = ({ data, pageContext }: any) => {
  const { slug, version } = pageContext
  const globalDocsNav = navMenu.global()
  const docsMenu = navMenu.htg()
  return (
    <Layout>
      <SEO title={data.mdx ? data.mdx.frontmatter.title : null} />
      <div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:hidden">
            <DocsNavMobile
              sideNav={docsMenu}
              globalNav={globalDocsNav}
              templateId={2}
            />
          </div>
          <div className="hidden lg:inline-block lg:flex-none lg:h-auto lg:bg-substrateGray-light lg:dark:bg-gray-900 ">
            <DocsNav
              sideNav={docsMenu}
              globalNav={globalDocsNav}
              templateId={2}
            />
          </div>
          <article className="max-w-6xl px-4 lg:px-16 lg:pb-24 lg:flex lg:mx-auto">
            <div>
              <div
                className={`py-8 lg:flex lg:justify-between lg:items-center`}
              >
                <BreadCrumbNav
                  section={data.mdx.frontmatter.section}
                  sectionURL={`/v3/how-to-guides`}
                  title={data.mdx.frontmatter.title}
                />
                <VersionControl
                  version={version}
                  slug={slug}
                  absolutePath={data.mdx.fileAbsolutePath}
                />
              </div>
              {data.mdx.frontmatter.difficulty && (
                <DocTag difficulty={data.mdx.frontmatter.difficulty} />
              )}
              <div className="markdown-body mdx-anchor">
                <h1>{data.mdx.frontmatter.title}</h1>
                <MDXRenderer>{data.mdx.body}</MDXRenderer>
              </div>
              <div className="text-xs text-right py-12">
                <LastUpdateGithub absolutePath={data.mdx.fileAbsolutePath} />
              </div>
              {data.mdx.frontmatter.hideNav ? null : (
                <BottomButtons menu={docsMenu} pageSlug={slug} />
              )}
            </div>
            <div className="hidden xl:inline-block xl:flex-none">
              <TableOfContent headings={data.mdx.tableOfContents} />
            </div>
          </article>
        </div>
      </div>
    </Layout>
  )
}

export default DocsTemplate

export const query = graphql`
  query ($locale: String!, $slug: String!) {
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $slug } }
    ) {
      frontmatter {
        slug
        title
        hideNav
        difficulty
        section
        category
      }
      body
      tableOfContents(maxDepth: 3)
      fileAbsolutePath
    }
  }
`
