export namespace CommonModels{
  export enum BackgroundColorVariant{
    blue = 1,
    black,
  }

  export const BackgroundColors = {
    [BackgroundColorVariant.blue]: '#1F75FE',
    [BackgroundColorVariant.black]: '#1B1B1B',
  }

  export enum CSSVariablesNames {
    app_get_call_card = '--app-get-call-card',
  }

}
