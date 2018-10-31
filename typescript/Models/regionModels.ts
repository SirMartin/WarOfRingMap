module WarOfTheRingMap.Models {

    export class Region {
        id: number;
        name: string;
        color: string;
        regions: KnockoutObservableArray<Subregion>;

        constructor(d)
        {
            this.id = d.id;
            this.name = d.name;
            this.color = d.color;
            this.regions = ko.observableArray(d.regions);
        }
    }

    export class Subregion {
        id: number;
        name: string;
        path: string;
        isStronghold: boolean;
        isCity: boolean;
        isTown: boolean;
        isFortification: boolean;
    }
}