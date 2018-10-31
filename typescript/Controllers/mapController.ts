module WarOfTheRingMap.Controllers {

    export class MapController {
        regions: KnockoutObservableArray<Models.Region>;

        selectedPath: KnockoutObservable<string>;
        currentProfit: KnockoutObservable<number>;

        constructor() {
            this.regions = ko.observableArray([]);
            this.selectedPath = ko.observable("");
            this.currentProfit = ko.observable(0);
            this.readDataFromJson();
        }

        readDataFromJson = () => {
            var self = this;
            $.get("https://sirmartin.github.io/WarOfRingMap/regions.json", function (data) {
                self.regions(data.map((x) => {
                    return new Models.Region(x);
                }));
            });
        }

        showRegion = (subregion: Models.Subregion) => {
            this.selectedPath(subregion.path);
        }

    }
}