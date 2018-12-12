workflow "New workflow" {
  resolves = ["GitHub Action for npm"]
  on = "push"
}

action "GitHub Action for npm" {
  uses = "actions/npm@6309cd9"
  args = "release"
}
