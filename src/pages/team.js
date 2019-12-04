import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Section } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import { Footer } from '../components/Layout.Footer'
import { TeamMemberContainer, TeamMember } from '../components/Team.TeamMember'

export default function TeamPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <TitleAndMetaTags title={pageData.title} pathname="team" />
      <Hero
        title={pageData.title}
        subTitle={pageData.subtitle}
        wrap="wrap"
      ></Hero>
      <Section>
        <TeamMemberContainer>
          {data.team.edges.map((edge) => {
            const { node } = edge
            const { html, frontmatter } = node
            const { name, role, image, linkedin } = frontmatter

            return (
              <TeamMember
                key={name}
                name={name}
                role={role}
                image={image}
                linkedin={linkedin}
                bio={html}
              />
            )
          })}
        </TeamMemberContainer>
      </Section>
      <Footer />
    </Layout>
  )
}

export const pageQuery = graphql`
  query teamQuery {
    team: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___order] }
      filter: { fields: { collection: { eq: "team" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            image
            name
            role
            order
            position
            linkedin
          }
          fields {
            slug
          }
        }
      }
    }
    allPagesYaml(filter: { id: { eq: "team" } }) {
      edges {
        node {
          title
          subtitle
        }
      }
    }
  }
`
