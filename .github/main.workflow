workflow "Build and Release?" {
  on = "push"
  resolves = ["Release"]
}

action "Install" {
  uses = "docker://mezzle/github-actions:yarn-git"
  args = "install"
}

action "Release" {
  uses = "docker://mezzle/github-actions:yarn-git"
  needs = ["Install"]
  args = "run release"
}
