import Layout from "../../components/Layout/Layout";

import spirits from "../../data/spirits";

import "./Spirits.css";

function Spirits() {

  return (

    <Layout

      title="Spirits"

      description="The six major base spirits used in cocktails."

    >

      <div className="spirits-grid">

        {spirits.map((spirit)=>(

          <article
            key={spirit.id}
            className="spirit-card"
          >

            <h2>{spirit.name}</h2>

            <p>{spirit.description}</p>

            <h4>Popular Cocktails</h4>

            <ul>

              {spirit.cocktails.map((drink)=>(

                <li key={drink}>{drink}</li>

              ))}

            </ul>

          </article>

        ))}

      </div>

    </Layout>

  );

}

export default Spirits;