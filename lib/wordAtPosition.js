'use babel';
/* @flow */

/*
 * Helper taken from https://github.com/facebook/nuclide/blob/master/pkg/commons-atom/word-at-position.js
 * This would ideally be a separate npm module.
 */

export default function wordAtPosition(
  editor: atom$TextEditor,
  position: atom$Point,
  wordRegex: ?RegExp
): ?{wordMatch: Array<string>; range: atom$Range} {
  if (!wordRegex) {
    wordRegex = editor.getLastCursor().wordRegExp();
  }
  const buffer = editor.getBuffer();
  const {row, column} = position;
  const rowRange = buffer.rangeForRow(row);
  let matchData;
  // Extract the expression from the row text.
  buffer.scanInRange(wordRegex, rowRange, data => {
    const {range} = data;
    if (range.containsPoint(position)) {
      matchData = data;
    }
    // Stop the scan if the scanner has passed our position.
    if (range.end.column > column) {
      data.stop();
    }
  });
  if (matchData) {
    return {
      wordMatch: matchData.match,
      range: matchData.range,
    };
  } else {
    return null;
  }
}
