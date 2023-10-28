# Inlaserworld reservation integration example
This repository is showcase how inlaserworld reservation could be integrated by custom frontend
EARLY ACCESS

## Run this
project is using vite so commands to run it are
```shell
yarn
yarn dev
```

## Integration hints
The main two package are:
```shell
# This package is using that already, note that they are using different registry
yarn add --registry https://registry.inlaserworld.cz @inlaserworld/types-tenant
yarn add --registry https://registry.inlaserworld.cz @inlaserworld/reservation-widget
```

Those packages are implementation of hooks used in this project and they do have peer dependencies on:
```shell
# This package is using that already, note that those are needed if integrated with your app
yarn add axios i18next i18next-http-backend moment use-context-selector
```

To correctly use this, some parts needs to be understood.

1) Everything nested needs to use React context provided by @inlaserworld/reservation-widget package
```js
return <ReservationStateProvider>
        <App reservationId={1} fallbackLng='en' tenantId={8} />
    </ReservationStateProvider>
```

2) Inside App.tsx important is useApp hook that takes following props

| Name          |   Type    |                                                                        Description |
|:--------------|:---------:|-----------------------------------------------------------------------------------:|
| reservationId |   number  |           The portal ID obtained in reservation setting on portal.inlaserworld.com |
| tenantId      |  number   |           The tenant ID obtained in reservation setting on portal.inlaserworld.com |
| fallbackLng   |  string   | Reservation is using i18n package to provide translation this is fallback language |
| baseDomId     |  string   |                        if this is loaded as shadow dom this ID need to be provided |
| apiUrl        |  string   |                                          url to api basically for development only |
| tenantUuid    |  string   |                                             unique uuid obtained in portal setting |
```ts
export interface AppProps {
    reservationId?: number;
    tenantId?: number;
    fallbackLng?: string;
    baseDomId?: string;
    apiUrl?: string | null;
    tenantUuid: string;
}
```

3) Widget uses i18n note [src/i18n.ts](src/i18n.ts) initializing translations
 - Note also its import in [src/App.tsx](src/App.tsx)

4) Documentation is currently done by this repository and example implementation
follow [src/App.tsx](src/App.tsx) and its children to understand implementation
