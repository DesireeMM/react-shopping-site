function App() {
  const [melons, setMelons] = React.useState({});
  const [shoppingCart, setShoppingCart] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch('/api/melons')
    .then((response) => response.json())
    .then((responseJson) => {
      setMelons(responseJson);
    setLoading(false);
    });
  }, []);

  function addMelonToCart(melonCode) {
    setShoppingCart((currentShoppingCart) => {
      const newShoppingCart = Object.assign({}, currentShoppingCart);

      if (newShoppingCart[melonCode]) {
        newShoppingCart[melonCode] += 1
      } else {
        newShoppingCart[melonCode] = 1
      }
      
      return newShoppingCart;
    })
  }

  React.useEffect(() => {
    const storedCart = JSON.stringify(shoppingCart);
    localStorage.setItem('savedCart', storedCart);
  }, [])

  return (
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="/static/img/watermelon.png" brand="Ubermelon" />
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/">
          <Homepage />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/shop">
          { loading ? <Loading /> 
          : null}
          <AllMelonsPage melons={melons} addMelonToCart={addMelonToCart} />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/cart">
          <ShoppingCartPage melons={melons} cart={shoppingCart} />
        </ReactRouterDOM.Route>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
