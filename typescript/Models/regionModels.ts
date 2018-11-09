module WarOfTheRingMap.Models {

    export class Region {
        id: number;
        name: string;
        color: string;
        isCollapsed: KnockoutObservable<boolean>;
        isShadows: KnockoutObservable<boolean>;
        regions: KnockoutObservableArray<Subregion>;

        constructor(d)
        {
            this.id = d.id;
            this.name = d.name;
            this.color = d.color;
            this.isCollapsed = ko.observable(false);
            this.isShadows = ko.observable(d.isShadows);
            this.regions = ko.observableArray(d.regions);
        }
    }

    export class Subregion {
        id: number;
        name: string;
        parentId: number;
        path: string;
        isStronghold: boolean;
        isCity: boolean;
        isTown: boolean;
        isFortification: boolean;
    }
}