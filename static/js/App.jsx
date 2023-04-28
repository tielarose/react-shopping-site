function App() {
  const [melons, setMelons] = React.useState({});
  const [shoppingCart, setShoppingCart] = React.useState({});

  function addMelonToCart(melonCode) {
    setShoppingCart((currentShoppingCart) => {
      const newShoppingCart = Object.assign({}, currentShoppingCart);
      if (newShoppingCart[melonCode]) {
        newShoppingCart[melonCode] += 1;
        console.log("line 10, newShoppingCart is: ", newShoppingCart);
      } else {
        newShoppingCart[melonCode] = 1;
        console.log("line 13, newShoppingCart is: ", newShoppingCart);
      }

      return newShoppingCart;
    });
  }

  React.useEffect(() => {
    fetch("/api/melons")
      .then((response) => response.json())
      .then((data) => setMelons(data));
  }, []);

  return (
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="/static/img/watermelon.png" brand="Ubermelon" />
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/">
          <Homepage />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/shop">
          <AllMelonsPage melons={melons} addMelonToCart={addMelonToCart} />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/cart">
          <ShoppingCartPage shoppingCart={shoppingCart} melons={melons} />
        </ReactRouterDOM.Route>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
