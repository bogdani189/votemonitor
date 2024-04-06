/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as ObserversIndexImport } from './routes/observers/index'
import { Route as NgosIndexImport } from './routes/ngos/index'
import { Route as FormTemplatesIndexImport } from './routes/form-templates/index'
import { Route as ElectionRoundsIndexImport } from './routes/election-rounds/index'
import { Route as ObserversObserverIdImport } from './routes/observers/$observerId'
import { Route as NgosNgoIdImport } from './routes/ngos/$ngoId'
import { Route as ElectionRoundsElectionRoundIdImport } from './routes/election-rounds/$electionRoundId'
import { Route as ObserversObserverIdEditImport } from './routes/observers_.$observerId.edit'
import { Route as FormTemplatesFormTemplateIdEditImport } from './routes/form-templates/$formTemplateId.edit'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ObserversIndexRoute = ObserversIndexImport.update({
  path: '/observers/',
  getParentRoute: () => rootRoute,
} as any)

const NgosIndexRoute = NgosIndexImport.update({
  path: '/ngos/',
  getParentRoute: () => rootRoute,
} as any)

const FormTemplatesIndexRoute = FormTemplatesIndexImport.update({
  path: '/form-templates/',
  getParentRoute: () => rootRoute,
} as any)

const ElectionRoundsIndexRoute = ElectionRoundsIndexImport.update({
  path: '/election-rounds/',
  getParentRoute: () => rootRoute,
} as any)

const ObserversObserverIdRoute = ObserversObserverIdImport.update({
  path: '/observers/$observerId',
  getParentRoute: () => rootRoute,
} as any)

const NgosNgoIdRoute = NgosNgoIdImport.update({
  path: '/ngos/$ngoId',
  getParentRoute: () => rootRoute,
} as any)

const ElectionRoundsElectionRoundIdRoute =
  ElectionRoundsElectionRoundIdImport.update({
    path: '/election-rounds/$electionRoundId',
    getParentRoute: () => rootRoute,
  } as any)

const ObserversObserverIdEditRoute = ObserversObserverIdEditImport.update({
  path: '/observers/$observerId/edit',
  getParentRoute: () => rootRoute,
} as any)

const FormTemplatesFormTemplateIdEditRoute =
  FormTemplatesFormTemplateIdEditImport.update({
    path: '/form-templates/$formTemplateId/edit',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/election-rounds/$electionRoundId': {
      preLoaderRoute: typeof ElectionRoundsElectionRoundIdImport
      parentRoute: typeof rootRoute
    }
    '/ngos/$ngoId': {
      preLoaderRoute: typeof NgosNgoIdImport
      parentRoute: typeof rootRoute
    }
    '/observers/$observerId': {
      preLoaderRoute: typeof ObserversObserverIdImport
      parentRoute: typeof rootRoute
    }
    '/election-rounds/': {
      preLoaderRoute: typeof ElectionRoundsIndexImport
      parentRoute: typeof rootRoute
    }
    '/form-templates/': {
      preLoaderRoute: typeof FormTemplatesIndexImport
      parentRoute: typeof rootRoute
    }
    '/ngos/': {
      preLoaderRoute: typeof NgosIndexImport
      parentRoute: typeof rootRoute
    }
    '/observers/': {
      preLoaderRoute: typeof ObserversIndexImport
      parentRoute: typeof rootRoute
    }
    '/form-templates/$formTemplateId/edit': {
      preLoaderRoute: typeof FormTemplatesFormTemplateIdEditImport
      parentRoute: typeof rootRoute
    }
    '/observers/$observerId/edit': {
      preLoaderRoute: typeof ObserversObserverIdEditImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  ElectionRoundsElectionRoundIdRoute,
  NgosNgoIdRoute,
  ObserversObserverIdRoute,
  ElectionRoundsIndexRoute,
  FormTemplatesIndexRoute,
  NgosIndexRoute,
  ObserversIndexRoute,
  FormTemplatesFormTemplateIdEditRoute,
  ObserversObserverIdEditRoute,
])

/* prettier-ignore-end */
