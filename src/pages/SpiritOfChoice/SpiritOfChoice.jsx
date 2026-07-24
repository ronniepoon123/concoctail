import Layout from "../../components/Layout/Layout";
import "./SpiritOfChoice.css";


function SpiritOfChoice() {
  return (
    <Layout
      title="Spirit of Choice"
      description="Choose a base spirit and discover cocktails you can make."
    >
      <div className="spirit-grid">

        <button>🥃 Whisky</button>

        <button>🍸 Gin</button>

        <button>🍹 Rum</button>

        <button>🍶 Vodka</button>

        <button>🌵 Tequila</button>

        <button>🍊 Brandy</button>

        <button>🍾 Liqueurs</button>

      </div>
    </Layout>
  );
}

export default SpiritOfChoice;