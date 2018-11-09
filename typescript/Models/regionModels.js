var WarOfTheRingMap;
(function (WarOfTheRingMap) {
    var Models;
    (function (Models) {
        class Region {
            constructor(d) {
                this.id = d.id;
                this.name = d.name;
                this.color = d.color;
                this.isCollapsed = ko.observable(false);
                this.isShadows = ko.observable(d.isShadows);
                this.regions = ko.observableArray(d.regions);
            }
        }
        Models.Region = Region;
        class Subregion {
        }
        Models.Subregion = Subregion;
    })(Models = WarOfTheRingMap.Models || (WarOfTheRingMap.Models = {}));
})(WarOfTheRingMap || (WarOfTheRingMap = {}));
