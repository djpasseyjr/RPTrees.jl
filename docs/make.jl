using Documenter, RPTrees
push!(LOAD_PATH,"../src/")

makedocs(sitename="My Documentation")
deploydocs(
    repo = "github.com/djpasseyjr/RPTrees.jl.git",
    devbranch = "main"
)
