import { useCallback, useRef } from "react";
import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import { AnnotationExtension, EntityReferenceExtension, findMinMaxRange } from "remirror/extensions";
import { getUserObject } from "./getUserObject";
import { UserCardExtension } from "./UserCardExtensions";
import { WordExtension } from "./WordExtensions";

import { Decoration } from "@remirror/pm/view";
import "remirror/styles/all.css";
import { RangeSelection } from "./RangeSelection";
import { Debug } from "./Debug";

const data = getUserObject();

console.log("---data---", data);

const allHighlightsMap = new Map();

export const UserCard = () => {
  const allHighlightsRef = useRef(allHighlightsMap);
  const decorateHighlights = (highlights) => {
    const decorations = highlights.map((overlappingHighlights) => {
      const types = new Set(
        overlappingHighlights.map((h) => allHighlightsRef.current.get(h.id))
      );
      // Mix colors to allow for overlapping highlights
      const notRed = types.has("important") ? 64 : 0;
      const notBlue = types.has("interesting") ? 64 : 0;
      const red = 255 - notBlue;
      const green = 255 - notBlue - notRed;
      const blue = 255 - notRed;
      const style = `background: rgb(${red}, ${green}, ${blue});`;
      const [from, to] = findMinMaxRange(overlappingHighlights);

      // Add decoration to all inline nodes in the given range.
      return Decoration.inline(from, to, { style });
    });

    return [...decorations];
  };

  const extensions = useCallback(
    () => [
      new WordExtension(),
      new UserCardExtension({ disableExtraAttributes: true }),
      new EntityReferenceExtension({
        getStyle: decorateHighlights,
      }),
      new AnnotationExtension()
    ],
    []
  );

  const { manager, state, setState } = useRemirror({
    extensions,
    content: {
      type: "doc",
      content: data,
    },
    selection: "start",
  });

  const updateRef = useCallback((id, type) => {
    allHighlightsRef.current.set(id, type);
  }, []);

  const getAllHighlightsRefData = useCallback((id) => {
    if (!id) {
      return allHighlightsRef;
    }
    return allHighlightsRef.current.get(id);
  }, []);

  const handleChange = useCallback(({ state }) => {
    // Update the state to the latest value.
    setState(state);
  }, []);

  return (
    <Remirror
      manager={manager}
      initialContent={state}
      autoFocus
      editable
      onChange={handleChange}
    >
      <Debug
        state={state}
        updateRef={updateRef}
        getAllHighlightsRefData={getAllHighlightsRefData}
      />
      <EditorComponent />
      <RangeSelection />
    </Remirror>
  );
};
