var WarOfTheRingMap;
(function (WarOfTheRingMap) {
    class Start {
        constructor() {
            const viewModel = new WarOfTheRingMap.Controllers.MapController();
            ko.applyBindings(viewModel);
        }
    }
    WarOfTheRingMap.Start = Start;
})(WarOfTheRingMap || (WarOfTheRingMap = {}));
