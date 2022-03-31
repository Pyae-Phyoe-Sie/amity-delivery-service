const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <h2>Here is some description about how to use this app.</h2>

        <hr />
        <h4 className="text-left">Calculate Cost</h4>
        <ol>
          <li>If you not type nothing in point field, 'Add' button stay in disabled mode.</li>
          <li>If you add under 2 points, 'Calculate' button stay in disabled mode.</li>
          <li>Total cost is show in the middle of the form.</li>
        </ol>

        <hr />
        <h4 className="text-left">Possible Route</h4>
        <ol>
          <li>If two inputs are null, button stay in disabled mode.</li>
          <li>Possible routes list will be show with table.</li>
        </ol>
      </div>
    </div>
  );
}
 
export default Home;