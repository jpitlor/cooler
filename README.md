# This application has been abandoned
Sadly, not only did I lose access to COOL, but I did not end up finding a way to make some
of the buttons work. If anyone wants to fork this repo, I'm keeping it up for memory's sake

# COOLer
A COOL extension. Because COOL sucks.

### An Important Note:
If you're reading this code trying to learn how to make a new
web app, please don't. If you have a very specific application
very similar to this, it's fine, but if you are generating 
new content, this probably isn't the best example

# Contributing
If you'd like to contribute, please fork this repository
and submit a pull request! I literally cannot access 
COOL after May 2019, so as of then all development on 
the repo will cease since I can't test

# Themes
Want to add a theme? All you have to do is the following:

- Add an entry to `/theme/themes.json`
  - These objects have the following properties:
    - `stylesLists`: Does the theme use `<ul class="list-group">`?
  - Theme choices on the options page will automatically
  populate from this list
- Add a bootstrap theme named `theme.min.css` to `bootstrap/`
- Add a skeleton to `skeletons/`
