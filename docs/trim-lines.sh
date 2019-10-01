## Removes the "exports" declaration from our JS that we don't want, as it breaks typedoc
## declare an array variable
declare -a arr=("PanHandler.js" "plugins.js" "plugins/ScrollZoom.js" "plugins/ClickPan.js")

## now loop through the above array
for i in "${arr[@]}"
do
	sed -i '' -e '/^exports\..*$/d' ./docs/out/assets/js/pan-handler/$i
	sed -i '' -e "/^Object\.defineProperty(exports,.*$/d" ./docs/out/assets/js/pan-handler/$i
done
