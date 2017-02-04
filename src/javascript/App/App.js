import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

const App = ({children}) => (
                <MuiThemeProvider>
                <div>
                <header>
                <h1>Sam Alghanmi: Full Stack Developer</h1>
                <nav>
                <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                </ul>
                </nav>
                </header>
                <div className="container">
                {children}
                </div>
                <footer>
                All Rights Reserved
                </footer>
                </div>
                </MuiThemeProvider>
);

const Home = () => (
        <article>
            <h3>Welcome to my personal Site.</h3> 
            <h3>My name is Sam Alghanmi. I am a full-stack developer. My main language is Javascript.</h3>
        </article>
);

const About = () => (
        <article>
            <h3>
            I am full stack developer with 7 years of professional experience. My main stack is composed of JavaScript: React, Angularjs, Redux, Mobx, RxJS, Webpack are some of what I know on the front-end. On the back-end, I am familiar with Node: Express, PostgreSQL on the back-end. I have been focusing my efforts in the last two years on working with Hybrid Mobile apps in React Native. 
            I have worked in most settings of software development. I have run my own agency, worked at an agency, in-house on a product team, and freelanced. My diverse background empowers me to bring a comprehensive view into any technical issue I am faced with.
            </h3>
        </article>
);

const Portfolio = () => (
    <article>
        <h3>
        Portfolio
        </h3>
    </article>
);

const Contact = () => (
    <article>
        <h3>
        Contact
        </h3>
    </article>
);

ReactDOM.render(
        <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="about" component={About} />
            <Route path="portfolio" component={Portfolio} />
            <Route path="contact" component={Contact} />
        </Route>
        </Router>,
        document.getElementById('app')
        );
