'use babel';
/* @flow */

import type {
  DatatipProvider,
  DatatipService,
} from 'nuclide/pkg/nuclide-datatip/lib/types';

import {
  CompositeDisposable,
  Disposable,
} from 'atom';
import invariant from 'assert';
import {datatip} from './GithubUserDatatip';

let subscriptions: ?CompositeDisposable = null;
export function activate(state: ?Object): void {
  subscriptions = new CompositeDisposable();
}

export function deactivate(): void {
  if (subscriptions != null) {
    subscriptions.dispose();
    subscriptions = null;
  }
}

export function consumeDatatipService(service: DatatipService): IDisposable {
  const datatipProvider: DatatipProvider = {
    // show this datatip for any type of file:
    validForScope: (scope: string) => true,
    // uniquely identifies this datatip provider.
    providerName: 'atom-github-user-datatip',
    // The ranking coefficient for sorting datatips from multiple providers.
    // Hovering over a username is a fairly explicit action, so we should rank these datatip highly.
    inclusionPriority: 1,
    // async function returning the actual datatip for a given text range.
    datatip,
  };
  service.addProvider(datatipProvider);
  const disposable = new Disposable(() => {
    service.removeProvider(datatipProvider);
  });
  invariant(subscriptions);
  subscriptions.add(disposable);
  return disposable;
}
