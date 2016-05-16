'use babel';
/* @flow */

import type {Datatip} from 'nuclide/pkg/nuclide-datatip/lib/types';

import {React} from 'react-for-atom';
import wordAtPosition from './wordAtPosition';

type DatatipComponentProps = {
  word: string;
};

function makeSampleDatatipComponent(word: string): ReactClass {
  return () => <SampleDatatipComponent word={word} />;
}

const SampleDatatipComponent = (props: DatatipComponentProps) => {
  return <div>Github user datatip: "{props.word}"</div>;
};

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
  const word = wordMatch[0] == null ? 'N/A' : wordMatch[0];
  return {
    component: makeSampleDatatipComponent(word),
    range,
  };
}
