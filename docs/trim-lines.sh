## Removes the "exports" declaration from our JS that we don't want, as it breaks typedoc
## declare an array variable
declare -a arr=("PanHandler.js" "plugins.js" "plugins/ScrollZoom.js" "plugins/ClickPan.js")

## now loop through the above array
for i in "${arr[@]}"
do
	echo Working on: $(pwd)/docs/out/assets/js/pan-handler/$i
	# WARNING: This sed command fails on MacOS. You can install gsed to run it
	sed -i -e '/^exports\..*$/d' "$(pwd)/docs/out/assets/js/pan-handler/$i"
	sed -i -e '/^Object\.defineProperty(exports,.*$/d' "$(pwd)/docs/out/assets/js/pan-handler/$i"
done
