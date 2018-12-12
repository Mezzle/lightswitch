workflow "Build and Release?" {
  on = "push"
  resolves = ["GitHub Action for npm"]
}

action "GitHub Action for npm-1" {
  uses = "actions/npm@6309cd9"
  runs = "yarn"
  args = "install"
}

action "GitHub Action for npm" {
  uses = "actions/npm@6309cd9"
  needs = ["GitHub Action for npm-1"]
  runs = "yarn"
  args = "run release"
}
