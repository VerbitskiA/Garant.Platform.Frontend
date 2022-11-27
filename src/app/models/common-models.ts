export namespace CommonModels{
  export enum BackgroundColorVariant{
    blue = 1,
    black,
    fuchsia
  }

  export const BackgroundColors = {
    [BackgroundColorVariant.blue]: '#1F75FE',
    [BackgroundColorVariant.black]: '#1B1B1B',
    [BackgroundColorVariant.fuchsia]: '#ff00ff',
  }

  export enum CSSVariablesNames {
    app_get_call_card = '--app-get-call-card',
  }

}
