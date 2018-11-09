module WarOfTheRingMap.Controllers {
    export class MapController {
        regions: KnockoutObservableArray<Models.Region>;

        backupRegions: string;

        selectedPath: KnockoutObservable<string>;
        language: KnockoutObservable<string>;

        imageUrl: KnockoutComputed<string>;

        searchText: KnockoutObservable<string>;

        isHelpPopupVisible: KnockoutObservable<boolean>;

        // Texts
        searchPlaceholderText: KnockoutObservable<string>;

        constructor() {
            this.searchText = ko.observable("");

            this.searchText.subscribe((value) => {
                this.searching(value);
            });

            this.searchPlaceholderText = ko.observable("");

            this.regions = ko.observableArray([]);
            this.isHelpPopupVisible= ko.observable(false);
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

        searching = (searchValue: string) => {
            // Check for subregions.
            var result = [];

            this.regions(JSON.parse(this.backupRegions).map((x) => {
                return new Models.Region(x);
            }));

            _.each(this.regions(), (r: Models.Region) => {
                let newRegion = r;
                newRegion.regions(_.filter(newRegion.regions(), (x: Models.Subregion) => {
                    return x.name.toLowerCase().includes(searchValue.toLowerCase());
                }));
                result.push(newRegion);
            });

            this.regions(result);
        }

        readDataFromJson = () => {
            var self = this;
            $.get(`https://sirmartin.github.io/WarOfRingMap/regions_${this.language()}.json`, function (data) {
                self.regions(data.map((x) => {
                    return new Models.Region(x);
                }));

                self.backupRegions = JSON.stringify(data);
            });
        }

        enableHelp = () => {
            this.isHelpPopupVisible(true);
        }

        disableHelp = () => {
            this.isHelpPopupVisible(false);
        }

        collapseRegion = (region: Models.Region) => {
            region.isCollapsed(!region.isCollapsed());
        }

        showRegion = (subregion: Models.Subregion) => {
            this.selectedPath(subregion.path);
        }

        reset = () => {
            this.selectedPath("");
        }

        setLanguage = (lang: string) => {
            if (this.language() !== lang) {
                this.language(lang);
                this.readDataFromJson();
                this.setTranslationTexts();
            }
        }

        setTranslationTexts = () => {
            if (this.language() == "es") {
                this.searchPlaceholderText("Buscar...");
            } else {
                this.searchPlaceholderText("Search...");
            }
        }
    }
}