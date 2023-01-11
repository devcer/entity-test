import { useCommands, useHelpers } from '@remirror/react';
import React, { memo } from 'react';
import { cx, uniqueId } from 'remirror';

const ALL_HIGHLIGHT_TYPES = ['important', 'interesting'];
// const allHighlights = new Map();

export const Debug = memo(({ state, getAllHighlightsRefData, updateRef }) => {
  const { getEntityReferencesAt } = useHelpers(true);
  const commands = useCommands();
  const { getEntityReferences } = useHelpers();
  const highlightsAt = getEntityReferencesAt();

  return (
    <div style={{display: 'flex', marginTop: '1rem'}}>
     {ALL_HIGHLIGHT_TYPES.map((type) => {
        const highlightsOfType = highlightsAt.filter((h) => {
          const highlightType = getAllHighlightsRefData(h.id);
          return highlightType === type;
        });
        // Provide visual feedback if there is a highlight of this type at the user's cursor
        const active = highlightsOfType.length > 0;
        const onClick = () => {
          if (!active) {
            // Add highlight
            const id = uniqueId();
            commands.addEntityReference(id);
            updateRef(id, type)
          } else {
            // Remove highlight
            highlightsOfType.forEach((highlight) => {
              commands.removeEntityReference(highlight.id);
            });
          }
        };
        return (
          <button
            key={type}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onClick}
            className={cx(active && "active")}
          >
            {type}
          </button>
        );
      })}
      <button
        onClick={() => {
          const id = uniqueId();
          commands.addAnnotation({ id })
        }}
      >
        Annotate
      </button>
      <button
        onClick={() => {
          console.log(getEntityReferences());
        }}
      >
        get entity
      </button>
      <button
        onClick={() => {
          console.log(state.doc.toJSON());
        }}
      >
        get doc json
      </button>
      <button
        onClick={() => {
          console.log(state);
        }}
      >
        get state
      </button>
      <button
        onClick={() => {
          console.log(state.selection.from);
        }}
      >
        current selection
      </button>
      <button
        onClick={() => {
          console.log(getAllHighlightsRefData());
        }}
      >
        allHighlightsRef
      </button>
      <button
        onClick={() => {
          console.log(
            state.doc.nodesBetween(
              state.selection.from,
              state.selection.to,
              node => {
                console.log('---node---', node);
                return true;
                // ght it with the intention to work on it a long time ago, maybe like six years. And then I wanted to convert it to a ten speed, and when I was a
              }
            )
          );
        }}
      >
        node between
      </button>
      <button
        onClick={() => {
          console.log(
            state.doc.nodeAt(state.selection.from, node => {
              console.log('---node---', node);
              return true;
              // ght it with the intention to work on it a long time ago, maybe like six years. And then I wanted to convert it to a ten speed, and when I was a
            })
          );
        }}
      >
        node At
      </button>
      <button
        onClick={() => {
          console.log(
            state.doc.nodeAt(state.selection.from - 1, node => {
              console.log('---node---', node);
              return true;
              // ght it with the intention to work on it a long time ago, maybe like six years. And then I wanted to convert it to a ten speed, and when I was a
            })
          );
        }}
      >
        node At - 1
      </button>
    </div>
  );
});
