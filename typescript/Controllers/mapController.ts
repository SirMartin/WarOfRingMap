module WarOfTheRingMap.Controllers {
    export class MapController {
        regions: KnockoutObservableArray<Models.Region>;

        selectedPath: KnockoutObservable<string>;
        language: KnockoutObservable<string>;

        imageUrl: KnockoutComputed<string>;

        constructor() {
            this.regions = ko.observableArray([]);
            this.selectedPath = ko.observable("");
            this.language = ko.observable("es");
            this.readDataFromJson();

            this.imageUrl = ko.computed(() => {
                if (this.language() && this.language() == "es"){
                    return "images/map_es.jpg";
                }

                return "images/map_en.jpg";
            });

            this.createList();
        }

        createList = () => {
            //var theList = new List("the-list", null);
        }

        readDataFromJson = () => {
            var self = this;
            $.get(`https://sirmartin.github.io/WarOfRingMap/regions_${this.language()}.json`, function (data) {
                self.regions(data.map((x) => {
                    return new Models.Region(x);
                }));
            });
        }

        showRegion = (subregion: Models.Subregion) => {
            this.selectedPath(subregion.path);
        }

        reset = () => {
            this.selectedPath("");
        }

        setLanguage = (lang: string) => {
            if (this.language() !== lang){
                this.language(lang);
                this.readDataFromJson();
            }
        }
    }
}