import Layout from "../../components/Layout/Layout";

import LearnCard from "../../components/LearnCard/LearnCard";

import learnTopics from "../../data/learnTopics";

import "./Cocktail101.css";

function Cocktail101() {

  return (

    <Layout

      title="Cocktail 101"

      description="Everything you need to start making better cocktails."

    >

      <div className="learn-grid">

        {learnTopics.map((topic)=>(

          <LearnCard

            key={topic.id}

            topic={topic}

          />

        ))}

      </div>

    </Layout>

  );

}

export default Cocktail101;