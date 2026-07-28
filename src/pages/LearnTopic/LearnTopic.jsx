import { Link, useParams } from "react-router-dom";

import Layout from "../../components/Layout/Layout";

import lessonContent from "../../data/lessonContent";

import "./LearnTopic.css";

function LearnTopic() {
  const { topic } = useParams();

  const lesson = lessonContent[topic];

  if (!lesson) {
    return (
      <Layout
        title="Lesson not found"
        description="This Cocktail 101 lesson does not exist."
      >
        <Link
          to="/cocktail-101"
          className="learn-back-link"
        >
          ← Back to Cocktail 101
        </Link>
      </Layout>
    );
  }

  return (
    <Layout
      title={lesson.title}
      description={lesson.description}
    >
      <div className="learn-topic">
        <Link
          to="/cocktail-101"
          className="learn-back-link"
        >
          ← Back to Cocktail 101
        </Link>

        <div className="lesson-sections">
          {lesson.sections.map((section) => (
            <section
              className="lesson-section"
              key={section.title}
            >
              <h2>{section.title}</h2>

              {section.content && (
                <p>{section.content}</p>
              )}

              {section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.cards && (
                <div className="glassware-grid">
                  {section.cards.map((card) => (
                    <article
                      className="glassware-card"
                      key={card.name}
                    >
                      <img
                        src={card.image}
                        alt={card.name}
                      />

                      <div className="glassware-card-content">
                        <h3>{card.name}</h3>

                        <p>{card.description}</p>

                        {card.examples && (
                          <div className="glassware-examples">
                            <strong>
                              Common cocktails
                            </strong>

                            <ul>
                              {card.examples.map((example) => (
                                <li key={example}>
                                  {example}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default LearnTopic;