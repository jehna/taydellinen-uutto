# The perfect extraction

> A game about doing a perfect espresso

This is a browser-based game that connects directly to a smart scale (Acaia) and
tracks your brewing skills!

## Try it out!

You can play the game live at:

https://taydellinen-uutto.herokuapp.com/

Have fun!

## Developing

This project uses the default create-react-app template, so just install
dependencies with `yarn` and hit:

```sh
yarn
yarn start
```

This will install all necessary dependencies and start the local server in watch
mode.

### Building

This project is [automagically
built](https://blog.heroku.com/deploying-react-with-zero-configuration) when
deployed to Heroku, but should you build it manually, you can do:

```sh
yarn build
```

### Deploying

To deploy this to Heroku, just push the current `master` to Heroku remote:

```shell
git push heroku master
```

Heroku's CI will take care of the rest.

## Features

This game will:

- Judge your coffee-making skills radically
- Connect to a certain model of Acaia smart scale using Browser's bluetooth API
  (pretty cool, right?)
- The perfect recipe is set to a sane default, but you may need to change it to
  match your coffee beans

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Licensing

The code in this project is licensed under MIT license.
