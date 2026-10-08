# mattmandav.github.io

Personal academic website of Matthew Davison, served by GitHub Pages at https://mattmandav.github.io.

Built with Jekyll, starting from the [Academic Pages](https://github.com/academicpages/academicpages.github.io) template (MIT licence, see `LICENSE`).

## Where things live

- `_pages/`: page content (About, Activities, Teaching, ...)
- `_data/navigation.yml`: top menu links
- `_config.yml`: site settings and sidebar profile
- `_sass/theme/_palette.scss`: all site colours
- `images/`: profile photo, favicons, other images

## Running locally

With Docker: `docker compose up`, then open http://localhost:4000.

Without Docker: install Ruby and Bundler, run `bundle install`, then `bundle exec jekyll serve -l -H localhost`.

## Rebuilding the JavaScript

Only needed after editing `assets/js/_main.js` or `assets/js/plugins/`: `npm install && npm run build:js`.
