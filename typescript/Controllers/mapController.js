var WarOfTheRingMap;
(function (WarOfTheRingMap) {
    var Controllers;
    (function (Controllers) {
        class MapController {
            constructor() {
                this.searching = (searchValue) => {
                    // Check for subregions.
                    var result = [];
                    this.regions(JSON.parse(this.backupRegions).map((x) => {
                        return new WarOfTheRingMap.Models.Region(x);
                    }));
                    _.each(this.regions(), (r) => {
                        let newRegion = r;
                        newRegion.regions(_.filter(newRegion.regions(), (x) => {
                            return x.name.toLowerCase().includes(searchValue.toLowerCase());
                        }));
                        result.push(newRegion);
                    });
                    this.regions(result);
                };
                this.readDataFromJson = () => {
                    var self = this;
                    $.get(`https://sirmartin.github.io/WarOfRingMap/regions_${this.language()}.json`, function (data) {
                        self.regions(data.map((x) => {
                            return new WarOfTheRingMap.Models.Region(x);
                        }));
                        self.backupRegions = JSON.stringify(data);
                    });
                };
                this.enableHelp = () => {
                    this.isHelpPopupVisible(true);
                };
                this.disableHelp = () => {
                    this.isHelpPopupVisible(false);
                };
                this.collapseRegion = (region) => {
                    region.isCollapsed(!region.isCollapsed());
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
                        this.setTranslationTexts();
                    }
                };
                this.setTranslationTexts = () => {
                    if (this.language() == "es") {
                        this.searchPlaceholderText("Buscar...");
                    }
                    else {
                        this.searchPlaceholderText("Search...");
                    }
                };
                this.searchText = ko.observable("");
                this.searchText.subscribe((value) => {
                    this.searching(value);
                });
                this.searchPlaceholderText = ko.observable("");
                this.regions = ko.observableArray([]);
                this.isHelpPopupVisible = ko.observable(false);
                this.selectedPath = ko.observable("");
                this.language = ko.observable("es");
                this.setTranslationTexts();
                this.readDataFromJson();
                this.imageUrl = ko.computed(() => {
                    if (this.language() && this.language() == "es") {
                        return "images/map_es.jpg";
                    }
                    return "images/map_en.jpg";
                });
            }
        }
        Controllers.MapController = MapController;
    })(Controllers = WarOfTheRingMap.Controllers || (WarOfTheRingMap.Controllers = {}));
})(WarOfTheRingMap || (WarOfTheRingMap = {}));
