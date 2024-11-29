// gatsby-node.js
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// This API is used to add custom fields to nodes when they are created
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Check if the node is a MarkdownRemark node
  if (node.internal.type === "MarkdownRemark") {
    // Create a slug for the Markdown file using its file path
    const slug = createFilePath({ node, getNode, basePath: "src/posts" });

    // Add the slug as a new field to the node
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

// This API is used to create pages dynamically based on the Markdown files
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Fetch all Markdown nodes
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  // Handle errors in the GraphQL query
  if (result.errors) {
    throw new Error("There was a problem with the GraphQL query", result.errors);
  }

  // Create a page for each Markdown node using the slug
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug, // URL path for the page
      component: path.resolve("./src/templates/blog-post.js"), // Path to the template
      context: {
        slug: node.fields.slug, // Pass the slug to the page context
      },
    });
  });
};
