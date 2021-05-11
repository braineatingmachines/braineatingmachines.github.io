FROM jekyll/jekyll

COPY --chown=jekyll:jekyll Gemfile .
COPY --chown=jekyll:jekyll Gemfile.lock .
COPY --chown=jekyll:jekyll beautiful-jekyll-theme.gemspec .

RUN bundle install --quiet

CMD ["jekyll", "serve"]
