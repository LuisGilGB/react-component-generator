# react-component-generator
Command line tool that makes the scaffolding for a new React component and its own demo application. The generated module has its own tools to allow you to publish it at npm.

## Install

```console
$ npm install -g @luisgilgb/react-component-generator
```

## Usage

```console
$ @luisgilgb/react-component-generator -n my-cmp
```

This command will generate a component called MyCmp into a new my-cmp directory, in which you will find the following structure:

```
my-cmp
├── demo-app
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── DemoApp.css
│   │   ├── DemoApp.jsx
│   │   ├── DemoApp.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── serviceWorker.js
│   └── .gitignore
├── src
│   ├── MyCmp.css
│   └── MyCmp.jsx
├── .babelrc
├── .gitignore
├── package.json
├── README.md
├── webpack.config.demo.js
└── webpack.config.js
```

Being the src/MyCmp.jsx the main file of your new component and the one and most likely the one that will contain most of the new development. Right after the scaffolding, its aspect is the following one:

```js
import React from 'react';
import './MyCmp.css';

const DEFAULT_CLASS_NAME = 'my-cmp';

const MyCmp = props => {
    const {
        children,
        className = '',
        style,
        onClick,
        ...otherProps
    } = props;

    return (
        <div
            {...otherProps}
            className={`${DEFAULT_CLASS_NAME} ${className}`.trim()}
            style={style}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export default MyCmp;
```

## Arguments

You can use the following arguments:
--name (-n) - The name of your future npm package. The only mandatory argument, the component name will be generated from it. You can scope it if you want too!
--dirname (-d) - The name of the directory created to contain the scaffolded files. A default dirname will be generated from name if this argument is not provided.
--author (-a) - The author's name.
--git-user (-g) - The Git username, use it to have generate the proper GitHub links at Readme file!

Example of these extra arguments usage:

```console
$ @luisgilgb/react-component-generator -n @luisgilgb/my-cmp -a "Luis Gil Gutiérrez de la Barreda" --git-user LuisGilGB
```

## Running a demo

First of all, remember installing the new module dependencies:

```console
$ npm install
```

Once you have your dependencies installed, you can run a demo application of your new component just by entering:

```console
$ npm run demo-start
```

This demo app will be hosted at http://localhost:3030/ if nothing is changed at the webpack demo config.

The vanilla demo-app only consists in a header and a body with your component with a default text as only child (and only prop).

```js
import React from 'react';
import MyCmp from '../../src/MyCmp';
import './DemoApp.css';

function DemoApp() {
  return (
    <div className="app">
      <header className="app-header">
        <p>
          Edit <code>src/DemoApp.js</code> and save to reload.
        </p>
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <MyCmp>
        This is into a MyCmp
      </MyCmp>
    </div>
  );
}

export default DemoApp;
```

Feel free to edit this and other demo files (or even adding your own ones!) to test and having a nice demo application for your component.

## Publishing the component

The aim of this generator is to have your custom components ready to be built and published in npm with the least extra Webpack (or other tools) configuration as possible. Let's do it!

You'll only need to enter the following command:

```console
$ npm run publish-pro
```

And that's it!

There are more available commands to build, transpile, clean dependencies... give them a try if you want!

## FREEDOM

Remember this is just a scaffold utility thinking in a basic scenario. You can change whatever you want for your own generated component. As I said, feel free!

## Built With

* [NodeJS](https://nodejs.org/es/) - The scripting language in which this generator is written.
* [ReactJS](http://reactjs.org/) - The web framework used
* [Webpack](https://webpack.js.org/) - The bundling tools to both build a deployable component or a demo application.
* [npm](https://www.npmjs.org/) - Dependency Management
* [Sublime Text 3](https://www.sublimetext.com/) - Text editor for development
* [Visual Studio Code](https://code.visualstudio.com/) - Another text editor for development, a bit closer to what a real IDE would be.

## Contributing

TBD

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/LuisGilGB/react-component-generator/tags).

## Authors

* **[Luis Gil Gutiérrez de la Barreda](https://github.com/LuisGilGB)**

See also the list of [contributors](https://github.com/LuisGilGB/react-component-generator/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* ReactJS community and developers.
* [create-react-app](https://github.com/facebook/create-react-app), main source of inspiration of this utility. What they made for React applications, I've tried to replicate for React components.
