module WarOfTheRingMap {
    export class Start {
      constructor() {
        const viewModel = new Controllers.MapController();
        ko.applyBindings(viewModel);
      }
    }
  }