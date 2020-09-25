import React, { useContext } from "react";
import { Route, Switch, Redirect, __RouterContext } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import Layout from "./components/layout";
import Home from "./routes/home";
import Login from "./routes/login";
import Blog from "./routes/blog";
import CreateBlog from "./routes/manageBlog";

const App = () => {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: "translate(0%, 0)" },
    enter: { opacity: 1, transform: "translate(0%, 0)" },
    leave: {
      opacity: 0,
      transform: "translate(-0%, 0)",
      position: "absolute",
    },
  });

  return (
    <div id="App">
      <Layout>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            <Switch location={item}>
              <Route strict exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route path="/article/:slug" component={Blog} />
              <Route path="/edit/:slug" component={CreateBlog} />
              <Route path="/new/article" component={CreateBlog} />
              <Redirect to="/" />
            </Switch>
          </animated.div>
        ))}
      </Layout>
    </div>
  );
};

export default App;
