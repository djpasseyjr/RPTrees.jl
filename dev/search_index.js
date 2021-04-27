var documenterSearchIndex = {"docs":
[{"location":"#RPTrees.jl","page":"RPTrees.jl","title":"RPTrees.jl","text":"","category":"section"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"(Image: Random Projection Splits)","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"RPTrees is a Julia package for building ensembles of random projection trees. Random projection trees are a generalization of KD-Trees and are used to quickly approximate nearest neighbors or build k-nearest-neighbor graphs. They conform to low dimensionality that is often present in high dimensional data.","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"The implementation here is based on the MRPT algorithm. This package also includes optimizations for knn-graph creation and has built-in support for multithreading.","category":"page"},{"location":"#Installation","page":"RPTrees.jl","title":"Installation","text":"","category":"section"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"To install just type","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"] add https://github.com/djpasseyjr/RPTrees.jl","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"in the REPL or ","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"using Pkg\nPkg.add(path=\"https://github.com/djpasseyjr/RPTrees.jl\")","category":"page"},{"location":"#Build-an-Index","page":"RPTrees.jl","title":"Build an Index","text":"","category":"section"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"To build an ensemble of random projection trees use the RPForest type.","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"X = rand(100, 10000)\nrpf = RPForest(X; depth=6, ntrees=5)","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"The type accepts a matrix of data, X where each column represents a datapoint. ","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"depth describes the number of times each random projection tree will split the data. Leaf nodes in the tree contain npoints / 2^depth data points. Increasing depth increases speed but decreases accuracy.\nntrees controls the number of trees in the ensemble. More trees means more accuracy but more memory.","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"To query the index use","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"k = 10\nq = X[:, 1]\nann = approx_knn(rpf, q, k; vote_cutoff=2)","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"The vote_cutoff parameter signifies how many \"votes\" a point needs in order to be included in a linear search. Each tree \"votes\" for the points a leaf node, so if there aren't many point in the leaves and there aren't many trees, the odds of a point receiving more than one vote is low.  Increasing vote_cutoff speeds up the algorithm but may reduce accuracy. When depth is large and ntrees is less than 5, it is reccomended to set vote_cutoff = 1. ","category":"page"},{"location":"#KNN-Graphs","page":"RPTrees.jl","title":"KNN-Graphs","text":"","category":"section"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"This package was designed specifically to generate k-nearest-neighbor graphs and has specialized functions for this purpose. It uses neighbor of neighbor exploration (outlined here) to efficiently improve the accuracy of a knn-graph.","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"Nearest neighbor graphs are used to give a sparse topology to large datasets. Their structure can be used to project the data onto a lower dimensional manifold, to cluster datapoints with community detection algorithms or to preform other analyses.","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"To generate nearest neighbor graphs:","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"X = rand(100, 10000)\nrpf = RPForest(X; depth=6, ntrees=5)\nk = 10\ng = knngraph(rpf, k; vote_cutoff=1, ne_iters=1, gtype=SimpleDiGraph)","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"The vote_cutoff parameter signifies how many \"votes\" a point needs in order to be included in a linear search.\nne_iters controlls how many iterations of neighbor exploration the algorithm will undergo. Successive iterations are increasingly fast. It is reccomened to use more iterations of neighbor exploration when the number of trees is small and less when many trees are used.\nThe gtype parameter allows the user to specify a LightGraphs.jl graph type to return. gtype=identity returns a sparse adjacency matrix.","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"If an array of nearest neighbor indices is preferred,","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"nn = allknn(rpf, k; vote_cutoff=1, ne_iters=0)","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"can be used to generate an rpf.npointsxk array of integer indexes where nn[i, :] corresponds to the nearest neighbors of X[:, i]. The keyword arguments work as outlined above.","category":"page"},{"location":"#Threading","page":"RPTrees.jl","title":"Threading","text":"","category":"section"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"RPTrees has built in support for multithreading. To allocate multiple threads, start julia with the --threads flag:","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"user@sys:~$ julia --threads 4","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"To see this at work, consider a small scale example:","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"user@sys:~$ cmd=\"using RPTrees; rpf=RPForest(rand(100, 10000)); @time knngraph(rpf, 10, ne_iters=1)\"\nuser@sys:~$ julia -e \"$cmd\"\n29.422300 seconds (140.91 M allocations: 8.520 GiB, 5.86% gc time)\nuser@sys:~$ julia -e --threads 4 \"$cmd\"\n15.212044 seconds (141.42 M allocations: 8.840 GiB, 5.98% gc time)","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"(This assumes that RPTrees is installed.)","category":"page"},{"location":"#Benchmarks","page":"RPTrees.jl","title":"Benchmarks","text":"","category":"section"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"(Image: Benchmark Plot)","category":"page"},{"location":"#Function-Documentation","page":"RPTrees.jl","title":"Function Documentation","text":"","category":"section"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"RPForest(data::AbstractArray{T, 2}, depth::Int, ntrees::Int) where T","category":"page"},{"location":"#RPTrees.RPForest-Union{Tuple{T}, Tuple{AbstractMatrix{T}, Int64, Int64}} where T","page":"RPTrees.jl","title":"RPTrees.RPForest","text":"RPForest(data::Array{T, 2}, depth::Int, ntrees::Int) where T -> ensemble\n\nConstructor for ensemble of sparse random projection trees with voting. Follows the implementation outlined in:\n\nFast Nearest Neighbor Search through Sparse Random Projections and Voting. Ville Hyvönen, Teemu Pitkänen, Sotirios Tasoulis, Elias Jääsaari, Risto Tuomainen, Liang Wang, Jukka Ilmari Corander, Teemu Roos. Proceedings of the 2016 IEEE Conference on Big Data (2016)\n\n\n\n\n\n","category":"method"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"approx_knn(rpf::RPForest{T}, q::AbstractArray{T, 2}, k::Int; vote_cutoff=1) where T","category":"page"},{"location":"#RPTrees.approx_knn-Union{Tuple{T}, Tuple{RPForest{T}, AbstractMatrix{T}, Int64}} where T","page":"RPTrees.jl","title":"RPTrees.approx_knn","text":"approx_knn(rpf::RPForest{T}, q::Array{T, 2}, k::Int; vote_cutoff=1) where T -> knn_idx\n\nFor a query point q, find the approximate k nearest neighbors from the data stored in the the RPForest. The vote_cutoff parameter signifies how many \"votes\" a point needs in order to be included in a linear search. Increasing vote_cutoff speeds up the algorithm but may reduce accuracy.\n\n\n\n\n\n","category":"method"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"knngraph(rpf::RPForest{T}, k::Int; vote_cutoff::Int=1, ne_iters::Int=0, gtype::G=SimpleDiGraph) where {T, G}","category":"page"},{"location":"#RPTrees.knngraph-Union{Tuple{G}, Tuple{T}, Tuple{RPForest{T}, Int64}} where {T, G}","page":"RPTrees.jl","title":"RPTrees.knngraph","text":"knngraph(rpf::RPForest{T}, k::Int, vote_cutoff; vote_cutoff::Int=1, ne_iters::Int=0, gtype::G) where {T, G} -> g\n\nReturns a graph with rpf.npoints node and k * rpf.npoints edges datapoints conneceted to nearest neighbors\n\nParameters\n\nrpf: random forest of the desired data\nk: the desired number of nearest neighbors\nvote_cutoff: signifies how many \"votes\" a point needs in order to be included \n\nin a linear search through leaf nodes. Increasing vote_cutoff speeds up the algorithm but may reduce accuracy. Defaults to 1\n\nne_iters: assigns the number of iterations of neighbor exploration to use. Defaults to zero.\n\nNeighbor exploration is a way to increse knn-graph accuracy.\n\ngtype is the type of graph to construct. Defaults to SimpleDiGraph. gtype=identity returns a sparse adjacency matrix.\n\n\n\n\n\n","category":"method"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"explore(i::Int, data::AbstractArray{T}, ann::Array{NeighborExplorer{T}, 1}) where T","category":"page"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"allknn(rpf::RPForest{T}, k::Int; vote_cutoff::Int=1, ne_iters::Int=0) where T","category":"page"},{"location":"#RPTrees.allknn-Union{Tuple{T}, Tuple{RPForest{T}, Int64}} where T","page":"RPTrees.jl","title":"RPTrees.allknn","text":"allknn(rpf::RPForest{T}, k::Int; vote_cutoff::Int=1, ne_iters::Int=0) where T -> approxnn\n\nReturns a rpf.npoints by k array of approximate nearest neighbor indexes. That is, approxnn[i,:] contains the indexes of the k nearest neighbors of rpf.data[:, i].\n\nThe ne_iters assigns the number of iterations of neighbor exploration to use.  Neighbor exploration is an inexpensive way to increase accuracy.\n\nThe vote_cutoff parameter signifies how many \"votes\" a point needs in order to be included  in a linear search. Increasing vote_cutoff speeds up the algorithm but may reduce accuracy.\n\n\n\n\n\n","category":"method"},{"location":"","page":"RPTrees.jl","title":"RPTrees.jl","text":"traverse_to_leaves(rpf::RPForest{T}, x::Array{T, 2}) where T","category":"page"},{"location":"#RPTrees.traverse_to_leaves-Union{Tuple{T}, Tuple{RPForest{T}, Matrix{T}}} where T","page":"RPTrees.jl","title":"RPTrees.traverse_to_leaves","text":"traverse_to_leaves(rpf::RPForest{T}, x::Array{T, 2}) where T -> leaf_idxs\n\nRoute data point x down to a leaf node each tree and return and array of indexes of the data stored in each corresponding leaf node\n\n\n\n\n\n","category":"method"}]
}