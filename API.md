# Map

## L.npmap.map(config: object)

Create and configure a map with baseLayers, overlays, and controls.

_Extends_: [`L.Map`](http://leafletjs.com/reference.html#map-options)

_Arguments_:

The first, and only, argument is required. It must be a map config object with the following properties:

- (Required) `div` (Object or String): Either an HTML element or the id of an HTML element to render the map into.
- (Optional) `baseLayers` (Array): An array of baseLayer configuration objects OR baseLayer preset strings.
- (Optional) `editControl` (Boolean): Defaults to `undefined`
- (Optional) `fullscreenControl` (Boolean): Defaults to `undefined`.
- (Optional) `geocoderControl` (Boolean or Object): Defaults to `undefined`.
- (Optional) `homeControl` (Boolean): Defaults to `true`.
- (Optional) `legendControl` (Boolean): Defaults to `undefined`
- (Optional) `locateControl` (Boolean): Defaults to `undefined`
- (Optional) `measureControl` (Boolean): Defaults to `undefined`
- (Optional) `overlays` (Array): An array of overlay configuration objects OR overlay preset strings.
- (Optional) `overviewControl` (Boolean or Object): Defaults to `undefined`.
- (Optional) `printControl` (Boolean): Defaults to `undefined`
- (Optional) `scaleControl` (Boolean): Defaults to `undefined`.
- (Optional) `shareControl` (Boolean): Defaults to `undefined`
- (Optional) `smallzoomControl` (Boolean): Defaults to `true`.

You can also (optionally) provide any of the options supported by [`L.Map`](http://leafletjs.com/reference.html#map-options).

_Example_:

    var map = L.npmap.map({
      div: 'map',
      geocoderControl: true
    });

_Returns_: a map object

# Layers

## L.npmap.layer.arcgisserver(config: object)

Add a layer from an ArcGIS Server map service, including services hosted on ArcGIS Online, to your map with `L.npmap.layer.arcgisserver()`.

_Extends_: [`L.TileLayer`](http://leafletjs.com/reference.html#tilelayer)

_Arguments_:

The first, and only, argument is required. It must be a layer config object with the following properties:

- (Required) `tiled` (Boolean): Should be `true` if the service is tiled and `false` if it is not.
- (Required) `url` (String): A URL string ending with "MapServer" for the ArcGIS Server service.
- (Optional) `attribution` (String): An attribution string for the layer. HTML is allowed.
- (Optional) `description` (String): Descriptive text for the layer. Used in legends, modules, and controls.
- (Optional) `dynamicAttribution` (String): The URL of a [dynamic attribution](http://blogs.esri.com/esri/arcgis/2012/08/15/dynamic-attribution-is-here/) endpoint for the service.
- (Optional) `layers` (String): A comma-delimited string of the ArcGIS Server integer layer identifiers to bring into the NPMap.js layer.
- (Optional) `name` (String): A name for the layer. Used in legends, modules, and controls.
- (Optional) `popup` (String OR Function): Configures the contents of the popup for an overlay. Either a Handlebars HTML template string or a function that is passed the data properties for a shape and returns an HTML string.

You can also (optionally) provide any of the options supported by [`L.TileLayer`](http://leafletjs.com/reference.html#tilelayer).

_Example_:

    var layer = L.npmap.layer.arcgisserver({
      attribution: '<a href="http://www.esri.com">Esri</a>',
      opacity: 0.5,
      tiled: true,
      url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Demographics/USA_Unemployment_Rate/MapServer'
    });

_Returns_: a layer object

## L.npmap.layer.bing(config: object)

Add a layer from the [Bing Imagery API](http://msdn.microsoft.com/en-us/library/ff701721.aspx) to your map with `L.npmap.layer.bing()`.

_Extends_: [`L.TileLayer`](http://leafletjs.com/reference.html#tilelayer)

_Arguments_:

The first, and only, argument is required. It must be a layer config object with the following properties:

- (Required) `layer` (String): The layer you want to bring in from the Bing Imagery API.

You can also (optionally) provide any of the options supported by [`L.TileLayer`](http://leafletjs.com/reference.html#tilelayer).

_Example_:

    var layer = L.npmap.layer.bing({
      layer: 'aerialWithLabels'
    });

_Returns_: a layer object

## L.npmap.layer.cartodb(config: object)

Add a [CartoDB](http://cartodb.com) layer to your map with `L.npmap.layer.cartodb()`.

_Extends_: [`L.TileLayer`](http://leafletjs.com/reference.html#tilelayer)

_Arguments_:

The first, and only, argument is required. It must be a layer config object with the following properties:

- (Required) `table` (String)
- (Required) `user` (String)
- (Optional) `cartocss` (String)
- (Optional) `interactivity` (String)
- (Optional) `sql` (String)

You can also (optionally) provide any of the options supported by [`L.TileLayer`](http://leafletjs.com/reference.html#tilelayer).

_Example_:

    var layer = L.npmap.layer.cartodb({
      table: 'park_bounds',
      type: 'cartodb',
      user: 'nps'
    });

_Returns_: a layer object

## L.npmap.layer.csv(config: object)

Add a CSV layer to your map with `L.npmap.layer.csv()`.

## L.npmap.layer.geojson(config: object)

Add a GeoJSON layer to your map with `L.npmap.layer.geojson()`.

## L.npmap.layer.github(config: object)

Add a GeoJSON/TopoJSON layer from GitHub to your map with `L.npmap.layer.github()`. NOTE: This layer handler utilizes the GitHub API to pull data in. This API is limited to 60 requests per hour. For production apps, you will want to setup a [GitHub Pages](http://pages.github.com/) site.

*Arguments:*

The first, and only, argument is required, and must be a layer config object with the following properties:

- (Required) `data` (Object | String): The GeoJSON data you'd like to add to the map. If this is a string, NPMap.js will parse it into an object for you. Required if your GitHub details (the other three "required" properties below) aren't provided.

OR

- (Required) `path` (String): The path to your GitHub file. This **should not** include your GitHub organization/user name or the name of the repository. This is the path to the GeoJSON file in your GitHub repository: e.g. `fire/CA-STF-HV2F.geojson`.
- (Required) `repo` (String): The name of the repository that contains the data.
- (Required) `user` (String): The name of the organization or user that owns the repository.
- (Optional) `branch` (String) The name of the branch your GitHub file should be pulled in from. Defaults to `master`.

You can also (optionally) provide any of the options supported by [`L.GeoJSON`](http://leafletjs.com/reference.html#tilelayer).

*Example:*

    var layer = L.npmap.layer.github({
      path: 'fire/CA-STF-HV2F.geojson',
      repo: 'data',
      type: 'github',
      user: 'nationalparkservice'
    });

## L.npmap.layer.kml(config: object)

Add a KML layer to your map with `L.npmap.layer.kml()`.

## L.npmap.layer.mapbox(config: object)

Add a layer from MapBox Hosting to your map with `L.npmap.layer.mapbox()`.

*Arguments:*

The first, and only, argument is required, and must be a layer config object with the following properties:

- (Required) `id` (String): The id ('account.id') of the MapBox map or tileset you want to add to the map. Can also be a comma-delimited string with multiple "account.id" strings if you want to take advantage of MapBox Hosting's compositing feature. Required if `tileJson` is not provided.

OR

- (Required) `tileJson` (Object): A tileJson object for the MapBox map or tileset you want to add to the map. Required if `id` is not provided.

AND

- (Optional) `format` (String): One of the following: 'jpg70', 'jpg80', 'jpg90', 'png', 'png32', 'png64', 'png128', or 'png256'. If not provided, defaults to 'png'.
- (Optional) `icon` (String)
- (Optional) `name` (String)
- (Optional) `retinaVersion` (String): The id ('account.id') of the MapBox map or tileset designed specifically for retina devices.

You can also (optionally) provide any of the options supported by [`L.TileLayer`](http://leafletjs.com/reference.html#tilelayer).

*Example:*

    var layer = L.npmap.layer.mapbox({
      id: 'examples.map-20v6611k'
    });

## L.npmap.layer.tiled(config: object)

Add a tiled layer to your map with `L.npmap.layer.tiled()`.

## L.npmap.layer.wms(config: object)

Add a WMS layer to your map with `L.npmap.layer.wms()`.

# Controls

## L.npmap.fullscreenControl(config: object)

## L.npmap.geocoderControl(config: object)

## L.npmap.homeControl(config: object)

## L.npmap.overviewControl(config: object)

Create a map control that provides context for the currently-visible area of the map. Adapted from the [Leaflet-MiniMap](https://github.com/Norkart/Leaflet-MiniMap) plugin.

*Arguments:*

The first, and only, argument is required, and must be a config object with the following properties:

- (Optional) `autoToggleDisplay` (Boolean): Should the overview hide automatically if the parent map bounds does not fit within the bounds of the overview map? Defaults to `false`.
- (Optional) `height` (Number): The height of the overview map. Defaults to 150 pixels.
- (Optional) `layer` (String|Object): A layer config object that you would like to add to the map. Can either be a layer preset string or a layer config object. If this is `undefined`, NPMap.js uses the baseLayer that is currently visible on the parent map.
- (Optional) `toggleDisplay` (Boolean): Should the overview map be togglable? Defaults to `true`.
- (Optional) `width` (Number): The width of the overview map. Defaults to 150 pixels.
- (Optional) `zoomLevelFixed` (Number): Overrides `zoomLevelOffset`, sets the map to a fixed zoom level.
- (Optional) `zoomLevelOffset` (Number): A positive or negative number that configures the overview map to a zoom level relative to the zoom level of the main map.

You can also (optionally) provide any of the options supported by [`L.Control`](http://leafletjs.com/reference.html#control).

*Example:*

    var control = L.npmap.control.overview({
      layer: 'mapbox-light'
    });

## L.npmap.scaleControl(config: object)

## L.npmap.smallzoomControl(config: object)

Create a map control that contains zoom in/out buttons.

*Arguments:*

You can (optionally) provide any of the options supported by [`L.Control`](http://leafletjs.com/reference.html#control).

*Example:*

    var control = L.npmap.control.smallzoom();

## L.npmap.switcherControl(config: object)

The switcher control is used and controlled internally by NPMap.js, and is created and added to your map when more than one baseLayers is present in your map configuration object.

# Icons

## L.npmap.icon.maki(config: object)

## L.npmap.icon.npmaki(config: object)

# Utils

# Concepts

## Using Popups

Popups display when you click on a feature in an overlay. Each popup is made up of three markup sections, with each having one or more nested subsection:

1. Header
   1. Title
2. Content
   1. Media
   2. Description
3. Footer
   1. Actions

If you do not specify a `popup` property on your layer object, NPMap.js will use a set of sensible defaults to configure the popup. If, however, you specify a `popup` property on your layer object, NPMap.js will only implement what you have specified. For example, if your `popup` property looks like this:

    popup: {
      title: '{{Name}}'
    }

NPMap.js will only display the title in the popup and will not render any other popup elements.

### Configuration

The content for each of the sections of a popup can be specified individually via a `popup` configuration object:

    var NPMap = {
      ...
      overlays: [{
        ...
        popup: {
          // {Array}, {String}, or {Function}. If a {Function}, it must return an {Array} or {String}.
          actions: [{
            handler: function() {
              window.alert('Clicked!');
            },
            text: 'Click Me!' // No HTML, but Handlebars is supported
          },{
            menu: [{
              handler: function() {
                window.alert('You clicked Menu Item 1');
              },
              text: 'Menu Item 1' // No HTML, but Handlebars is supported
            },{
              handler: function() {
                window.alert('You clicked Menu Item 2');
              },
              text: 'Menu Item 2' // No HTML, but Handlebars is supported
            }],
            text: 'Menu' // No HTML, but Handlebars is supported
          }],
          // {Object}, {String} or {Function}. If a {Function}, it must return an {Object} or {String}.
          description: '<p style="color:red;">{{description}}</p>',
          // A config object
          description: {
            // {Array} (if null, defaults to 'all')
            fields: [
              'Name',
              'Description'
            ],
            // {String} ('table' or 'list')
            format: 'table'
          },
          // {Array}, {String}, or {Function} (that returns an {Array} or {String})
          media: [{
            id: '',
            type: 'focus'
          }],


          media: '<ul><li><img src=""></li><li><iframe src=""></iframe></li></ul>',

          // No HTML, but Handlebars is supported
          more: '{{}}',
          // {String} or {Function} (that returns a {String}) - supports Handlebars and HTML )
          title: function(data) {
            if (data.level > 5) {
              return 'Greater than 5!';
            } else {
              return 'Less than 5!';
            }
          }
        }
      }]
    };

You can also specify a fixed width for your popup by passing a `width` property into the popup config object:

    var NPMap = {
      ...
      overlays: [{
        ...
        popup: {
          title: 'This is a Title',
          width: 300
        }
      }]
    };

This can be useful if you want to embed fixed width media (images, videos, etc.) into the popup.

You can see examples of configuring popups for overlays in the [popups](https://github.com/nationalparkservice/npmap.js/blob/master/examples/popups.html) example map.

## Using Tooltips

Tooltips display when you hover over a feature in an overlay. Tooltips only work for layer handlers that support `mouseover` and `mouseout` operations, currently CartoDB, CSV, GeoJSON, GitHub, KML, and MapBox.

Tooltips should be short and succinct. Like popups, HTML and Handlebars strings are supported.

    var NPMap = {
      ...
      overlays: [{
        ...
        tooltip: '{{UnitCode}}'
      }]
    };

You can see examples of configuring tooltips for overlays in the [tooltips](https://github.com/nationalparkservice/npmap.js/blob/master/examples/tooltips.html) example map.

## Styling Vectors

NPMap.js uses the [simplestyle specification](https://github.com/mapbox/simplestyle-spec), which currently, at v1.1.0, includes the following properties:

    fill
    fill-opacity
    marker-color
    marker-size
    marker-symbol
    stroke
    stroke-opacity
    stroke-width

In addition, NPMap.js supports the following property that is not supported by the simplestyle specification:

    marker-library

This property is optional. It defaults to `maki`, and can also be `npmaki`.

Styles for vector shapes can be set in multiple ways. NPMap.js looks in the following order for styles:

1. In the properties pulled in for each feature from the data source. You can tell NPMap.js to ignore feature styles by setting the "ignoreFeatureStyles" property to true. For example, if a GeoJSON Point feature has a "marker-symbol" property, it will be used to style the marker on the map unless "ignoreFeatureStyles" is set to true in the styles geometry (`line`, `point`, or `polygon`) object of an overlay's configuration.
2. In an overlay's configuration object, via a "styles" property, with `line`, `point`, and/or `polygon` properties designated as:
   1. an object
   2. a function that is passed a data object for each feature and must returns a style object

If no styles are found in these two places, NPMap.js falls back to a set of default styles.

If you prefer not to use the simplestyle specification, you can utilize the out-of-the-box Leaflet styles for the `line` (L.Path), `point` (L.Icon), and `polygon` (L.Path) `styles` object on your overlay configuration. NPMap.js will then pass the object directly to Leaflet.

**An important note**: Style properties cascade. This means that if a "marker-symbol" property is passed in via the data source (e.g. a GeoJSON feature's properties) and a "marker-color" property is passed in via the overlay config object, the geometry will be styled with both the "marker-symbol" AND "marker-color" properties unless the "ignoreFeatureStyles" property is present.

Take a look at the [Styling Vectors example](https://github.com/nationalparkservice/npmap.js/blob/master/examples/styling-vectors.html) to see an example of using the different configuration options to style vector data.

# Notes

<ul>
  <li>NPMap.js extends Leaflet's classes and only provides the interfaces outlined above. It acts as a complement to the larger <a href="http://leafletjs.com/reference.html">Leaflet</a> API.</li>
  <li>NPMap.js adds an <code>L</code> property to every map config object and layer (overlay or baselayer) passed in via the <code>NPMap</code> configuration object. You can use this property to interact programatically with objects created by Leaflet. A few examples:<ul>
    <li><code>NPMap.config.L</code> or <code>NPMap.config[0].L</code> will get a reference to the <code><a href="http://leafletjs.com/reference.html#map-class">L.Map</a></code> object</li>
    <li><code>NPMap.config.baseLayers[0].L</code> will get a reference to the Leaflet layer object for the first baseLayer</li>
    <li><code>NPMap.config.overlays[0].L</code> will get a reference to the Leaflet layer object for the first overlay</li>
  </ul></li>
  <li>Unlike previous versions of the NPMap library, <code>npmap-bootstrap.js</code> now supports adding multiple maps to a page. Just make the <code>NPMap</code> property an array of map configuration objects:<pre><code>var NPMap = [{
  div: 'example-map-1'
},{
  div: 'example-map-2'
}];
</code></pre></li>
</ul>
