var WarOfTheRingMap;
(function (WarOfTheRingMap) {
    var Controllers;
    (function (Controllers) {
        class MapController {
            constructor() {
                this.createList = () => {
                    //var theList = new List("the-list", null);
                };
                this.readDataFromJson = () => {
                    var self = this;
                    $.get(`https://sirmartin.github.io/WarOfRingMap/regions_${this.language()}.json`, function (data) {
                        self.regions(data.map((x) => {
                            return new WarOfTheRingMap.Models.Region(x);
                        }));
                    });
                };
                this.showRegion = (subregion) => {
                    this.selectedPath(subregion.path);
                };
                this.reset = () => {
                    this.selectedPath("");
                };
                this.setLanguage = (lang) => {
                    if (this.language() !== lang) {
                        this.language(lang);
                        this.readDataFromJson();
                    }
                };
                this.regions = ko.observableArray([]);
                this.selectedPath = ko.observable("");
                this.language = ko.observable("es");
                this.readDataFromJson();
                this.imageUrl = ko.computed(() => {
                    if (this.language() && this.language() == "es") {
                        return "images/map_es.jpg";
                    }
                    return "images/map_en.jpg";
                });
                this.createList();
            }
        }
        Controllers.MapController = MapController;
    })(Controllers = WarOfTheRingMap.Controllers || (WarOfTheRingMap.Controllers = {}));
})(WarOfTheRingMap || (WarOfTheRingMap = {}));
