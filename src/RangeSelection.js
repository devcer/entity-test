import {
  useChainedCommands,
  useEditorEvent,
  useRemirrorContext,
} from '@remirror/react';
import { memo, useCallback, useRef } from 'react';

export const RangeSelection = memo(() => {
  const startRef = useRef(null);
  const { view } = useRemirrorContext();
  const chain = useChainedCommands();

  const mouseUpHandlerExtension = useCallback(
    e => {
      const position = view.posAtCoords({ left: e.pageX, top: e.pageY });
      if (startRef?.current?.pos !== position?.pos) {
        // in case of video this calculation is done, if text/pdf can just use from: startRef.current.pos, to: position.pos
        // const startPosition =
          // view.state.selection.$from.pos -
          // view.state.selection.$from.textOffset;
        // const positionNodePos = view.state.doc.resolve(position.pos);
        // const endPosition = view.state.doc.nodeAt(position.pos);

        // const endPos =
        //   positionNodePos.pos -
        //   positionNodePos.textOffset +
        //   endPosition.text.length;

        chain
          .focus({
            from: startRef?.current?.pos,
            to: position?.pos,
          })
          .run();

      }
    },
    [chain, view]
  );

  const mouseDownHandlerExtension = useCallback(
    e => {
      startRef.current = view.posAtCoords({ left: e.pageX, top: e.pageY });
    },
    [view]
  );

  useEditorEvent('mouseup', mouseUpHandlerExtension);
  useEditorEvent('mousedown', mouseDownHandlerExtension);

  return null;
});

RangeSelection.displayName = 'RangeSelection';
