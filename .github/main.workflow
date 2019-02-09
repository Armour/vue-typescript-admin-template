workflow "Deploy on GitHub Pages" {
  on = "push"
  resolves = ["deploy"]
}

action "deploy" {
  uses = "maxheld83/ghpages@v0.1.2"
  env = {
    BUILD_DIR = "dist/"
  }
  secrets = ["GH_PAT"]
}
