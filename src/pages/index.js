import React from "react"
import { Link, graphql } from "gatsby"
import Seo from "../components/seo"  // Import the SEO component

const HomePage = ({ data }) => {
  // Get the site metadata
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description

  return (
    <main>
      {/* Add Seo component for SEO optimization */}
      <Seo title={siteTitle} description={siteDescription} />

      <h1>{siteTitle}</h1>
      <p>{siteDescription}</p>
      <Link to="/about">Go to About Page</Link>
    </main>
  )
}

// GraphQL query to fetch site metadata
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

export default HomePage;