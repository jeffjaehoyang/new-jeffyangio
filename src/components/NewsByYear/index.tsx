import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Container from 'components/ui/Container';
import * as Styled from './styles';
import Icon from 'components/ui/Icon';

interface News {
  node: {
    id: string;
    frontmatter: {
      content: string;
      year: string;
    };
  };
}

interface Props {
  year: string;
}

const NewsByYear: React.FC<Props> = ({ year }) => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "news" } } }
        sort: { order: DESC, fields: fileAbsolutePath }
      ) {
        edges {
          node {
            id
            frontmatter {
              content
              year
            }
          }
        }
      }
    }
  `);

  const allNewsList: News[] = allMarkdownRemark.edges;
  const newsList = allNewsList.filter((item) => item.node.frontmatter.year === year);

  return (
    <Container>
      <Styled.News>
        {newsList.map((item) => {
          const {
            id,
            frontmatter: { content, year }
          } = item.node;

          return (
            <Styled.NewsItem key={id}>
              <Styled.Title>
                <Icon icon={['fal', 'check']} style={{ marginRight: 10, color: 'green' }} />
                {content}
              </Styled.Title>
            </Styled.NewsItem>
          );
        })}
      </Styled.News>
    </Container>
  );
};

export default NewsByYear;
