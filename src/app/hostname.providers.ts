import {InjectionToken, Provider} from "@angular/core";

export const HOSTNAME_INFO = new InjectionToken(`Ваш хост`)

export const HOSTNAME_PROVIDERS: Provider[] = [
  {
    provide: HOSTNAME_INFO,
    deps: [],
    useFactory: hostnameFactory
  }
]

export function hostnameFactory(): string {
  return `${window.location.protocol}//${window.location.hostname}`;
}
