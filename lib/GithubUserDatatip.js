'use babel';
/* @flow */

import type {Datatip} from 'nuclide/pkg/nuclide-datatip/lib/types';
import type {GithubUser} from './types';

import fetch from 'node-fetch';
import wordAtPosition from './wordAtPosition';
import {makeGithubUserDatatipComponent} from './GithubUserDatatipComponent';

const WORD_REGEX = /@([\w-_]+)/gi;
export async function datatip(editor: TextEditor, position: atom$Point): Promise<?Datatip> {
  const extractedWord = wordAtPosition(editor, position, WORD_REGEX);
  if (extractedWord == null) {
    return null;
  }
  const {
    wordMatch,
    range,
  } = extractedWord;
  const [_, username] = wordMatch;
  if (username == null) {
    return null;
  }
  const response = await fetch(`https://api.github.com/users/${username}`)
  const user: GithubUser = await response.json();
  if (user == null || response.status !== 200) {
    return null;
  }
  return {
    component: makeGithubUserDatatipComponent(user),
    range,
  };
}
