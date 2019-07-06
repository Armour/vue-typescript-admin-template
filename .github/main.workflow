workflow "Deploy on GitHub Pages" {
  on = "push"
  resolves = ["Deploy"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Yarn install" {
  needs = ["Filters for GitHub Actions"]
  uses = "borales/actions-yarn@master"
  args = "install"
}

action "Yarn build" {
  needs = ["Yarn install"]
  uses = "borales/actions-yarn@master"
  args = "build:prod"
}

action "Deploy" {
  needs = ["Yarn build"]
  uses = "maxheld83/ghpages@v0.2.1"
  env = {
    BUILD_DIR = "dist/"
  }
  secrets = ["GH_PAT"]
}
