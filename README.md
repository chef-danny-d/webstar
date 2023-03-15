# Webstar FrontEnd felvételi interjú

Spent time: [![wakatime](https://wakatime.com/badge/user/53a67a53-b1e3-48c2-b73e-7eb7124dacd7/project/c4902c99-3fad-40aa-b427-554d55f6034f.svg)](https://wakatime.com/badge/user/53a67a53-b1e3-48c2-b73e-7eb7124dacd7/project/c4902c99-3fad-40aa-b427-554d55f6034f)

Angular version: 15.2.2

> Elörre is elnézést kérek, hogy a dokumentáció nem magyarul van, de mivel a kód maga angol nyelvű és mindennap angolul kommunikálok így egyszerűbb volt számomra egy nyelven írni és gondolkoni is.

# Setup

## Installation

Run `npm install` to install all the dependencies.

## Environment variables

Add the API password to the environment object located `src/env/environment.ts`. The password is available in the email that was sent to me. The password is used to authenticate myself to the API, and it is needed for all the API requests.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

# Reflection

When I initially read the task to create this application, it seemed extremely daunting since I have **never used Angular before**. I figured that I might as well push myself out of my comfort zone and try to translate all my React and overall JavaScript knowledge to get a solid understanding of the framework. After a while I recognized the patter that Angular uses as it is very similar to the one that [NestJS](https://nestjs.com/) uses which I have years of experience working with. I initially started the project with the idea of using a component library such as MUI, but then I decided to write everything from scratch to be more hands on with the customizations. 

Overall I'm very happy with everything that I was able to complete for this mini-project especially because the topic on hand, **Star Wars**, is something that has been part of my lift since I was a kid. If I could have had more time to spend on this assignment, I'd have definitely tried to implement animations / transitions since right now the UI looks a bit "choppy", as  well as the character editing feature. This would have been a great opportunity to learn more about event bindings and the usage of the shared data layer that is made available by Angular natively.

## Accomplishments

- Fully functional authentication system using API endpoint
- Character switching without additional HTTP request
- Fully responsive with breakpoints at
  - < 768px
  - < 1200px
- BEM naming convention
- 97% accessibility score on Desktop and Mobile (Lighthouse)
  
# References

- Heavy usage of the [Angular Docs](https://angular.io/docs)
- Checked accessibility with [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- Checked deeper accessibility with [Axe Extension](https://www.deque.com/axe/devtools/chrome-browser-extension/)
- HTML attributes from [MDN](https://developer.mozilla.org/en-US/docs/)
